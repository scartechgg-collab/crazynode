import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "FiveM Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "fivem")!;
export default function FiveMPage() { return <GameHostingPage game={game} />; }
