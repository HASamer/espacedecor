export interface Item {
  id: string;
  name: string;
  description: string;
  dimension: string;
  category: string;
  price: number;
  image: string;
}

export const ITEMS: Item[] = [
  {
    id: "PRD-00001",
    name: "Sample Personalised mini Box",
    description: "A small box that can be personalised with a name or a short message. Perfect for gifting small items like jewelry, trinkets, or keepsakes.",
    dimension: "6.5 / 4.5 cm",
    category: "Box",
    price: 15,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00002",
    name: "Sample Personalised mini Box",
    description: "A small box that can be personalised with a name or a short message. Perfect for gifting small items like jewelry, trinkets, or keepsakes.",
    dimension: "6.5 / 4.5 cm",
    category: "Box",
    price: 15,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
];

// Helper function to get unique categories
export const getCategories = (): string[] => {
  const categories = ITEMS.map(item => item.category);
  return Array.from(new Set(categories)).sort();
};

// Helper function to get price range
export const getPriceRange = (): { min: number; max: number } => {
  const prices = ITEMS.map(item => item.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
