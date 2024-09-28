export type Pijler = {
    id: number;
    title: string;
    description: string;
    link: string;
    text: { type: string; children: { type: string; text: string }[] }[];
    order: number;
  }