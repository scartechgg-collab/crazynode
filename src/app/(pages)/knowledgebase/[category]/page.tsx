import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KBCategoryClient from "./KBCategoryClient";
import { KB_CATEGORIES } from "@/lib/constants";

export async function generateStaticParams() {
  return KB_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = KB_CATEGORIES.find((c) => c.slug === category);
  return { title: cat ? `${cat.name} — Knowledgebase` : "Knowledgebase" };
}

export default async function KBCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = KB_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();
  return <KBCategoryClient category={cat} />;
}
