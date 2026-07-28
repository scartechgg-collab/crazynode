"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { 
  Shield, Zap, Users, Globe, Target, Eye, Cpu, HardDrive, Rocket, 
  ShieldCheck, Clock, LayoutDashboard, Headphones, Server, Network, 
  Gauge, Activity, Lock, Sparkles, Heart, ChevronDown, MessageCircle
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

// --- Data Definitions ---

const values = [
  { icon: Zap, title: "Performance", desc: "We obsess over every millisecond, ensuring your servers run at maximum capacity without compromise." },
  { icon: ShieldCheck, title: "Reliability", desc: "Enterprise-grade infrastructure guarantees consistent uptime and stable performance." },
  { icon: Sparkles, title: "Innovation", desc: "Continuously adopting the latest technologies to stay ahead of the curve in hosting." },
  { icon: Lock, title: "Security", desc: "Hardened servers, encrypted backups, and robust DDoS protection keep your data safe." },
  { icon: Users, title: "Community", desc: "Built by gamers, for gamers. We actively listen and adapt to our community's needs." },
  { icon: Heart, title: "Customer First", desc: "Our support goes above and beyond. Your success is our success, 24/7." },
];

const whyChooseUs = [
  { icon: Server, title: "High Performance Hardware", desc: "Top-tier infrastructure designed for demanding workloads." },
  { icon: Cpu, title: "AMD Ryzen CPUs", desc: "Latest generation processors for single-threaded game performance." },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Blazing fast read/write speeds for instant map loading." },
  { icon: Rocket, title: "Instant Deployment", desc: "Get your server live in seconds, not minutes or hours." },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade mitigation to keep you online during attacks." },
  { icon: Clock, title: "99.9% Uptime", desc: "Guaranteed reliability with redundant network architecture." },
  { icon: LayoutDashboard, title: "Powerful Control Panel", desc: "Manage files, subusers, and settings with an intuitive UI." },
  { icon: Headphones, title: "24/7 Support", desc: "Expert support team available around the clock to help." },
];

const infrastructure = [
  { icon: Server, title: "Enterprise-Grade Hardware", desc: "We utilize only the best enterprise-grade server hardware to ensure maximum stability." },
  { icon: Network, title: "Premium Networking", desc: "Blazing fast 1Gbps to 10Gbps uplinks with premium global transit providers." },
  { icon: Gauge, title: "Low Latency", desc: "Strategically located data centers ensure minimal ping for your players." },
  { icon: Activity, title: "High Availability", desc: "Redundant power supplies, networks, and backup systems guarantee uptime." },
  { icon: Eye, title: "Continuous Monitoring", desc: "Our infrastructure is monitored 24/7/365 to prevent issues before they happen." },
  { icon: Lock, title: "Secure Infrastructure", desc: "Physical security, hardware firewalls, and strict access controls protect your data." },
];

const timeline = [
  { year: "2022", title: "Founded", desc: "CrazyNode was born with a mission to provide premium hosting at fair prices." },
  { year: "2023", title: "1,000 Servers", desc: "Reached our first milestone of 1,000 active game servers." },
  { year: "2024", title: "Global Expansion", desc: "Expanded to 8 data center locations across 4 continents." },
  { year: "2025", title: "50,000 Clients", desc: "Celebrated 50,000 happy clients and 10,000+ active servers." },
  { year: "2026", title: "Enterprise Launch", desc: "Launched enterprise solutions with dedicated account management." },
];

const faqs = [
  { q: "What makes CrazyNode different from other hosts?", a: "Unlike traditional hosts, we build our infrastructure specifically for gaming. We use high-clock-speed AMD Ryzen CPUs, NVMe SSDs, and have a deep understanding of game server mechanics, ensuring lag-free performance." },
  { q: "Do you offer DDoS protection?", a: "Yes, every single server at CrazyNode comes with enterprise-grade DDoS protection included for free. We mitigate attacks at the edge to keep your server online without lagging your players." },
  { q: "How long does it take to deploy a server?", a: "Servers are deployed instantly! As soon as your payment is processed, your server is created and ready to configure within seconds." },
  { q: "Can I upgrade my server later?", a: "Absolutely. You can upgrade or downgrade your server at any time directly from our billing area. The changes apply instantly without data loss." },
  { q: "What kind of support do you provide?", a: "We offer 24/7 support via Discord and tickets. Our staff consists of experienced system administrators and gamers ready to help with any issue." },
];

const team = [
  {
    name: "Battlefox",
    role: "Founder",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    discord: "oe_battlefox",
    img: "https://i.postimg.cc/vHfPhjWW/5a27d353563da224fd6315739f43a947.png",
    desc: "Founder of CrazyNode, responsible for leading the company's vision, growth, and long-term strategy."
  },
  {
    name: "MrNovamc",
    role: "Co-Founder",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    discord: "mrnovamc",
    img: "https://i.postimg.cc/05JZ53XH/64c1face1defe33c6dd5aa31ae57cf75.png",
    desc: "Co-Founder of CrazyNode, focused on operations, infrastructure, and delivering reliable hosting services."
  },
  {
    name: "ItzMeScar",
    role: "Chairman",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    discord: "itzmescar.",
    img: "https://i.postimg.cc/fy4c0zqj/980a4af1c405380d9092b7337b2537d2.png",
    desc: "Chairman of CrazyNode, overseeing innovation, technical development, and future planning for the platform."
  }
];

// --- Helper Components ---

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (val) => setCount(Math.floor(val))
      });
      return () => controls.stop();
    }
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="premium-card overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <span className="font-bold text-white pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Component ---

export default function AboutClient() {
  return (
    <>
      <PageHeader badge="🏢 About Us" title="About" highlight="CrazyNode" description="We're on a mission to provide the most powerful, reliable, and affordable game server hosting on the planet. Experience lag-free gaming powered by cutting-edge technology." />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-6">Our <span className="gradient-text">Story</span></h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>CrazyNode is a premier game server hosting provider built by a team of passionate gamers and system administrators. We were frustrated with the state of the industry—slow hardware, poor support, and unreliable uptime were the norm—and we knew we could do better.</p>
                <p>Our goal was simple: create a hosting platform that delivers reliable, high-performance infrastructure without breaking the bank. What sets us apart is our deep understanding of gaming workloads and our commitment to using only the latest enterprise-grade hardware.</p>
                <p>Today, we power over 10,000 game servers for 50,000+ clients worldwide. Our infrastructure runs on AMD Ryzen 9 processors, NVMe SSDs, and 1 Tbps DDoS protection to deliver an unmatched hosting experience. We don't just host servers; we build communities.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { val: <AnimatedCounter to={99} suffix=".99%" />, label: "Uptime SLA" }, 
                { val: <AnimatedCounter to={50} suffix="K+" />, label: "Happy Clients" }, 
                { val: <AnimatedCounter to={10} suffix="K+" />, label: "Active Servers" }, 
                { val: <AnimatedCounter to={24} suffix="/7" />, label: "Support" }
              ].map((s) => (
                <div key={s.label} className="premium-card p-6 text-center">
                  <p className="text-2xl font-extrabold gradient-text mb-1">{s.val}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-8">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">To empower gamers and developers by providing the most reliable, high-performance hosting infrastructure. We strive to eliminate lag and downtime, allowing communities to thrive without technical interruptions.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="premium-card p-8">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">To become the global standard for game server hosting. We envision a future where setting up a server is effortless, performance is guaranteed, and support is instantaneous—setting the benchmark for the entire industry.</p>
              </motion.div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose <span className="gradient-text">CrazyNode</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="premium-card p-6">
                  <v.icon className="w-8 h-8 text-brand mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our <span className="gradient-text">Values</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="premium-card p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                      <v.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Infrastructure */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our <span className="gradient-text">Infrastructure</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {infrastructure.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="premium-card p-6">
                  <item.icon className="w-8 h-8 text-brand mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our <span className="gradient-text">Journey</span></h2>
            <div className="max-w-3xl mx-auto space-y-0">
              {timeline.map((t, i) => (
                <motion.div key={t.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm shrink-0">{t.year}</div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-dark-border mt-2" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-bold text-white">{t.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <FAQItem q={faq.q} a={faq.a} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership <span className="gradient-text">Team</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <motion.div 
                  key={member.name} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="premium-card p-8 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/10"
                >
                  <div className="relative w-28 h-28 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/40 to-purple-500/40 blur-md animate-pulse"></div>
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="relative w-28 h-28 rounded-full object-cover border-2 border-white/10"
                    />
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${member.badgeColor} mb-3`}>
                    {member.role}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <MessageCircle className="w-4 h-4" />
                    <span>{member.discord}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">{member.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
      <CTA />
    </>
  );
}
