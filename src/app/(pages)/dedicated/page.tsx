import type { Metadata } from "next";
import DedicatedClient from "./DedicatedClient";

export const metadata: Metadata = { title: "Dedicated Servers" };
export default function DedicatedPage() { return <DedicatedClient />; }
