import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SideBar from "@/components/sideBar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { FilterProvider } from "@/contexts/FilterContext";
import { CartProvider } from "@/contexts/CartContext";

const site = {
  name: "EspaceDecor",
  url: "https://www.espacedecor.tn",
  desc:
    "Découvrez une large sélection d’articles décoratifs, cadeaux uniques, coffrets cadeaux personnalisés et objets en découpe laser. Commandez en ligne en Tunisie",
  ogImage: "/icons/DarkIconWithoutBack.png", // Place ce fichier dans /public/og/ (1200×630 conseillé)
};

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.desc,
  applicationName: site.name,
  keywords: [
    "articles décoratifs",
    "cadeaux",
    "coffrets cadeaux",
    "découpe laser",
    "personnalisation",
    "Tunisie",
    "boutique déco",
    "e-commerce",
  ],
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Articles Décoratifs, Cadeaux & Découpe Laser`,
    description: site.desc,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "EspaceDecor - Boutique déco, cadeaux & découpe laser" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – Articles Décoratifs, Cadeaux & Découpe Laser`,
    description: site.desc,
    images: [site.ogImage],
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "/favicon/apple-touch-icon-precomposed",
        url: "/favicon/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="pt-16">
        <CartProvider>
          <SidebarProvider>
            <FilterProvider>
              <Header />
              <SideBar />
              {children}
              <Footer />
            </FilterProvider>
          </SidebarProvider>
        </CartProvider>
      </body>
    </html>
  );
}
