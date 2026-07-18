import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "Hytale Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "hytale")!;
export default function HytalePage() { return <GameHostingPage game={game} />; }
