import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = { title: "Careers" };
export default function CareersPage() { return <CareersClient />; }
