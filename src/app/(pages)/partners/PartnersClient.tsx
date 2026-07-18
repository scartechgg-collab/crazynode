"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, DollarSign, Users, Shield, Zap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

const tiers = [
  {
    name: "Affiliate",
    price: "Free",
    desc: "For content creators and community leaders",
    features: ["10% recurring commission", "Custom referral links", "Real-time dashboard", "Monthly payouts", "Marketing materials", "Dedicated affiliate manager"],
    cta: "Join Now",
    popular: false,
  },
  {
    name: "Reseller",
    price: "Custom",
    desc: "For agencies and hosting businesses",
    features: ["25% wholesale discount", "White-label panel", "Custom branding", "API access", "Priority support", "Bulk provisioning", "SLA guarantee"],
    cta: "Contact Sales",
    popular: true,
  },
  {
    name: "Enterprise Partner",
    price: "Custom",
    desc: "For large networks and platforms",
    features: ["Custom revenue share", "Dedicated infrastructure", "Co-marketing programs", "Custom integrations", "Dedicated account team", "24/7 NOC access", "Custom SLAs"],
    cta: "Contact Sales",
    popular: false,
  },
];

const perks = [
  { icon: DollarSign, title: "Generous Payouts", desc: "Industry-leading commission rates with reliable monthly payments" },
  { icon: Users, title: "Growing Audience", desc: "Access to 50,000+ active gamers and server owners" },
  { icon: Shield, title: "Reliable Product", desc: "Promote a product your audience will actually love" },
  { icon: Zap, title: "Fast Approval", desc: "Get approved and start earning within 24 hours" },
];

export default function PartnersClient() {
  return (
    <>
      <PageHeader badge="🤝 Partners" title="Partner With" highlight="CrazyNode" description="Join our partner program and earn while promoting the best game server hosting platform." />

      {/* Perks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {perks.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-6">
                <p.icon className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Partner Tiers */}
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Partner <span className="gradient-text">Programs</span></h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`premium-card p-8 flex flex-col ${tier.popular ? "border-brand/30 ring-1 ring-brand/20" : ""}`}>
                {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">Recommended</div>}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{tier.desc}</p>
                <div className="mb-6"><span className="text-2xl font-extrabold text-white">{tier.price}</span></div>
                <div className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-brand shrink-0" />
                      <span className="text-sm text-gray-400">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all group ${tier.popular ? "bg-brand text-white hover:bg-brand-dark" : "border border-dark-border text-white hover:border-brand/50"}`}>
                  {tier.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
