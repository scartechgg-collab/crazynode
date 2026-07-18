import type { Metadata } from "next";
import KBClient from "./KBClient";

export const metadata: Metadata = { title: "Knowledgebase" };
export default function KnowledgebasePage() { return <KBClient />; }
