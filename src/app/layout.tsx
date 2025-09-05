import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SideBar from "@/components/sideBar";
import { SidebarProvider } from "@/contexts/SidebarContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Header />
          <SideBar />
          {children}
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
