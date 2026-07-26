"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubPageLoader from "@/components/SubPageLoader";
import { CartProvider } from "@/components/CartContext";
import { CurrencyProvider } from "@/components/CurrencyContext";

export default function PagesLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CurrencyProvider>
      <CartProvider>
        <SubPageLoader />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </CartProvider>
    </CurrencyProvider>
  );
}
