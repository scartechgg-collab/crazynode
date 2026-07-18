import type { Metadata } from "next";
import GameHostingPage from "@/components/GameHostingPage";
import { GAME_SERVERS } from "@/lib/constants";

export const metadata: Metadata = { title: "Rust Hosting" };
const game = GAME_SERVERS.find((g) => g.id === "rust")!;
export default function RustPage() { return <GameHostingPage game={game} />; }
