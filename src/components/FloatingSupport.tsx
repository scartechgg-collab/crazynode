"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Headphones } from "lucide-react";

export default function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/50 mb-2"
          >
            <div className="bg-brand p-4">
              <div className="flex items-center gap-3">
                <Headphones className="w-6 h-6 text-white" />
                <div>
                  <h4 className="text-sm font-bold text-white">CrazyNode Support</h4>
                  <p className="text-xs text-white/80">We typically reply within minutes</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-dark-bg rounded-xl p-3 max-w-[85%]">
                <p className="text-sm text-gray-300">👋 Hey! How can we help you today?</p>
                <p className="text-xs text-gray-600 mt-1">Support Team</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-600 focus:border-brand/50 focus:outline-none"
                />
                <button className="p-2.5 bg-brand rounded-xl text-white hover:bg-brand-dark transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/30 hover:shadow-brand/50 transition-shadow"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
