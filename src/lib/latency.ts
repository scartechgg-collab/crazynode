export interface GeoPoint {
  lat: number;
  lng: number;
}

/**
 * Computes the great-circle distance between two geographical points
 * using the Haversine formula.
 */
export function calculateDistanceKm(p1: GeoPoint, p2: GeoPoint): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimates realistic network round-trip ping based on physical distance.
 * Signals propagate through fiber at ~70% of the speed of light (~200km/ms).
 * We add a small routing buffer overhead for backbone peering.
 */
export function estimateLatency(distanceKm: number): string {
  const opticalMs = (distanceKm * 0.72) / 200; // 70% of light speed in fiber
  const overhead = 3.5; // Average router processing overhead in ms
  const estimatedPing = Math.ceil(opticalMs + overhead);
  return `${estimatedPing} ms`;
}