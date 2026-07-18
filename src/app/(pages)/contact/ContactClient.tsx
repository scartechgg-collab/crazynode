"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ContactClient() {
  return (
    <>
      <PageHeader badge="📧 Contact" title="Get In" highlight="Touch" description="Have questions? Our team is here to help 24/7. Reach out through any channel below." />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: "Email Us", desc: "root@crazynode.in", sub: "We respond within 1 hour" },
              { icon: MessageSquare, title: "Live Chat", desc: "Available 24/7", sub: "Talk to our support team now" },
              { icon: Clock, title: "Support Hours", desc: "24/7/365", sub: "We never sleep, so you can" },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-6 text-center">
                <c.icon className="w-10 h-10 text-brand mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
                <p className="text-brand text-sm font-medium">{c.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{c.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-600 focus:border-brand/50 focus:outline-none transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-600 focus:border-brand/50 focus:outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-600 focus:border-brand/50 focus:outline-none transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white focus:border-brand/50 focus:outline-none transition-colors">
                    <option>General Inquiry</option>
                    <option>Sales</option>
                    <option>Technical Support</option>
                    <option>Billing</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-600 focus:border-brand/50 focus:outline-none transition-colors resize-none" placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/25">
                  Send Message
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="premium-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Frequently Asked</h3>
                {[
                  { q: "How fast is server setup?", a: "All game servers are deployed instantly, usually within 30-60 seconds of payment." },
                  { q: "Do you offer refunds?", a: "Yes, we offer a 48-hour money-back guarantee on all hosting plans." },
                  { q: "What payment methods do you accept?", a: "We accept UPI, Credit/Debit Cards, Net Banking, PayPal, and Crypto." },
                  { q: "Is DDoS protection included?", a: "Yes, all plans include our enterprise-grade DDoS protection at no extra cost." },
                ].map((faq) => (
                  <div key={faq.q} className="py-3 border-b border-dark-border last:border-0">
                    <p className="text-sm font-semibold text-white mb-1">{faq.q}</p>
                    <p className="text-xs text-gray-500">{faq.a}</p>
                  </div>
                ))}
              </div>

              <div className="premium-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-brand" />
                  <h3 className="text-lg font-bold text-white">Our Headquarters</h3>
                </div>
                <p className="text-sm text-gray-400">CrazyNode Technologies</p>
                <p className="text-sm text-gray-500">Mumbai, Maharashtra, India</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
