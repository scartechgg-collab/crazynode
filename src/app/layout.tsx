import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crazynode.in"),
  title: {
    default: "CrazyNode — Premium Game Server Hosting | Minecraft, VPS, Discord Bot",
    template: "%s | CrazyNode",
  },
  description:
    "Deploy game servers instantly with enterprise-grade hardware, ultra-low latency networking, DDoS protection, NVMe storage, and 24/7 support. Minecraft from ₹49/mo, VPS from ₹699/mo. Trusted by 15K+ servers.",
  keywords: [
    "game server hosting",
    "minecraft hosting",
    "minecraft server hosting india",
    "fivem hosting",
    "gta v hosting",
    "vps hosting",
    "discord bot hosting",
    "cheap minecraft hosting",
    "best game hosting india",
    "crazynode",
    "dedicated servers",
    "ddos protection",
    "free hosting",
    "minecraft server india",
  ],
  authors: [{ name: "CrazyNode", url: "https://crazynode.in" }],
  creator: "CrazyNode",
  publisher: "CrazyNode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CrazyNode — Premium Game Server Hosting",
    description:
      "Deploy game servers instantly with enterprise-grade hardware, NVMe SSDs, 1 Tbps DDoS protection, and 24/7 support. Starting from ₹49/mo.",
    url: "https://crazynode.in",
    siteName: "CrazyNode",
    images: [
      {
        url: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
        width: 1200,
        height: 630,
        alt: "CrazyNode Premium Game Hosting",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrazyNode — Premium Game Server Hosting",
    description: "Enterprise-grade Minecraft, VPS, Discord Bot hosting from ₹49/mo. 99.99% uptime, DDoS protection, NVMe SSDs.",
    images: ["https://i.postimg.cc/fykv1Fgx/1000018451.png"],
    creator: "@crazynode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
    shortcut: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
    apple: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
  },
  verification: {
    google: "add-your-google-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://i.postimg.cc/fykv1Fgx/1000018451.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CrazyNode",
              url: "https://crazynode.in",
              logo: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
              email: "root@crazynode.in",
              description: "Premium game server hosting with enterprise-grade hardware and 24/7 support",
              sameAs: [
                "https://discord.gg/crazynode",
                "https://github.com/crazynode",
                "https://x.com/crazynode",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "root@crazynode.in",
                contactType: "customer support",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CrazyNode",
              url: "https://crazynode.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://crazynode.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="bg-dark-bg text-white antialiased font-sans min-h-screen">{children}</body>
    </html>
  );
}
