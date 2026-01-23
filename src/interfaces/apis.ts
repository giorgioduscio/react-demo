export interface Article {
  id: number;
  section: string;
  label: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Table {
  id: number;
  key: string;
  avaiable: boolean;
}

export interface CartItem {
  id: number;
  articleId: number;
  quantity: number;
}

export interface Order{
  id: number;
  date: string;
  items: CartItem[];
  total: number;
  tableId?: number;
  method: "table" | "delivery" | "takeAway";
}