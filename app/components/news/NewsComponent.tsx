import DefaultImageComponent from "../defaultImageComponent";


interface NieuwsItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  publicationDate: string;
  img: string; 
  author: string | null
  bio: string | null;
  avatar: string | null;
}


export const NewsComponent: React.FC = ({id, title, content, excerpt, slug, publicationDate, img, author, bio, avatar} : NieuwsItem) => {

    const authorImage = '/images/author.jpg';
    const defaultImage = '/images/default_user.png';

    return (
        <div className="flex flex-col md:flex-row gap-8 p-4 mx-auto">
        {/* Main Content */}
        <main className="flex-1 pr-4">
          <h1 className="text-3xl font-bold mb-4">
          {title}          
          </h1>
          <p className="text-gray-600 mb-6">
            Published on April 25, 2023 by Dr. Emily Carter
          </p>
          <p className="mb-4">
            Emergency medicine is a critical field that requires quick thinking, precise actions, and innovative solutions...llalalalalalall alalalalalal  alalal alala lalal  alalal alllll lll ll
          </p>
          {/* More article content here */}
          <p className="mt-4">
            In this blog post, we delve into some of the groundbreaking projects our team has been working on...
          </p>
        </main>
  
        {/* Sidebar */}
        <aside className="w-full md:w-3/12 space-y-6">
          {/* Related Articles */}
          <section className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Artikels</h2>
            <ul className="space-y-2 text-blue-600">
              <li><a href="#" className="hover:underline">Advancements in Trauma Care</a></li>
              <li><a href="#" className="hover:underline">Telemedicine in Disaster Response</a></li>
              <li><a href="#" className="hover:underline">Innovations in Cardiopulmonary Resuscitation</a></li>
              <li><a href="#" className="hover:underline">Enhancing Patient Monitoring Systems</a></li>
            </ul>
          </section>
  
          {/* Author Bio */}
          <section className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Over de Auteur</h2>
            <div className="flex items-center mb-4">
            <DefaultImageComponent
                image={authorImage}
                defaultImage={defaultImage}
                alt="Dr. Emily Carter"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-base font-semibold">Dr. Emily Carter</h3>
                <p className="text-sm text-gray-600">Leading expert in emergency medicine with over 15 years of experience...</p>
              </div>
              
            </div>
          </section>
        </aside>
      </div>
    )
}