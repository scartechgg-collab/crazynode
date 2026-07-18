import type { Metadata } from "next";
import VpsSelector from "@/components/VpsSelector";

export const metadata: Metadata = { title: "VPS Hosting" };
export default function VpsPage() { return <VpsSelector />; }