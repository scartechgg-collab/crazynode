import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://crazynode.in";

  const routes = [
    "",
    "/minecraft",
    "/vps",
    "/discord-bot",
    "/dedicated",
    "/web-hosting",
    "/ddos",
    "/free",
    "/fivem",
    "/gtav",
    "/rust",
    "/ark",
    "/cs2",
    "/valheim",
    "/hytale",
    "/about",
    "/contact",
    "/blog",
    "/knowledgebase",
    "/status",
    "/terms",
    "/privacy",
    "/refund",
    "/careers",
    "/partners",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : route.includes("blog") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/minecraft" || route === "/vps" ? 0.9 : 0.7,
  }));
}
