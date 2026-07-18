import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = { title: "Partners" };
export default function PartnersPage() { return <PartnersClient />; }
