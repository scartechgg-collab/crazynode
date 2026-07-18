import type { Metadata } from "next";
import PlanSelector from "@/components/PlanSelector";
import WhatsIncluded from "@/components/WhatsIncluded";

export const metadata: Metadata = { title: "Minecraft Hosting" };

export default function MinecraftPage() {
  return (
    <>
      <PlanSelector gameName="Minecraft" isFirstSection />
      <WhatsIncluded />
    </>
  );
}
