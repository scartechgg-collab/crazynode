import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CrazyNode - Premium Game Server Hosting",
    short_name: "CrazyNode",
    description: "Deploy game servers instantly with enterprise-grade hardware, ultra-low latency networking, DDoS protection, NVMe storage, and 24/7 support.",
    start_url: "/",
    display: "standalone",
    background_color: "#070708",
    theme_color: "#e3174e",
    icons: [
      {
        src: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
