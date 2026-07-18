"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Radio, Route, ShieldCheck, Zap, Sparkles, MapPin } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import RealEarthGlobe from "./RealEarthGlobe";
import { calculateDistanceKm, estimateLatency } from "@/lib/latency";

export default function Locations() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; city?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Fetch user location from free public GeoIP API
  useEffect(() => {
    let cancelled = false;
    async function fetchUserGeolocation() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (!cancelled && data.latitude && data.longitude) {
          setUserLocation({
            lat: data.latitude,
            lng: data.longitude,
            city: data.city || "Detected Region",
          });
        }
      } catch (error) {
        console.error("Could not fetch user geolocation:", error);
        // Fallback to common geographic center if fetch fails
        if (!cancelled) {
          setUserLocation({ lat: 20.5937, lng: 78.9629, city: "Global Region" });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchUserGeolocation();

    return () => {
      cancelled = true;
    };
  }, []);

  // Calculate distances and latencies based on user location
  const computedLocations = useMemo(() => {
    if (!userLocation) return [];
    return LOCATIONS.map((loc) => {
      const distance = calculateDistanceKm(userLocation, { lat: loc.lat, lng: loc.lng });
      const ping = estimateLatency(distance);
      return { ...loc, computedLatency: ping, distance };
    });
  }, [userLocation]);

  // Find the closest region with lowest latency
  const optimalLocationIndex = useMemo(() => {
    if (computedLocations.length === 0) return 0;
    let lowestDistance = Infinity;
    let closestIndex = 0;
    computedLocations.forEach((loc, idx) => {
      if (loc.distance < lowestDistance) {
        lowestDistance = loc.distance;
        closestIndex = idx;
      }
    });
    return closestIndex;
  }, [computedLocations]);

  const displayIndex = selectedIndex ?? optimalLocationIndex;
  const highlightedLocation = computedLocations[displayIndex] || LOCATIONS[0];

  return (
    <section id="infrastructure" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#08090b]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[.06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            <Radio className="w-3.5 h-3.5" /> Global Infrastructure
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Infrastructure Without <span className="gradient-text">Borders</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Drag the globe to explore our edge regions, or hover any marker to see live ping from your location.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.45fr_.8fr] min-h-[580px]">
            {/* Globe stage */}
            <div className="relative min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[.07]">
              <div className="absolute inset-0 opacity-[.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "38px 38px" }} />

              <RealEarthGlobe activeIndex={displayIndex} onSelectMarker={setSelectedIndex} locations={computedLocations} />

              {/* Closest region indicator */}
              <div className="absolute left-5 sm:left-8 bottom-6 z-10 glass-strong rounded-2xl p-4 min-w-[250px] shadow-2xl shadow-black/40 border border-emerald-500/25 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {selectedIndex !== null ? "Selected Region" : "Closest To You"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{highlightedLocation.flag}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{highlightedLocation.city}</p>
                    <p className="text-xs text-gray-500">{highlightedLocation.country} data center</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {highlightedLocation.computedLatency || highlightedLocation.latency}
                  </span>
                </div>
              </div>

              <div className="absolute right-5 sm:right-8 top-5 sm:top-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-[11px] font-medium text-emerald-400 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All regions operational
              </div>
            </div>

            {/* Location Stats List */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[.18em] text-gray-600 font-semibold flex items-center justify-between">
                    <span>Real-time Performance</span>
                    {loading && <span className="text-[9px] normal-case text-brand font-medium animate-pulse">Computing local ping...</span>}
                  </p>
                  <h3 className="text-xl font-bold text-white mt-2">Live network routes</h3>

                  {/* Detected Location Chip */}
                  {userLocation && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[.03] border border-white/[.08] text-xs text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-brand" />
                      Connected via: <span className="text-gray-200 font-medium capitalize">{userLocation.city}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 flex-1 max-h-[300px] overflow-y-auto pr-1">
                  {computedLocations.map((loc, index) => {
                    const isHighlighted = index === displayIndex;
                    return (
                      <button
                        key={loc.city}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`text-left rounded-xl px-3.5 py-3 border transition-all duration-300 relative select-none ${
                          isHighlighted
                            ? "bg-emerald-500/[.08] border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/5"
                            : "bg-white/[.02] border-white/[.06] hover:bg-white/[.04] hover:border-white/[.12]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-base">{loc.flag}</span>
                          <span className={`text-[10px] font-semibold ${isHighlighted ? "text-emerald-400" : "text-gray-500"}`}>
                            {loc.computedLatency || "Calculating..."}
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-semibold text-white">{loc.city}</p>
                        <div className="mt-1.5 h-1 bg-white/[.04] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${isHighlighted ? "bg-emerald-400" : "bg-gray-600"}`}
                            style={{ width: `${Math.max(10, 100 - (loc.distance / 20000) * 100)}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6">
                {[
                  { icon: Route, label: "Tier-1 transit" },
                  { icon: ShieldCheck, label: "1 Tbps shield" },
                  { icon: Zap, label: "Smart routing" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/[.025] border border-white/[.055] p-3 text-center">
                    <item.icon className="w-4 h-4 mx-auto text-gray-400 mb-2" />
                    <p className="text-[10px] leading-tight text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
