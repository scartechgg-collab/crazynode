export const COMPANY = {
  name: "CrazyNode",
  email: "root@crazynode.in",
  logo: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
  tagline: "Premium Game Hosting Platform",
  year: 2026,
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Hosting",
    children: [
      {
        label: "Game Hosting",
        children: [
          { label: "Minecraft Hosting", href: "/minecraft" },
          { label: "FiveM Hosting", href: "/fivem" },
          { label: "GTA V Hosting", href: "/gtav" },
          { label: "Rust Hosting", href: "/rust" },
          { label: "ARK Hosting", href: "/ark" },
          { label: "CS2 Hosting", href: "/cs2" },
          { label: "Valheim Hosting", href: "/valheim" },
          { label: "Hytale Hosting", href: "/hytale" },
        ],
      },
      { label: "VPS Hosting", href: "/vps" },
      { label: "Discord Bot Hosting", href: "/discord-bot" },
      { label: "DDoS Protection", href: "/ddos" },
      { label: "Free Hosting", href: "/free" },
    ],
  },
  {
    label: "Cloud Services",
    children: [
      { label: "VPS Hosting", href: "/vps" },
      { label: "DDoS Protection", href: "/ddos" },
      { label: "Free Hosting", href: "/free" },
      { label: "Web Hosting", href: "/web-hosting" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Support",
    children: [
      { label: "Knowledgebase", href: "/knowledgebase" },
      { label: "Network Status", href: "/status" },
      { label: "Submit Ticket", href: "/contact" },
    ],
  },
];

export const GAME_SERVERS = [
  {
    id: "minecraft",
    name: "Minecraft",
    slug: "minecraft",
    description: "Premium Minecraft server hosting with instant mod installation, automatic backups, and a powerful control panel. Run Vanilla, Paper, Spigot, Forge, or Fabric.",
    icon: "⛏️",
    startingPrice: 180,
    features: ["Unlimited Slots", "NVMe SSD", "DDoS Protection", "One-Click Modpacks", "Automatic Backups", "Free Subdomain"],
    specs: { ram: "2-32 GB", cpu: "Ryzen 9 7950X", storage: "20-500 GB NVMe" },
    color: "#4CAF50",
  },
  {
    id: "fivem",
    name: "FiveM",
    slug: "fivem",
    description: "High-performance FiveM hosting with txAdmin pre-installed, artifact auto-updates, OneSync support, and premium hardware for the best GTA RP experience.",
    icon: "🚗",
    startingPrice: 299,
    features: ["txAdmin Included", "OneSync Support", "Artifact Updates", "Custom Resources", "DDoS Protection", "Premium CPU"],
    specs: { ram: "4-64 GB", cpu: "Ryzen 9 7950X", storage: "50-1TB NVMe" },
    color: "#FF9800",
  },
  {
    id: "gtav",
    name: "GTA V",
    slug: "gtav",
    description: "Enterprise-grade GTA V server hosting with mod support, anti-cheat integration, and powerful hardware to handle large player counts seamlessly.",
    icon: "🎮",
    startingPrice: 349,
    features: ["Mod Support", "Anti-Cheat Ready", "High Player Slots", "Premium Hardware", "DDoS Protection", "24/7 Support"],
    specs: { ram: "8-64 GB", cpu: "Ryzen 9 7950X", storage: "100-1TB NVMe" },
    color: "#9C27B0",
  },
  {
    id: "rust",
    name: "Rust",
    slug: "rust",
    description: "Blazing fast Rust server hosting with Oxide/uMod support, auto-wipe scheduling, and performance-optimized hardware for lag-free survival gameplay.",
    icon: "🔧",
    startingPrice: 199,
    features: ["Oxide/uMod", "Auto-Wipe", "Plugin Support", "High Tick Rate", "DDoS Protection", "NVMe SSD"],
    specs: { ram: "4-32 GB", cpu: "Ryzen 9 7950X", storage: "50-500 GB NVMe" },
    color: "#F44336",
  },
  {
    id: "ark",
    name: "ARK",
    slug: "ark",
    description: "Powerful ARK: Survival Evolved hosting with cluster support, mod management, scheduled restarts, and hardware that handles even the largest tribes.",
    icon: "🦖",
    startingPrice: 249,
    features: ["Cluster Support", "Mod Manager", "Scheduled Restarts", "Cross-Server Travel", "DDoS Protection", "Premium CPU"],
    specs: { ram: "8-64 GB", cpu: "Ryzen 9 7950X", storage: "100-1TB NVMe" },
    color: "#2196F3",
  },
  {
    id: "cs2",
    name: "CS2",
    slug: "cs2",
    description: "Competitive Counter-Strike 2 server hosting with 128-tick support, custom configs, workshop map integration, and ultra-low latency networking.",
    icon: "🔫",
    startingPrice: 149,
    features: ["128-Tick Rate", "Workshop Maps", "Custom Configs", "GOTV Support", "DDoS Protection", "Low Latency"],
    specs: { ram: "2-16 GB", cpu: "Ryzen 9 7950X", storage: "20-200 GB NVMe" },
    color: "#FF5722",
  },
  {
    id: "valheim",
    name: "Valheim",
    slug: "valheim",
    description: "Optimized Valheim server hosting with Thunderstore mod support, crossplay compatibility, automatic world backups, and Viking-worthy performance.",
    icon: "⚔️",
    startingPrice: 149,
    features: ["Mod Support", "Crossplay", "Auto Backups", "Easy Setup", "DDoS Protection", "NVMe SSD"],
    specs: { ram: "4-16 GB", cpu: "Ryzen 9 7950X", storage: "20-200 GB NVMe" },
    color: "#607D8B",
  },
  {
    id: "hytale",
    name: "Hytale",
    slug: "hytale",
    description: "Future-ready Hytale server hosting with day-one support planned. Be the first to host with enterprise hardware and premium networking.",
    icon: "🏰",
    startingPrice: 99,
    features: ["Day-One Ready", "Premium Hardware", "Mod Support", "Easy Management", "DDoS Protection", "Free Subdomain"],
    specs: { ram: "2-32 GB", cpu: "Ryzen 9 7950X", storage: "20-500 GB NVMe" },
    color: "#00BCD4",
  },
];

export const FEATURES = [
  { title: "Instant Deployment", description: "Servers deployed in under 60 seconds with our automated provisioning system.", icon: "Zap" },
  { title: "Ryzen 9 CPUs", description: "AMD Ryzen 9 7950X processors with 5.7GHz boost for maximum single-thread performance.", icon: "Cpu" },
  { title: "NVMe SSD Storage", description: "Enterprise NVMe SSDs with 7,000 MB/s read speeds for instant world loading.", icon: "HardDrive" },
  { title: "1 Tbps DDoS Protection", description: "Enterprise-grade DDoS mitigation filtering up to 1 Tbps of malicious traffic.", icon: "Shield" },
  { title: "99.99% Uptime", description: "Redundant infrastructure with automatic failover guarantees near-perfect uptime.", icon: "Activity" },
  { title: "Global Locations", description: "8 strategic data center locations worldwide for ultra-low latency gameplay.", icon: "Globe" },
  { title: "Automatic Backups", description: "Scheduled backups with one-click restore to protect your server data.", icon: "Database" },
  { title: "Free Subdomains", description: "Custom subdomains included free with every plan for easy server access.", icon: "Link" },
  { title: "One-Click Mods", description: "Install modpacks, plugins, and resources with a single click from our library.", icon: "Package" },
  { title: "Dedicated IP", description: "Optional dedicated IP addresses for professional server branding.", icon: "Server" },
];

export const LOCATIONS = [
  { city: "Mumbai", country: "India", flag: "🇮🇳", latency: "2ms", lat: 19.076, lng: 72.877 },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", latency: "15ms", lat: 1.352, lng: 103.82 },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪", latency: "120ms", lat: 50.11, lng: 8.68 },
  { city: "London", country: "UK", flag: "🇬🇧", latency: "130ms", lat: 51.507, lng: -0.128 },
  { city: "New York", country: "USA", flag: "🇺🇸", latency: "180ms", lat: 40.712, lng: -74.006 },
  { city: "Dallas", country: "USA", flag: "🇺🇸", latency: "200ms", lat: 32.776, lng: -96.797 },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", latency: "90ms", lat: -33.868, lng: 151.209 },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", latency: "60ms", lat: 35.689, lng: 139.692 },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 99,
    period: "month",
    description: "Perfect for small communities and testing",
    features: ["2 GB RAM", "1 vCPU Core", "20 GB NVMe SSD", "Daily Backups", "Basic DDoS Protection", "Email Support", "Free Subdomain"],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 299,
    period: "month",
    description: "Ideal for growing communities",
    features: ["8 GB RAM", "4 vCPU Cores", "100 GB NVMe SSD", "Hourly Backups", "Advanced DDoS (500 Gbps)", "Priority Support", "Free Subdomain", "Dedicated IP"],
    popular: true,
    cta: "Deploy Now",
  },
  {
    name: "Extreme",
    price: 599,
    period: "month",
    description: "For large servers and networks",
    features: ["16 GB RAM", "6 vCPU Cores", "250 GB NVMe SSD", "Real-Time Backups", "Premium DDoS (1 Tbps)", "24/7 Priority Support", "Custom Domain", "Dedicated IP", "Custom Mods Support"],
    popular: false,
    cta: "Deploy Now",
  },
  {
    name: "Enterprise",
    price: 1499,
    period: "month",
    description: "Maximum performance, zero compromises",
    features: ["32 GB RAM", "8 vCPU Cores", "500 GB NVMe SSD", "Continuous Backups", "Enterprise DDoS (1 Tbps+)", "Dedicated Account Manager", "Custom Domain", "Dedicated IP", "Custom Development", "SLA Guarantee"],
    popular: false,
    cta: "Contact Sales",
  },
];

export const TESTIMONIALS = [
  { name: "Alex Thompson", role: "Server Owner", avatar: "AT", rating: 5, text: "CrazyNode transformed our Minecraft network. The performance is insane - zero lag even with 200+ players online. Best hosting we've ever used." },
  { name: "Priya Sharma", role: "FiveM Developer", avatar: "PS", rating: 5, text: "The FiveM hosting is next level. txAdmin works perfectly, OneSync is buttery smooth, and their support team actually knows what they're doing." },
  { name: "Marcus Lee", role: "Community Manager", avatar: "ML", rating: 5, text: "Migrated our entire community from another host. Setup took 5 minutes and performance doubled. The DDoS protection has saved us countless times." },
  { name: "Sarah Chen", role: "Streamer", avatar: "SC", rating: 5, text: "As a streamer, I need reliable servers. CrazyNode delivers every time - instant setup, incredible uptime, and the control panel is beautiful." },
  { name: "Rahul Patel", role: "Server Admin", avatar: "RP", rating: 5, text: "The NVMe storage makes such a difference for our ARK cluster. World loading is instant and the automatic backups give us peace of mind." },
  { name: "Emily Davis", role: "Network Owner", avatar: "ED", rating: 5, text: "Running a Rust network with CrazyNode has been flawless. Auto-wipe works perfectly and the hardware performance is enterprise-grade." },
];

export const STATS = [
  { value: "10,000+", label: "Servers Online" },
  { value: "99.99%", label: "Uptime" },
  { value: "50,000+", label: "Happy Clients" },
  { value: "24/7", label: "Expert Support" },
];

export const BLOG_POSTS = [
  { title: "How to Optimize Your Minecraft Server for Maximum Performance", slug: "optimize-minecraft-server", category: "Minecraft", date: "Jan 15, 2026", excerpt: "Learn advanced techniques to squeeze every bit of performance from your Minecraft server with our comprehensive optimization guide.", readTime: "8 min" },
  { title: "FiveM Server Setup Guide: From Zero to Hero", slug: "fivem-setup-guide", category: "FiveM", date: "Jan 12, 2026", excerpt: "Complete walkthrough for setting up a professional FiveM roleplay server with txAdmin, custom scripts, and optimization tips.", readTime: "12 min" },
  { title: "Understanding DDoS Protection: Why It Matters for Gaming", slug: "ddos-protection-guide", category: "Security", date: "Jan 10, 2026", excerpt: "Deep dive into DDoS attacks, how they target game servers, and how CrazyNode's enterprise protection keeps your servers safe.", readTime: "6 min" },
  { title: "NVMe vs SSD: Why Storage Speed Matters for Game Servers", slug: "nvme-vs-ssd", category: "Hardware", date: "Jan 8, 2026", excerpt: "Technical comparison of NVMe and traditional SSD storage and why enterprise NVMe makes a significant difference for gaming.", readTime: "5 min" },
  { title: "Building a Successful Gaming Community in 2026", slug: "building-gaming-community", category: "Community", date: "Jan 5, 2026", excerpt: "Tips and strategies for growing and managing a thriving gaming community with the right infrastructure and tools.", readTime: "10 min" },
  { title: "Pterodactyl Panel: Complete Admin Guide", slug: "pterodactyl-guide", category: "Tutorials", date: "Jan 3, 2026", excerpt: "Master the Pterodactyl control panel with our comprehensive admin guide covering server management, user roles, and advanced features.", readTime: "15 min" },
];

export const KB_CATEGORIES = [
  { name: "Minecraft", icon: "⛏️", articles: 45, slug: "minecraft" },
  { name: "FiveM", icon: "🚗", articles: 32, slug: "fivem" },
  { name: "Pterodactyl Panel", icon: "🦅", articles: 28, slug: "pterodactyl" },
  { name: "Billing & Payments", icon: "💳", articles: 15, slug: "billing" },
  { name: "VPS Hosting", icon: "🖥️", articles: 22, slug: "vps" },
  { name: "Web Hosting", icon: "🌐", articles: 18, slug: "web-hosting" },
  { name: "Account & Security", icon: "🔐", articles: 12, slug: "account" },
  { name: "Network & DNS", icon: "🌍", articles: 20, slug: "network" },
];
