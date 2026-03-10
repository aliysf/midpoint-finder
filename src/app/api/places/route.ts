/**
 * GET /api/places?lat=...&lng=...&radius=...&limit=...
 *
 * Searches for nearby restaurants, cafes, and food venues
 * around the given coordinates using the OpenStreetMap Overpass API.
 *
 * Query Parameters:
 *   - lat:    number (required) — Latitude of the search center
 *   - lng:    number (required) — Longitude of the search center
 *   - radius: number (optional) — Search radius in meters (default: 1500)
 *   - limit:  number (optional) — Max results to return (default: 20)
 *
 * Response:
 *   - 200: { places: Place[] } — Array of nearby places
 *   - 400: { error: string }   — Invalid parameters
 *   - 500: { error: string }   — Server / Overpass API error
 */

import { NextResponse } from "next/server";
import { fetchNearbyPlaces } from "@/lib/places";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const latStr = searchParams.get("lat");
    const lngStr = searchParams.get("lng");
    const radiusStr = searchParams.get("radius");
    const limitStr = searchParams.get("limit");

    if (!latStr || !lngStr) {
      return NextResponse.json(
        { error: "lat and lng query parameters are required." },
        { status: 400 }
      );
    }

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: "Invalid coordinates." },
        { status: 400 }
      );
    }

    const radius = radiusStr ? Math.min(Math.max(parseInt(radiusStr, 10), 100), 5000) : 1500;
    const limit = limitStr ? Math.min(Math.max(parseInt(limitStr, 10), 1), 50) : 20;

    const places = await fetchNearbyPlaces(lat, lng, radius, limit);

    // Cache the response for 5 minutes to avoid hitting Overpass rate limits
    return NextResponse.json(
      { places },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby places. Please try again." },
      { status: 500 }
    );
  }
}
