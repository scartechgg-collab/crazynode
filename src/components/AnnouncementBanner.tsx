"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone } from "lucide-react";

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<{ enabled: boolean; text: string; type: string } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/content/announcements")
      .then((r) => r.json())
      .then((d) => {
        if (d.value && d.value.enabled) setAnnouncement(d.value);
        else if (d.enabled) setAnnouncement(d);
      })
      .catch(() => {});
  }, []);

  if (!announcement || dismissed || !announcement.enabled) return null;

  return (
    <AnimatePresence>
      <motion.div
        // Height animate karne se ye apne aap space lega aur website ko niche push karega
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative top-0 left-0 right-0 z-[60] w-full overflow-hidden"
      >
        <div
          className={`text-center py-2.5 px-4 text-xs font-medium flex items-center justify-center gap-3 ${
            announcement.type === "warning"
              ? "bg-amber-500/15 border-b border-amber-500/20 text-amber-300"
              : announcement.type === "promo"
              ? "bg-brand/15 border-b border-brand/20 text-white"
              : "bg-blue-500/15 border-b border-blue-500/20 text-blue-200"
          }`}
        >
          <Megaphone className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{announcement.text}</span>
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 p-1 rounded-full hover:bg-white/10 flex-shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
