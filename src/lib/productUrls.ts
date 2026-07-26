const CLIENT_BASE = "https://client.crazynode.in/products";

function productTierSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const minecraftProcessors: Record<string, { family: string; suffix: string }> = {
  epyc: { family: "epyc", suffix: "epyc" },
  "ryzen-9-9950x": { family: "ryzen-9", suffix: "r9" },
  "ryzen-7-7700x": { family: "ryzen-7", suffix: "r7" },
  xeon: { family: "intel", suffix: "intel" },
};

/**
 * Produces the public client portal URL for a Minecraft processor/tier pair.
 * Examples: /products/epyc/starter-epyc and /products/ryzen-9/basic-r9.
 */
export function minecraftProductUrl(processorId: string, tierName: string) {
  const processor = minecraftProcessors[processorId] ?? { family: "minecraft", suffix: "minecraft" };
  return `${CLIENT_BASE}/${processor.family}/${productTierSlug(tierName)}-${processor.suffix}`;
}

/** Produces public client portal URLs such as /products/discord-bot/starter-bot. */
export function discordBotProductUrl(tierName: string) {
  return `${CLIENT_BASE}/discord-bot/${productTierSlug(tierName)}-bot`;
}

/** Fallback structured product URL for editable VPS categories and their plans. */
export function vpsProductUrl(categoryId: string, tierName: string) {
  return `${CLIENT_BASE}/vps/${categoryId}/${productTierSlug(tierName)}`;
}
