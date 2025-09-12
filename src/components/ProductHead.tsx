import Head from "next/head";
import { Item } from "@/data/products";

interface ProductHeadProps {
  product: Item;
}

export default function ProductHead({ product }: ProductHeadProps) {
  const siteUrl = "https://www.espacedecor.tn";
  const productUrl = `${siteUrl}/product/${product.id}`;
  const title = `${product.name} - ${product.price} DT | EspaceDecor`;
  const description = `${product.description} Dimensions: ${product.dimension}. Catégorie: ${product.category}. Commandez en ligne en Tunisie.`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${product.name}, ${product.category}, articles décoratifs, cadeaux, Tunisie, découpe laser, EspaceDecor`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${product.name} - ${product.price} DT`} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <meta property="og:url" content={productUrl} />
      <meta property="og:site_name" content="EspaceDecor" />
      <meta property="og:type" content="product" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${product.name} - ${product.price} DT`} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />
      
      {/* Canonical */}
      <link rel="canonical" href={productUrl} />
    </Head>
  );
}
