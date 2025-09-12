import { Item } from "@/data/products";

interface BreadcrumbSchemaProps {
  product: Item;
}

export default function BreadcrumbSchema({ product }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.espacedecor.tn"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.category,
        "item": `https://www.espacedecor.tn?category=${encodeURIComponent(product.category)}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://www.espacedecor.tn/product/${product.id}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
