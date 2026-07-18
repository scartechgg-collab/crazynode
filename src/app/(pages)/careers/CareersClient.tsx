"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Heart, Coffee, Laptop, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const jobs = [
  { title: "Senior Systems Engineer", dept: "Infrastructure", location: "Mumbai / Remote", type: "Full-time", salary: "₹18-30 LPA" },
  { title: "Full-Stack Developer", dept: "Engineering", location: "Remote", type: "Full-time", salary: "₹12-22 LPA" },
  { title: "DevOps Engineer", dept: "Infrastructure", location: "Mumbai", type: "Full-time", salary: "₹15-25 LPA" },
  { title: "Support Specialist", dept: "Customer Success", location: "Remote", type: "Full-time", salary: "₹4-8 LPA" },
  { title: "Network Security Engineer", dept: "Security", location: "Mumbai / Remote", type: "Full-time", salary: "₹14-24 LPA" },
  { title: "Community Manager", dept: "Marketing", location: "Remote", type: "Full-time", salary: "₹6-10 LPA" },
];

const benefits = [
  { icon: Heart, title: "Health Insurance", desc: "Comprehensive coverage for you and your family" },
  { icon: Laptop, title: "Top Equipment", desc: "Latest hardware and software tools provided" },
  { icon: Coffee, title: "Flexible Hours", desc: "Work when you're most productive" },
  { icon: TrendingUp, title: "Growth Path", desc: "Clear career progression and skill development" },
];

export default function CareersClient() {
  return (
    <>
      <PageHeader badge="🚀 Careers" title="Join The" highlight="Team" description="Help us build the future of game server hosting. Work on infrastructure that powers thousands of gaming communities." />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-6">
                <b.icon className="w-10 h-10 text-brand mb-4" />
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Open Positions */}
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Open <span className="gradient-text">Positions</span></h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {jobs.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="premium-card p-6 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand transition-colors">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.dept}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                      <span className="text-brand font-medium">{job.salary}</span>
                    </div>
                  </div>
                  <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 border border-dark-border text-sm font-medium text-white rounded-xl hover:border-brand/50 hover:bg-white/5 transition-all shrink-0">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
