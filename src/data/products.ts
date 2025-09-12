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
  {
    id: "PRD-00009",
    name: "Wooden Photo Frame",
    description: "Classic wooden photo frame perfect for displaying your favorite memories. Available in multiple sizes.",
    dimension: "20 / 15 cm",
    category: "Frame",
    price: 22,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00010",
    name: "Ceramic Planter Set",
    description: "Set of 3 ceramic planters in different sizes. Perfect for indoor plants and herbs.",
    dimension: "Various sizes",
    category: "Planter",
    price: 38,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00011",
    name: "Decorative Wall Mirror",
    description: "Elegant wall mirror with decorative frame. Adds light and style to any room.",
    dimension: "40 / 30 cm",
    category: "Mirror",
    price: 85,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00012",
    name: "Leather Storage Box",
    description: "Premium leather storage box with brass accents. Perfect for documents and valuables.",
    dimension: "25 / 18 cm",
    category: "Box",
    price: 65,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00013",
    name: "Glass Candle Holders",
    description: "Set of 4 elegant glass candle holders. Creates beautiful ambient lighting.",
    dimension: "8 / 8 cm each",
    category: "Decoration",
    price: 32,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00014",
    name: "Bamboo Serving Tray",
    description: "Eco-friendly bamboo serving tray with handles. Perfect for entertaining guests.",
    dimension: "35 / 25 cm",
    category: "Dinnerware",
    price: 28,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00015",
    name: "Metallic Wall Art",
    description: "Modern metallic wall art piece. Adds contemporary style to any space.",
    dimension: "50 / 30 cm",
    category: "Decoration",
    price: 95,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00016",
    name: "Ceramic Tea Set",
    description: "Traditional ceramic tea set with teapot and 4 cups. Perfect for afternoon tea.",
    dimension: "Teapot: 15cm, Cups: 8cm",
    category: "Dinnerware",
    price: 58,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00017",
    name: "Designer Table Lamp",
    description: "Modern designer table lamp with adjustable brightness. Combines style and functionality.",
    dimension: "35 / 20 cm",
    category: "Lighting",
    price: 78,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00018",
    name: "Vintage Clock",
    description: "Antique-style wall clock with Roman numerals. Perfect for traditional home décor.",
    dimension: "30 / 30 cm",
    category: "Clock",
    price: 52,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00019",
    name: "Crystal Bookends",
    description: "Pair of crystal bookends for organizing books in style. Heavy and durable construction.",
    dimension: "15 / 12 cm each",
    category: "Decoration",
    price: 44,
    image: "https://i.imgur.com/xReAUxu.jpeg",
  },
  {
    id: "PRD-00020",
    name: "Ceramic Fruit Bowl",
    description: "Large ceramic fruit bowl with beautiful hand-painted design. Perfect centerpiece for dining table.",
    dimension: "30 / 12 cm",
    category: "Dinnerware",
    price: 36,
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
