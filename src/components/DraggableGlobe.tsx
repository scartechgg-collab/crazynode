"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Marker {
  city: string;
  lat: number;
  lng: number;
  latency: string;
  flag: string;
}

interface DraggableGlobeProps {
  markers: Marker[];
  active: number;
  onSelect: (index: number) => void;
}

// NASA Blue Marble equirectangular texture (public domain)
const EARTH_TEXTURE = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg";

const RADIUS = 180;
const AUTO_ROTATE_SPEED = 0.08;

export default function DraggableGlobe({ markers, active, onSelect }: DraggableGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textureDataRef = useRef<ImageData | null>(null);
  const rotationRef = useRef({ x: 0.1, y: 0 });
  const targetRotationRef = useRef({ x: 0.1, y: 0 });
  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Convert lat/lng to 3D vector, then project to 2D
  const projectMarker = useCallback((lat: number, lng: number, rotX: number, rotY: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    // 3D point on sphere
    let x = -Math.sin(phi) * Math.cos(theta);
    let y = Math.cos(phi);
    let z = Math.sin(phi) * Math.sin(theta);

    // Rotate around Y (longitude drag)
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const nx = x * cosY - z * sinY;
    const nz = x * sinY + z * cosY;
    x = nx;
    z = nz;

    // Rotate around X (latitude drag)
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const ny = y * cosX - z * sinX;
    const nz2 = y * sinX + z * cosX;
    y = ny;
    z = nz2;

    return { x, y, z };
  }, []);

  // Load Earth texture
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      // Extract pixel data via off-screen canvas
      const off = document.createElement("canvas");
      off.width = img.width;
      off.height = img.height;
      const ctx = off.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          textureDataRef.current = ctx.getImageData(0, 0, img.width, img.height);
        } catch {
          // Cross-origin fallback: keep image only
        }
      }
      setImageLoaded(true);
    };
    img.onerror = () => setImageLoaded(true);
    img.src = EARTH_TEXTURE;
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 420;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    const render = () => {
      // Ease toward target rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.12;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.12;

      if (autoRotateRef.current && !draggingRef.current) {
        targetRotationRef.current.y += AUTO_ROTATE_SPEED * 0.016;
      }

      ctx.clearRect(0, 0, size, size);

      // Outer atmosphere glow
      const atmGrad = ctx.createRadialGradient(cx, cy, RADIUS * 0.95, cx, cy, RADIUS * 1.2);
      atmGrad.addColorStop(0, "rgba(255,45,85,0.18)");
      atmGrad.addColorStop(0.6, "rgba(255,45,85,0.06)");
      atmGrad.addColorStop(1, "rgba(255,45,85,0)");
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS * 1.2, 0, Math.PI * 2);
      ctx.fill();

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;
      const texture = textureDataRef.current;

      if (texture) {
        // Ray-cast pixel sphere
        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;
        const texW = texture.width;
        const texH = texture.height;
        const texData = texture.data;

        for (let py = 0; py < size; py++) {
          for (let px = 0; px < size; px++) {
            const dx = px - cx;
            const dy = py - cy;
            const dist2 = dx * dx + dy * dy;
            if (dist2 > RADIUS * RADIUS) continue;

            // Point on sphere surface (screen coords → sphere)
            const nx = dx / RADIUS;
            const ny = dy / RADIUS;
            const nz = Math.sqrt(1 - nx * nx - ny * ny);

            // Inverse rotate X
            const cosX = Math.cos(-rotX);
            const sinX = Math.sin(-rotX);
            const y1 = ny * cosX - nz * sinX;
            const z1 = ny * sinX + nz * cosX;

            // Inverse rotate Y
            const cosY = Math.cos(-rotY);
            const sinY = Math.sin(-rotY);
            const x2 = nx * cosY - z1 * sinY;
            const z2 = nx * sinY + z1 * cosY;

            // Sphere → lat/lng
            const lat = Math.asin(-y1);
            const lng = Math.atan2(-z2, -x2);

            // → texture UV
            const u = (lng + Math.PI) / (2 * Math.PI);
            const v = (lat + Math.PI / 2) / Math.PI;

            const tx = Math.floor(u * texW) % texW;
            const ty = Math.min(texH - 1, Math.floor((1 - v) * texH));

            const tIdx = (ty * texW + tx) * 4;
            const idx = (py * size + px) * 4;

            // Simple lighting: front-facing brighter, edge darker
            const light = Math.pow(nz, 0.45);
            data[idx] = texData[tIdx] * light;
            data[idx + 1] = texData[tIdx + 1] * light;
            data[idx + 2] = texData[tIdx + 2] * light;
            data[idx + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);

        // Subtle rim highlight
        const rim = ctx.createRadialGradient(cx - 30, cy - 40, RADIUS * 0.3, cx, cy, RADIUS);
        rim.addColorStop(0, "rgba(255,255,255,0.05)");
        rim.addColorStop(1, "rgba(0,0,0,0.35)");
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = rim;
        ctx.beginPath();
        ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      } else if (imageRef.current) {
        // Fallback: draw texture flat inside clipped circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(imageRef.current, cx - RADIUS, cy - RADIUS, RADIUS * 2, RADIUS * 2);
        ctx.restore();
      } else {
        // Placeholder while loading
        ctx.fillStyle = "#0e1420";
        ctx.beginPath();
        ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // Grid overlay (latitude/longitude lines)
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = projectMarker(lat, lng, rotX, rotY);
          if (p.z < -0.02) continue;
          const sx = cx + p.x * RADIUS;
          const sy = cy - p.y * RADIUS;
          if (lng === -180) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // Draw markers
      markers.forEach((m, i) => {
        const p = projectMarker(m.lat, m.lng, rotX, rotY);
        if (p.z < 0) return; // behind globe
        const sx = cx + p.x * RADIUS;
        const sy = cy - p.y * RADIUS;
        const isActive = i === active;
        const scale = isActive ? 1 : 0.75;

        // Glow ring
        ctx.beginPath();
        ctx.arc(sx, sy, 10 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,45,85,0.18)";
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(sx, sy, isActive ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ff2d55";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imageLoaded, markers, active, projectMarker]);

  // Pointer / touch drag handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onDown = (event: PointerEvent) => {
      draggingRef.current = true;
      autoRotateRef.current = false;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      setIsDragging(true);
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = event.clientX - lastPointerRef.current.x;
      const dy = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      targetRotationRef.current.y += dx * 0.006;
      targetRotationRef.current.x -= dy * 0.006;
      // Clamp latitude tilt
      targetRotationRef.current.x = Math.max(-1.2, Math.min(1.2, targetRotationRef.current.x));
    };
    const onUp = (event: PointerEvent) => {
      draggingRef.current = false;
      setIsDragging(false);
      try { canvas.releasePointerCapture(event.pointerId); } catch {}
      // Resume slow auto-rotate after a pause
      window.setTimeout(() => { if (!draggingRef.current) autoRotateRef.current = true; }, 3200);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
    };
  }, []);

  // Rotate to bring the active marker to the front (long-press marker button uses onSelect)
  useEffect(() => {
    const marker = markers[active];
    if (!marker) return;
    if (draggingRef.current) return;
    autoRotateRef.current = false;
    targetRotationRef.current.y = -((marker.lng + 180) * Math.PI) / 180 - Math.PI / 2;
    targetRotationRef.current.x = (marker.lat * Math.PI) / 180 * 0.6;
    const t = window.setTimeout(() => { autoRotateRef.current = true; }, 4000);
    return () => window.clearTimeout(t);
  }, [active, markers]);

  // Click-to-select markers via canvas hit-test
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    let nearest = -1;
    let bestDist = 18 * 18;
    markers.forEach((m, i) => {
      const p = projectMarker(m.lat, m.lng, rotationRef.current.x, rotationRef.current.y);
      if (p.z < 0) return;
      const sx = cx + p.x * RADIUS;
      const sy = cy - p.y * RADIUS;
      const d = (sx - px) ** 2 + (sy - py) ** 2;
      if (d < bestDist) { bestDist = d; nearest = i; }
    });
    if (nearest >= 0) onSelect(nearest);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative orbital rings */}
      <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[.05]" />
      <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-white/[.04] rotate-12" />
      <div className="absolute w-[560px] h-[560px] rounded-full border border-white/[.025] -rotate-12" />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className={`select-none touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          aria-label="Interactive Earth globe. Drag to rotate. Tap a marker to select a region."
        />
        {/* Skeleton overlay while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full border-2 border-brand border-t-transparent animate-spin" />
          </div>
        )}
      </motion.div>

      {/* Drag hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] font-medium text-gray-400">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        Drag to rotate · tap markers to select
      </div>
    </div>
  );
}
