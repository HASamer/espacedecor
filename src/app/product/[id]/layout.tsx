import { ITEMS } from "@/data/products";
import type { Metadata } from "next";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = ITEMS.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Product Not Found - EspaceDecor",
      description: "The requested product could not be found. Browse our collection of decorative items, gifts, and laser-cut products.",
    };
  }

  const siteUrl = "https://www.espacedecor.tn";
  const productUrl = `${siteUrl}/product/${product.id}`;
  
  return {
    title: `${product.name} - ${product.price} DT | EspaceDecor`,
    description: `${product.description} Dimensions: ${product.dimension}. Catégorie: ${product.category}. Commandez en ligne en Tunisie.`,
    keywords: [
      product.name,
      product.category,
      "articles décoratifs",
      "cadeaux",
      "Tunisie",
      "découpe laser",
      product.category.toLowerCase(),
      "EspaceDecor"
    ],
    openGraph: {
      title: `${product.name} - ${product.price} DT`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      url: productUrl,
      siteName: "EspaceDecor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${product.price} DT`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return <>{children}</>;
}
