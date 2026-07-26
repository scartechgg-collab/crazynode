import type { ReactNode } from "react";
import PagesLayoutClient from "@/components/PagesLayoutClient";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <PagesLayoutClient>{children}</PagesLayoutClient>;
}
