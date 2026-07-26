import { defaultHeroGames, defaultSiteBranding, defaultAnnouncements } from "@/lib/defaultContent";
import { MINECRAFT_PROCESSORS } from "@/lib/plans";
import { VPS_CATEGORIES } from "@/lib/vpsPlans";
import { DISCORD_BOT_PLANS } from "@/lib/discordBotPlans";
import { LOCATIONS } from "@/lib/constants";

export const contentDefaults: Record<string, unknown> = {
  hero_games: defaultHeroGames,
  site_branding: defaultSiteBranding,
  announcements: defaultAnnouncements,
  minecraft_processors: MINECRAFT_PROCESSORS,
  vps_categories: VPS_CATEGORIES,
  discord_bot_plans: DISCORD_BOT_PLANS,
  locations: LOCATIONS,
};
