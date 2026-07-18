import type { Metadata } from "next";
import DdosProtectionClient from "./DdosProtectionClient";

export const metadata: Metadata = { title: "DDoS Protection" };
export default function DdosProtectionPage() { return <DdosProtectionClient />; }