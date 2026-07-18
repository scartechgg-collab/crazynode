"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const articleBank: Record<string, { title: string; desc: string; time: string }[]> = {
  minecraft: [
    { title: "How to Install Plugins on Your Minecraft Server", desc: "Step-by-step guide to installing Bukkit, Spigot, and Paper plugins via the panel.", time: "4 min" },
    { title: "Setting Up a Custom Domain for Minecraft", desc: "Connect your own domain to your server IP with SRV records.", time: "5 min" },
    { title: "Optimizing server.properties for Performance", desc: "Essential settings to reduce lag and improve TPS on busy servers.", time: "6 min" },
    { title: "Installing Modpacks with One Click", desc: "Deploy CurseForge and Modrinth modpacks instantly from our installer.", time: "3 min" },
    { title: "Setting Up BungeeCord and Velocity Networks", desc: "Link multiple Minecraft servers into a single network.", time: "8 min" },
    { title: "Whitelisting and OP Permissions Guide", desc: "Manage player access, operators, and permission levels correctly.", time: "4 min" },
  ],
  fivem: [
    { title: "FiveM Server Installation with txAdmin", desc: "Complete walkthrough for deploying a FiveM server from scratch.", time: "10 min" },
    { title: "Installing Custom Resources and Scripts", desc: "Add jobs, vehicles, maps, and ESX/QBCore scripts to your server.", time: "7 min" },
    { title: "Setting Up a FiveM Database (MySQL)", desc: "Configure MySQL with phpMyAdmin for ESX and QBCore frameworks.", time: "6 min" },
    { title: "Enabling OneSync for 64+ Players", desc: "Configure OneSync Infinity for large roleplay communities.", time: "5 min" },
    { title: "Server.cfg Best Practices for FiveM", desc: "Essential convars and settings every FiveM server needs.", time: "5 min" },
    { title: "Fixing Common FiveM Connection Issues", desc: "Troubleshoot artifact errors, NAT issues, and firewall problems.", time: "6 min" },
  ],
  default: [
    { title: "Getting Started Guide", desc: "Everything you need to know to set up your first service.", time: "5 min" },
    { title: "Managing Your Service via the Panel", desc: "Learn the control panel basics: start, stop, restart, and console.", time: "4 min" },
    { title: "Creating and Restoring Backups", desc: "Protect your data with scheduled backups and one-click restores.", time: "3 min" },
    { title: "Connecting via SFTP", desc: "Transfer files securely using FileZilla or any SFTP client.", time: "4 min" },
    { title: "Scheduled Tasks and Automation", desc: "Automate restarts, backups, and commands with cron-style schedules.", time: "5 min" },
    { title: "Upgrading Your Plan", desc: "Scale your resources instantly without losing any data.", time: "2 min" },
  ],
};

export default function KBCategoryClient({ category }: { category: { name: string; icon: string; articles: number; slug: string } }) {
  const articles = articleBank[category.slug] || articleBank.default;

  return (
    <>
      <PageHeader badge={`${category.icon} ${category.name}`} title={category.name} highlight="Articles" description={`${category.articles} guides and tutorials to help you get the most out of ${category.name}.`} />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/knowledgebase" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Knowledgebase
          </Link>

          <div className="space-y-3">
            {articles.map((article, i) => (
              <motion.div key={article.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="premium-card p-6 group cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.desc}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                      <Clock className="w-3 h-3" /> {article.time} read
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
