import React from 'react';
import { StrapiImage } from './StrapiImage';

interface TeamMember {
    order: number;
    id: number;
    name: string;
    title: string;
    image: {
        alternativeText: string;
        formats: {
          thumbnail: {
            url: string;
          };
          large: {
            url: string;
          };
          medium: {
            url: string;
          };
          small: {
            url: string;
          };
        };
    };
  }

  const shouldFetchData = false; // Set this to false to skip fetching


async function fetchTeamMembers(locale: string) {

  if (!shouldFetchData) {
    return null; // Skip fetching and return null
  }
    const res = await fetch(`http://localhost:1337/api/team-members?locale=${locale}&populate=*`);
    const data = await res.json();
    return data.data || null;
}

const TeamSection = async({locale}: {locale:string}) => {

    let teamMembers: TeamMember[] = await fetchTeamMembers(locale);
    teamMembers = teamMembers.sort((a,b) => a.order-b.order)

    if (!teamMembers) {
        return <p>No teamMembers found for provided locale</p>
    }

return (
    <section className="py-14 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Ons Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-center mb-4">
                {member.image && (
                    <StrapiImage
                    src={member.image.formats.thumbnail.url}
                    alt={member.image.alternativeText || member.name}
                    width={150}
                    height={150}
                    className='rounded-full object-cover' />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-500">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
