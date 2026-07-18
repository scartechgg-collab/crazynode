import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "CS2 Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "cs2")!;
export default function CS2Page() { return <GameHostingPage game={game} />; }
