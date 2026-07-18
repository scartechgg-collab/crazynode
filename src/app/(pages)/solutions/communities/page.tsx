import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";

export const metadata: Metadata = { title: "Hosting for Communities" };

export default function CommunitiesPage() {
  return (
    <SolutionPage
      badge="👥 For Communities"
      title="Power Your"
      highlight="Communities"
      description="From small friend groups to massive gaming networks, we scale with your community's growth."
      features={[
        { title: "Multi-Server Networks", desc: "Link servers together with clustering, shared databases, and unified player data.", icon: "users" },
        { title: "Role-Based Access", desc: "Give moderators and admins the exact permissions they need without full root access.", icon: "shield" },
        { title: "Donation Ready", desc: "Integrate with Tebex, CraftingStore, or custom payment systems for community funding.", icon: "briefcase" },
        { title: "Instant Scaling", desc: "Upgrade resources with zero downtime as your community grows from 10 to 10,000 players.", icon: "rocket" },
      ]}
      benefits={["Trusted by 5,000+ gaming communities worldwide", "Free migration from any host with zero data loss", "Subuser system with granular permission controls", "Scheduled restarts and maintenance windows", "Discord bot integration for server notifications", "Community pricing discounts for large networks"]}
    />
  );
}
