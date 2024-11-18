import React from 'react';

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



async function fetchTeamMembers(locale: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/team-members?locale=${locale}&populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });
    const data = await res.json();
    console.log(JSON.stringify(data,null,2))
    return data.data || null;
  } catch (error) {
    console.log("data not fetched correctly: ", error)
  }
  return null;
}

const TeamSection = async({locale}: {locale:string}) => {

    const teamMembers: TeamMember[] | null = await fetchTeamMembers(locale);
    if (teamMembers) {
      teamMembers.sort((a, b) => a.order - b.order);
  } else {
      return <p>No team members found for the provided locale.</p>;
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
                    <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${member.image.formats.thumbnail.url}`}
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
