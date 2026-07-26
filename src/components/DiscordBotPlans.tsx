"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, HardDrive, Zap, Bot, ChevronRight, ShoppingCart } from "lucide-react";
import { DISCORD_BOT_PLANS as DEFAULT_PLANS } from "@/lib/discordBotPlans";
import { discordBotProductUrl } from "@/lib/productUrls";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";

export default function DiscordBotPlans() {
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const { addToCart, lastAdded } = useCart();
  const { convert, symbol } = useCurrency();

  useEffect(() => {
    fetch("/api/content/discord_bot_plans")
      .then((r) => r.json())
      .then((d) => {
        if (d.value && Array.isArray(d.value) && d.value.length > 0) setPlans(d.value);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            <Bot className="w-3.5 h-3.5" /> Discord Bot Hosting
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Reliable <span className="gradient-text">Discord Bot Hosting</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">Always-on runtime for your Discord bots with instant setup and powerful hardware.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan: any, i: number) => {
            const id = `discord-${plan.name}`;
            const isLastAdded = lastAdded === id;
            const priceConverted = convert(plan.price);
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`premium-card p-6 flex flex-col ${plan.popular ? "border-brand/30 ring-1 ring-brand/20" : ""} ${isLastAdded ? "ring-2 ring-emerald-400/50 border-emerald-400/30" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full shadow-lg shadow-brand/25">POPULAR</div>
                )}
                <div className="text-center mb-5 pb-5 border-b border-white/[.07]">
                  <p className="text-[10px] font-bold tracking-[.18em] text-gray-500 uppercase">{plan.name}</p>
                  <p className="mt-2 text-3xl font-extrabold text-price">{symbol}{priceConverted.value}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-gray-300 flex-1">
                  <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Brain className="w-3.5 h-3.5 text-brand" /></span><span>{plan.ram} RAM</span></li>
                  <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><HardDrive className="w-3.5 h-3.5 text-brand" /></span><span>{plan.storage}</span></li>
                  <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-brand" /></span><span>{plan.cpu} CPU</span></li>
                  <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-brand" /></span><span>{plan.botSize}</span></li>
                </ul>
                <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
                  <button
                    onClick={() =>
                      addToCart({
                        id,
                        name: `${plan.name} Discord Bot`,
                        processor: "discord-bot",
                        price: plan.price,
                        ram: plan.ram,
                        storage: plan.storage,
                        cpu: plan.cpu,
                        url: discordBotProductUrl(plan.name),
                      })
                    }
                    className={`group flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${isLastAdded ? "bg-emerald-500 text-white" : "bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1]"}`}
                  >
                    <ShoppingCart className={`w-4 h-4 ${isLastAdded ? "animate-bounce" : "group-hover:scale-110 transition-transform"}`} />
                    {isLastAdded ? "Added!" : "Cart"}
                  </button>
                  <Link href={discordBotProductUrl(plan.name)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-all">
                    Order <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
