import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingSupport />
    </>
  );
}
