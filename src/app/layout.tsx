import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CrazyNode — Premium Game Server Hosting",
    template: "%s | CrazyNode",
  },
  description: "Deploy game servers instantly with enterprise-grade hardware, ultra-low latency networking, DDoS protection, NVMe storage, and 24/7 support. Starting from ₹99/month.",
  keywords: ["game server hosting", "minecraft hosting", "fivem hosting", "vps hosting", "dedicated servers", "crazynode"],
  openGraph: {
    title: "CrazyNode — Premium Game Server Hosting",
    description: "Deploy game servers instantly with enterprise-grade hardware.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://i.postimg.cc/fykv1Fgx/1000018451.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-bg text-white antialiased font-sans min-h-screen">{children}</body>
    </html>
  );
}
