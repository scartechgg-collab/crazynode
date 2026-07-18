import type { Metadata } from "next";
import DiscordBotPlans from "@/components/DiscordBotPlans";

export const metadata: Metadata = { title: "Discord Bot Hosting" };
export default function DiscordBotPage() { return <DiscordBotPlans />; }