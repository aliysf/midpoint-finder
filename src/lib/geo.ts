/**
 * Geographic Midpoint Calculator
 *
 * Calculates the geographic midpoint (center of gravity) of multiple
 * latitude/longitude coordinates using the cartesian coordinate method.
 *
 * This avoids issues with averaging lat/lng directly (which fails near
 * the date line or poles) by converting to 3D cartesian coordinates,
 * averaging, then converting back.
 *
 * @see https://www.geomidpoint.com/calculation.html
 */

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calculate the geographic midpoint of an array of coordinates.
 *
 * Uses the cartesian center-of-gravity method:
 * 1. Convert each lat/lng to 3D cartesian coordinates (x, y, z)
 * 2. Compute the arithmetic mean of x, y, z
 * 3. Convert the averaged cartesian point back to lat/lng
 *
 * @param points - Array of geographic points with latitude and longitude
 * @returns The geographic midpoint, or null if no points are provided
 */
export function calculateMidpoint(points: GeoPoint[]): GeoPoint | null {
  if (points.length === 0) return null;
  if (points.length === 1) return points[0];

  let x = 0;
  let y = 0;
  let z = 0;

  for (const point of points) {
    const lat = toRadians(point.latitude);
    const lng = toRadians(point.longitude);

    // Convert to cartesian coordinates
    x += Math.cos(lat) * Math.cos(lng);
    y += Math.cos(lat) * Math.sin(lng);
    z += Math.sin(lat);
  }

  const total = points.length;
  x /= total;
  y /= total;
  z /= total;

  // Convert back to lat/lng
  const hyp = Math.sqrt(x * x + y * y);
  const latitude = toDegrees(Math.atan2(z, hyp));
  const longitude = toDegrees(Math.atan2(y, x));

  return {
    latitude: Math.round(latitude * 1e6) / 1e6,
    longitude: Math.round(longitude * 1e6) / 1e6,
  };
}

/**
 * Calculate the distance between two geographic points using the Haversine formula.
 *
 * @param point1 - First geographic point
 * @param point2 - Second geographic point
 * @returns Distance in kilometers
 */
export function haversineDistance(point1: GeoPoint, point2: GeoPoint): number {
  const R = 6371; // Earth's radius in km

  const dLat = toRadians(point2.latitude - point1.latitude);
  const dLng = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.latitude)) *
      Math.cos(toRadians(point2.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c * 100) / 100;
}
