"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { LOCATIONS } from "@/lib/constants";

const EARTH_TEXTURE = "https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg";
const BUMP_TEXTURE = "https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png";
const CLOUD_TEXTURE = "https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png";

export interface GlobeLocation {
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  computedLatency?: string;
  latency: string;
}

interface RealEarthGlobeProps {
  activeIndex: number;
  onSelectMarker: (index: number) => void;
  locations?: GlobeLocation[];
}

export default function RealEarthGlobe({ activeIndex, onSelectMarker, locations }: RealEarthGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentActiveRef = useRef<number>(-1);
  const [hoverInfo, setHoverInfo] = useState<{ x: number; y: number; city: string; country: string; flag: string; ping: string } | null>(null);

  const dataPoints: GlobeLocation[] = locations && locations.length > 0 ? locations : (LOCATIONS as unknown as GlobeLocation[]);

  useEffect(() => {
    if (!containerRef.current) return;
    const wrap = containerRef.current;

    // Setup dimensions and renderer
    const width = wrap.clientWidth || 420;
    const height = wrap.clientHeight || 420;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;
    camera.position.y = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.touchAction = "none";
    wrap.appendChild(renderer.domElement);

    // Controls (Standard Orbit Controls) - fully draggable
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.rotateSpeed = 0.6;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = Math.PI - 0.5;

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Lighting setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(15, 5, 15);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x3b82f6, 0.7);
    rim.position.set(-10, -5, -10);
    scene.add(rim);

    // Earth globe sphere (blue marble)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "anonymous";

    const earthTexture = textureLoader.load(EARTH_TEXTURE);
    const bumpTexture = textureLoader.load(BUMP_TEXTURE);
    const sphereGeo = new THREE.SphereGeometry(5, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.08,
      shininess: 10,
      specular: new THREE.Color(0x224466),
    });
    const earth = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(earth);

    // Transparent Cloud layer
    const cloudTexture = textureLoader.load(CLOUD_TEXTURE);
    const cloudGeo = new THREE.SphereGeometry(5.08, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(clouds);

    // Atmosphere Fresnel Glow shader
    const atmoGeo = new THREE.SphereGeometry(5.4, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        glowColor: { value: new THREE.Color(0xff3b66) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmosphere);

    // Create hoverable/draggable location pin markers around the globe
    const markerGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const hitGeo = new THREE.SphereGeometry(0.42, 12, 12); // larger invisible hit-area for easier hover/click
    const inactiveMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const activeMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    const markerMeshes: THREE.Mesh[] = [];
    const hitMeshes: THREE.Mesh[] = [];

    dataPoints.forEach((loc, index) => {
      const isSelected = index === activeIndex;
      const mesh = new THREE.Mesh(markerGeo, isSelected ? activeMat : inactiveMat);

      // Map lat/lng directly to 3D sphere positions
      const phi = ((90 - loc.lat) * Math.PI) / 180;
      const theta = ((loc.lng + 180) * Math.PI) / 180;

      const radius = 5.12;
      const position = new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      mesh.position.copy(position);

      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(position);
      hitMesh.userData = { index };

      markerMeshes.push(mesh);
      hitMeshes.push(hitMesh);
      globeGroup.add(mesh);
      globeGroup.add(hitMesh);
    });

    // Raycasting for hover + click detection
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let isDragging = false;
    let downX = 0;
    let downY = 0;

    const updatePointerNDC = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerNDC(event.clientX, event.clientY);
      raycaster.setFromCamera(pointerNDC, camera);
      const intersects = raycaster.intersectObjects(hitMeshes);

      if (intersects.length > 0) {
        const idx = (intersects[0].object.userData as { index: number }).index;
        const loc = dataPoints[idx];
        renderer.domElement.style.cursor = "pointer";
        setHoverInfo({
          x: event.clientX,
          y: event.clientY,
          city: loc.city,
          country: loc.country,
          flag: loc.flag,
          ping: loc.computedLatency || loc.latency,
        });
      } else {
        renderer.domElement.style.cursor = isDragging ? "grabbing" : "grab";
        setHoverInfo(null);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = false;
      downX = event.clientX;
      downY = event.clientY;
      renderer.domElement.style.cursor = "grabbing";
    };

    const handlePointerUp = (event: PointerEvent) => {
      const movedX = Math.abs(event.clientX - downX);
      const movedY = Math.abs(event.clientY - downY);
      if (movedX < 4 && movedY < 4) {
        // Treat as a click (not a drag)
        updatePointerNDC(event.clientX, event.clientY);
        raycaster.setFromCamera(pointerNDC, camera);
        const intersects = raycaster.intersectObjects(hitMeshes);
        if (intersects.length > 0) {
          const idx = (intersects[0].object.userData as { index: number }).index;
          onSelectMarker(idx);
        }
      }
      renderer.domElement.style.cursor = "grab";
    };

    const handlePointerLeave = () => setHoverInfo(null);

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);

    controls.addEventListener("start", () => {
      isDragging = true;
      controls.autoRotate = false;
    });
    controls.addEventListener("end", () => {
      isDragging = false;
      window.setTimeout(() => {
        controls.autoRotate = true;
      }, 2500);
    });

    // RequestAnimationFrame loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      clouds.rotation.y += 0.0008;
      controls.update();

      // Highlight selected region and pulse correctly
      markerMeshes.forEach((mesh, idx) => {
        if (idx === activeIndex) {
          mesh.material = activeMat;
          const pulseScale = 1 + Math.sin(Date.now() * 0.005) * 0.25;
          mesh.scale.set(pulseScale, pulseScale, pulseScale);
        } else {
          mesh.material = inactiveMat;
          mesh.scale.set(0.85, 0.85, 0.85);
        }
      });

      // Point globe slightly towards the target optimal location when first initialized
      if (currentActiveRef.current !== activeIndex) {
        currentActiveRef.current = activeIndex;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Responsiveness
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = wrap.clientWidth / wrap.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      controls.dispose();
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      markerGeo.dispose();
      hitGeo.dispose();
      try { wrap.removeChild(renderer.domElement); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div ref={containerRef} id="globe-canvas-wrap" className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing">
      <AnimatePresence>
        {hoverInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none glass-strong rounded-xl px-3.5 py-2.5 border border-emerald-500/30 shadow-2xl shadow-black/40"
            style={{ left: hoverInfo.x + 16, top: hoverInfo.y + 16 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{hoverInfo.flag}</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">{hoverInfo.city}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{hoverInfo.country}</p>
              </div>
              <span className="ml-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {hoverInfo.ping}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
