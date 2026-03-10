/**
 * Nearby Places Finder
 *
 * Uses the OpenStreetMap Overpass API to find restaurants, cafes,
 * and other food/drink venues near a given geographic coordinate.
 *
 * The Overpass API is free and requires no API key.
 *
 * @see https://wiki.openstreetmap.org/wiki/Overpass_API
 */

export interface Place {
  id: number;
  name: string;
  type: PlaceType;
  latitude: number;
  longitude: number;
  cuisine?: string;
  address?: string;
  openingHours?: string;
  website?: string;
  phone?: string;
}

export type PlaceType =
  | "restaurant"
  | "cafe"
  | "fast_food"
  | "bar"
  | "pub"
  | "food_court";

/** Human-readable labels for place types */
export const placeTypeLabels: Record<PlaceType, string> = {
  restaurant: "Restaurant",
  cafe: "Café",
  fast_food: "Fast Food",
  bar: "Bar",
  pub: "Pub",
  food_court: "Food Court",
};

/** Emoji icons for each place type */
export const placeTypeIcons: Record<PlaceType, string> = {
  restaurant: "🍽️",
  cafe: "☕",
  fast_food: "🍔",
  bar: "🍸",
  pub: "🍺",
  food_court: "🏬",
};

/**
 * Overpass API element shape (subset of fields we use).
 */
interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

/**
 * Fetch nearby restaurants and cafes from the Overpass API.
 *
 * Searches within a given radius (in meters) around the coordinates
 * for nodes/ways tagged as amenity=restaurant, cafe, fast_food, bar, pub, or food_court.
 *
 * @param lat      - Latitude of the center point
 * @param lng      - Longitude of the center point
 * @param radiusM  - Search radius in meters (default 1500m = 1.5km)
 * @param limit    - Maximum number of results to return (default 20)
 * @returns Array of Place objects sorted by proximity
 */
export async function fetchNearbyPlaces(
  lat: number,
  lng: number,
  radiusM: number = 1500,
  limit: number = 20
): Promise<Place[]> {
  // Overpass QL query: find amenities of type restaurant/cafe/etc within radius
  const query = `
    [out:json][timeout:10];
    (
      node["amenity"~"restaurant|cafe|fast_food|bar|pub|food_court"]["name"](around:${radiusM},${lat},${lng});
      way["amenity"~"restaurant|cafe|fast_food|bar|pub|food_court"]["name"](around:${radiusM},${lat},${lng});
    );
    out center ${limit};
  `;

  const url = "https://overpass-api.de/api/interpreter";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.status}`);
  }

  const data = await response.json();
  const elements: OverpassElement[] = data.elements || [];

  // Transform Overpass elements into our Place format
  const places: Place[] = elements
    .map((el) => {
      const elLat = el.lat ?? el.center?.lat;
      const elLon = el.lon ?? el.center?.lon;
      const tags = el.tags || {};

      if (!elLat || !elLon || !tags.name) return null;

      const amenity = tags.amenity as PlaceType;

      return {
        id: el.id,
        name: tags.name,
        type: amenity,
        latitude: elLat,
        longitude: elLon,
        cuisine: tags.cuisine?.replace(/;/g, ", "),
        address: [tags["addr:street"], tags["addr:housenumber"]]
          .filter(Boolean)
          .join(" ") || undefined,
        openingHours: tags.opening_hours,
        website: tags.website,
        phone: tags.phone,
      } as Place;
    })
    .filter((p): p is Place => p !== null);

  // Sort by distance from center (closest first)
  places.sort((a, b) => {
    const distA = Math.hypot(a.latitude - lat, a.longitude - lng);
    const distB = Math.hypot(b.latitude - lat, b.longitude - lng);
    return distA - distB;
  });

  return places;
}
