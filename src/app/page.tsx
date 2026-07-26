import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameSwitcher from "@/components/GameSwitcher";
import Features from "@/components/Features";
import Locations from "@/components/Locations";
import ControlPanel from "@/components/ControlPanel";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import PriceExchanger from "@/components/PriceExchanger";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { CartProvider } from "@/components/CartContext";
import { CurrencyProvider } from "@/components/CurrencyContext";

export default function Home() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <PageLoader />
        <AnnouncementBanner />
        <Navbar />
        <main>
          <Hero />
          <GameSwitcher />
          <Features />
          <Stats />
          <Locations />
          <ControlPanel />
          <Testimonials />
          <PriceExchanger />
          <Pricing />
          <CTA />
        </main>
        <Footer />
      </CartProvider>
    </CurrencyProvider>
  );
}
