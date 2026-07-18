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
import FloatingSupport from "@/components/FloatingSupport";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
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
      <FloatingSupport />
    </>
  );
}
