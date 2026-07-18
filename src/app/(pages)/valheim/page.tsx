import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "Valheim Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "valheim")!;
export default function ValheimPage() { return <GameHostingPage game={game} />; }
