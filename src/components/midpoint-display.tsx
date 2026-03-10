"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, MapPin } from "lucide-react";
import type { GeoPoint } from "@/lib/geo";

interface MidpointDisplayProps {
  midpoint: GeoPoint | null;
  participantCount: number;
}

/**
 * Displays the calculated geographic midpoint prominently.
 *
 * Shows:
 * - The midpoint coordinates
 * - How many participants are contributing
 * - A link to view the midpoint in Google Maps
 */
export function MidpointDisplay({
  midpoint,
  participantCount,
}: MidpointDisplayProps) {
  if (!midpoint) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Target className="h-10 w-10 mb-2 opacity-50" />
          <p className="text-sm font-medium">No midpoint yet</p>
          <p className="text-xs mt-1">
            At least one person needs to share their location
          </p>
        </CardContent>
      </Card>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps?q=${midpoint.latitude},${midpoint.longitude}`;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Midpoint
          </span>
          <Badge variant="secondary">
            {participantCount} {participantCount === 1 ? "person" : "people"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-background p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Latitude</p>
              <p className="font-mono font-semibold text-sm">
                {midpoint.latitude.toFixed(6)}
              </p>
            </div>
            <div className="rounded-lg bg-background p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Longitude</p>
              <p className="font-mono font-semibold text-sm">
                {midpoint.longitude.toFixed(6)}
              </p>
            </div>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground p-3 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
