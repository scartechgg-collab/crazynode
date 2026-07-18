import type { Metadata } from "next";
import StatusClient from "./StatusClient";

export const metadata: Metadata = { title: "Network Status" };
export default function StatusPage() { return <StatusClient />; }
