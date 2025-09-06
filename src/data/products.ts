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
    name: "Personalised mini Box",
    description: "A small box that can be personalised with a name or a short message. Perfect for gifting small items like jewelry, trinkets, or keepsakes.",
    dimension: "6.5 / 4.5 cm",
    category: "Box",
    price: 15,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00002",
    name: "Wooden Storage Box",
    description: "A medium-sized wooden storage box perfect for organizing documents, photos, or craft supplies. Features a smooth finish and secure clasp.",
    dimension: "12 / 8 cm",
    category: "Box",
    price: 25,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00003",
    name: "Decorative Ceramic Vase",
    description: "Elegant ceramic vase with beautiful patterns, perfect for displaying fresh or dried flowers. Adds a touch of sophistication to any room.",
    dimension: "20 / 15 cm",
    category: "Vase",
    price: 35,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00004",
    name: "Modern Glass Vase",
    description: "Contemporary glass vase with a sleek design. Perfect for modern home décor and showcasing beautiful flower arrangements.",
    dimension: "18 / 12 cm",
    category: "Vase",
    price: 42,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00005",
    name: "Vintage Jewelry Box",
    description: "Antique-style jewelry box with multiple compartments and a soft velvet interior. Perfect for storing precious jewelry and accessories.",
    dimension: "15 / 10 cm",
    category: "Box",
    price: 55,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00006",
    name: "Crystal Table Decoration",
    description: "Beautiful crystal decoration piece that catches and reflects light beautifully. Perfect centerpiece for dining tables or coffee tables.",
    dimension: "10 / 10 cm",
    category: "Decoration",
    price: 75,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00007",
    name: "Ceramic Dinner Plate Set",
    description: "Set of 4 elegant ceramic dinner plates with a timeless design. Perfect for everyday dining or special occasions.",
    dimension: "25 / 25 cm",
    category: "Dinnerware",
    price: 45,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00008",
    name: "Tall Crystal Vase",
    description: "Stunning tall crystal vase perfect for long-stemmed flowers. Creates an elegant focal point in any room.",
    dimension: "30 / 8 cm",
    category: "Vase",
    price: 68,
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
