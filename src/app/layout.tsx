import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SideBar from "@/components/sideBar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { FilterProvider } from "@/contexts/FilterContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <FilterProvider>
            <Header />
            <SideBar />
            {children}
            <Footer />
          </FilterProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
