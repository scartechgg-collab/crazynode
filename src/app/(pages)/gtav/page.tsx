import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "GTA V Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "gtav")!;
export default function GTAVPage() { return <GameHostingPage game={game} />; }
