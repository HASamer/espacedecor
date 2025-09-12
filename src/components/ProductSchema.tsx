import { Item } from "@/data/products";

interface ProductSchemaProps {
  product: Item;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.id,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "EspaceDecor"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "TND",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "EspaceDecor",
        "url": "https://www.espacedecor.tn"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Dimensions",
        "value": product.dimension
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
