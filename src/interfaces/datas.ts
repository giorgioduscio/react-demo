export interface Article {
  section: string;
  label: string;
  price: number;
  description: string;
  imageUrl: string;
}

export type Table = {
  id: number;
  key: string;
  avaiable: boolean;
}