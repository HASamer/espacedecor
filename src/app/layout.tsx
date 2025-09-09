import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SideBar from "@/components/sideBar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { FilterProvider } from "@/contexts/FilterContext";
import { CartProvider } from "@/contexts/CartContext";

export const metadata = {
  title: {
    default: "EspaceDecor",
    template: "%s | EspaceDecor",
  },
  description: "EspaceDecor — décor, inspiration, and interior solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
