import type { Metadata } from "next";
import WebHostingClient from "./WebHostingClient";

export const metadata: Metadata = { title: "Web Hosting" };
export default function WebHostingPage() { return <WebHostingClient />; }
