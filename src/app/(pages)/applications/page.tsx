import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = { title: "Applications" };
export default function AboutPage() { return <AboutClient />; }
