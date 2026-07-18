import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";

export const metadata: Metadata = { title: "Hosting for Businesses" };

export default function BusinessesPage() {
  return (
    <SolutionPage
      badge="💼 For Businesses"
      title="Enterprise"
      highlight="Businesses"
      description="Mission-critical hosting with SLAs, compliance support, and dedicated infrastructure for studios and enterprises."
      features={[
        { title: "99.99% SLA", desc: "Contractual uptime guarantees backed by service credits and dedicated account management.", icon: "shield" },
        { title: "Dedicated Hardware", desc: "Bare-metal servers with no resource sharing for predictable enterprise performance.", icon: "rocket" },
        { title: "Compliance Ready", desc: "SOC 2-aligned infrastructure with data residency options across 8 global locations.", icon: "briefcase" },
        { title: "Custom Solutions", desc: "Bespoke architectures designed by our solutions engineers for your exact requirements.", icon: "code" },
      ]}
      benefits={["Dedicated account manager and solutions engineer", "Custom SLAs with financial penalties we stand behind", "Volume discounts for multi-server deployments", "Invoice billing with NET-30 payment terms available", "Migration assistance from legacy infrastructure", "Quarterly business reviews with capacity planning"]}
    />
  );
}
