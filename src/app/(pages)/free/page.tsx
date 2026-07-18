import type { Metadata } from "next";
import FreeHostingClient from "./FreeHostingClient";

export const metadata: Metadata = { title: "Free Hosting" };
export default function FreeHostingPage() { return <FreeHostingClient />; }