import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";

export const metadata: Metadata = { title: "Hosting for Streamers" };

export default function StreamersPage() {
  return (
    <SolutionPage
      badge="🎥 For Streamers"
      title="Creator-Grade"
      highlight="Streamers"
      description="Servers that perform flawlessly on camera. Zero lag, instant restarts, and support that treats you like a partner."
      features={[
        { title: "Viewer Events Ready", desc: "Handle sudden viewer rushes with burstable resources that scale automatically.", icon: "video" },
        { title: "Custom Plugins", desc: "Install custom viewer-engagement plugins and stream-integrated features easily.", icon: "code" },
        { title: "Low-Latency Everywhere", desc: "Our 8 global locations ensure your viewers get great ping regardless of region.", icon: "rocket" },
        { title: "Priority Support", desc: "Streamer partners get priority queue access with average response under 5 minutes.", icon: "shield" },
      ]}
      benefits={["Free server upgrades for verified streamer partners", "Sponsorship opportunities with mutual promotion", "White-label server names with your branding", "Backup-before-stream automated safety routines", "24/7 live chat for emergencies during streams", "Featured creator program with homepage exposure"]}
    />
  );
}
