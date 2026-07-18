import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "ARK Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "ark")!;
export default function ARKPage() { return <GameHostingPage game={game} />; }
