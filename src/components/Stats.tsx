"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (value === "24/7") {
      setDisplay("24/7");
      return;
    }
    const numericPart = value.replace(/[^0-9.]/g, "");
    const target = parseFloat(numericPart);
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }
    const duration = 2000;
    const steps = 60;
    let current = 0;
    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (target >= 1000) {
        setDisplay(Math.floor(current).toLocaleString());
      } else if (target % 1 !== 0) {
        setDisplay(current.toFixed(2));
      } else {
        setDisplay(Math.floor(current).toString());
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  if (value === "24/7") {
    return <span>{inView ? "24/7" : "0"}</span>;
  }

  const suffix = value.replace(/[0-9.,]/g, "");

  return <span>{display}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,45,85,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text text-glow mb-2">
                <AnimatedCounter value={stat.value} inView={inView} />
              </div>
              <p className="text-gray-400 text-sm sm:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
