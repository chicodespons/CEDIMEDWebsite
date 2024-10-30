import { NewsComponent } from "@/app/components/NewsComponent";

type Props = {
    params: {
      slug?: string;
    };
  };
  

  // to do: normal newspage without params => that gets the latest news
  //link up to strapi
  //{ params }: Props
  export default function NewsPage() {

    // const slug = params?? "1";

    return (
        <NewsComponent/>  
    );
  }