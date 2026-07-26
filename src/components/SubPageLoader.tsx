"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SubPageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#070708] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-[#e3174e]/10 blur-2xl animate-pulse" />
            <Image
              src="https://i.postimg.cc/fykv1Fgx/1000018451.png"
              alt="CrazyNode"
              width={72}
              height={72}
              className="rounded-2xl relative z-10"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg font-bold"
            style={{ color: "#e3174e" }}
          >
            CrazyNode
          </motion.p>

          <div className="mt-5 w-32 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-full bg-[#e3174e] rounded-full"
            />
          </div>

          <div className="mt-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e3174e] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#e3174e] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#e3174e] animate-bounce" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
