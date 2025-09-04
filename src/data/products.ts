export interface Item {
  id: number;
  name: string;
  description: string;
  dimension: string;
  category: string;
  price: number;
  image: string;
}

export const ITEMS: Item[] = [
  {
    id: 1,
    name: "Modern Sofa",
    description: "A comfortable modern sofa.",
    dimension: "10 cm * 20 cm",
    category: "Laser",
    price: 499,
    image: "/proxym it intership.jpg",
  },
];
