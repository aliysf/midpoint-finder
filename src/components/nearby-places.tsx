"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  MapPin,
  Clock,
  Globe,
  Phone,
  Loader2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import type { GeoPoint } from "@/lib/geo";
import type { Place, PlaceType } from "@/lib/places";
import { placeTypeLabels, placeTypeIcons } from "@/lib/places";

interface NearbyPlacesProps {
  midpoint: GeoPoint | null;
  /** Callback to pass places to the parent (for map markers) */
  onPlacesLoaded?: (places: Place[]) => void;
}

/** Color map for place type badges */
const typeColors: Record<PlaceType, string> = {
  restaurant: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  cafe: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  fast_food: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  bar: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  pub: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  food_court: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

/**
 * Displays a list of nearby restaurants and cafes around the midpoint.
 *
 * Features:
 * - Fetches places from the Overpass/OSM API via our backend
 * - Shows type badges, cuisine info, address, hours
 * - Links to Google Maps for directions
 * - Expandable details for each place
 * - Passes loaded places to parent for map markers
 */
export function NearbyPlaces({ midpoint, onPlacesLoaded }: NearbyPlacesProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  // Track which midpoint coordinates we last fetched for
  const [fetchedCoords, setFetchedCoords] = useState<string | null>(null);

  const fetchPlaces = useCallback(async () => {
    if (!midpoint) return;

    const coordKey = `${midpoint.latitude},${midpoint.longitude}`;
    // Don't refetch for the same midpoint
    if (coordKey === fetchedCoords) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/places?lat=${midpoint.latitude}&lng=${midpoint.longitude}&radius=2000&limit=15`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nearby places.");
      }

      const data = await response.json();
      setPlaces(data.places);
      setFetchedCoords(coordKey);
      setHasFetched(true);
      onPlacesLoaded?.(data.places);
    } catch (err) {
      console.error("Error fetching places:", err);
      setError("Could not load nearby places. Try again later.");
    } finally {
      setLoading(false);
    }
  }, [midpoint, fetchedCoords, onPlacesLoaded]);

  // Auto-fetch when midpoint becomes available or changes
  useEffect(() => {
    if (midpoint) {
      const coordKey = `${midpoint.latitude},${midpoint.longitude}`;
      if (coordKey !== fetchedCoords) {
        fetchPlaces();
      }
    }
  }, [midpoint, fetchedCoords, fetchPlaces]);

  // No midpoint yet
  if (!midpoint) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Utensils className="h-10 w-10 mb-2 opacity-50" />
          <p className="text-sm font-medium">Nearby places</p>
          <p className="text-xs mt-1">
            Places will appear once a midpoint is calculated
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Nearby Restaurants & Cafés
          </span>
          {hasFetched && !loading && (
            <Badge variant="secondary" className="text-xs font-normal">
              {places.length} found
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Searching nearby places...
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-6">
            <p className="text-sm text-destructive mb-3">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchPlaces}>
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && hasFetched && places.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Utensils className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No restaurants or cafes found nearby.</p>
            <p className="text-xs mt-1">
              Try a location with more commercial activity.
            </p>
          </div>
        )}

        {/* Places list */}
        {!loading && places.length > 0 && (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {places.map((place) => {
              const isExpanded = expandedId === place.id;
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}&query_place_id=${place.name}`;
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;

              return (
                <div
                  key={place.id}
                  className="rounded-lg border bg-card p-3 hover:bg-muted/30 transition-colors"
                >
                  {/* Main row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="text-xl mt-0.5 shrink-0">
                        {placeTypeIcons[place.type] || "📍"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          {place.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span
                            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                              typeColors[place.type] || "bg-muted text-muted-foreground"
                            }`}
                          >
                            {placeTypeLabels[place.type] || place.type}
                          </span>
                          {place.cuisine && (
                            <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                              {place.cuisine}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : place.id)
                      }
                      className="shrink-0 p-1 rounded hover:bg-muted transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t space-y-2 text-xs text-muted-foreground">
                      {place.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>{place.address}</span>
                        </div>
                      )}
                      {place.openingHours && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span className="break-all">{place.openingHours}</span>
                        </div>
                      )}
                      {place.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 shrink-0" />
                          <a
                            href={`tel:${place.phone}`}
                            className="underline hover:text-foreground"
                          >
                            {place.phone}
                          </a>
                        </div>
                      )}
                      {place.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-3 w-3 shrink-0" />
                          <a
                            href={place.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground truncate max-w-[200px]"
                          >
                            {place.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      )}
                      <div className="flex gap-2 pt-1">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          <MapPin className="h-3 w-3" />
                          View on Map
                        </a>
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Directions
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
