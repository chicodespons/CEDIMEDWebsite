import DefaultImageComponent from "../defaultImageComponent";
import RichTextRenderer from "../RichTextRenderer";

interface StrapiImage {
  alternativeText: string;
  formats: {
    medium : {
      url: string;
      width: number;
      height: number;
    }
    thumbnail: {
      url: string;
      width: number;
      height: number;
    }
  }
}


interface NieuwsItem {
  id: number;
  title: string;
  content: Array<any>;
  excerpt: string;
  slug: string;
  publicationDate: string;
  img: StrapiImage | null; 
  author: string | null
  bio: string | null;
  avatar: StrapiImage | null;
}

interface NewsComponentProps {
  newsItem: NieuwsItem
}


export const NewsComponent: React.FC<NewsComponentProps> = ({newsItem}) => {

  const { title, content, publicationDate, img, author, bio, avatar } = newsItem;
  const date = new Date(publicationDate);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

    const avatarImageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${avatar.formats.thumbnail.url}`

    const defaultAvatarImage = '/images/default_user.png';

    return (
        <div className="flex flex-col md:flex-row gap-8 p-4 mx-auto">
        {/* Main Content */}
        <main className="flex-1 pr-4">
          <h1 className="text-3xl uppercase tracking-wider font-bold mb-4">
          {title}          
          </h1>
          <p className="text-gray-600 mb-6">
          {`Published on ${formattedDate} by ${author}`}
           </p>
           {img && (
                    <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.formats.medium.url}`}
                    alt={img.alternativeText || "News Item Image"}
                    width={img.formats.medium.width}
                    height={img.formats.medium.height}
                     />
                )}
          <p className="mb-4">
          <RichTextRenderer content={content} />          
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
                image={avatarImageUrl}
                defaultImage={defaultAvatarImage}
                alt={author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-base font-semibold">{author}</h3>
                <p className="text-sm text-gray-600">{bio}</p>
              </div>
              
            </div>
          </section>
        </aside>
      </div>
    )
}