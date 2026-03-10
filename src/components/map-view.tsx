"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { GeoPoint } from "@/lib/geo";

/**
 * Fix for Leaflet default marker icons not loading in Next.js.
 * The default icon URLs reference files from the Leaflet package
 * that aren't properly resolved by Next.js bundler.
 */
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/**
 * A red icon for the midpoint marker to visually distinguish it.
 */
const MidpointIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Participant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  participants: Participant[];
  midpoint: GeoPoint | null;
}

/**
 * Inner component that auto-fits the map bounds
 * whenever participants or midpoint change.
 */
function FitBounds({
  participants,
  midpoint,
}: {
  participants: Participant[];
  midpoint: GeoPoint | null;
}) {
  const map = useMap();

  useEffect(() => {
    const points: L.LatLngExpression[] = participants.map((p) => [
      p.latitude,
      p.longitude,
    ]);
    if (midpoint) {
      points.push([midpoint.latitude, midpoint.longitude]);
    }

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [participants, midpoint, map]);

  return null;
}

/**
 * Interactive map displaying all participant locations and the calculated midpoint.
 *
 * Uses Leaflet with OpenStreetMap tiles. Automatically fits the view
 * to show all markers. The midpoint is shown as a red marker.
 */
export function MapView({ participants, midpoint }: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[400px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
        Loading map...
      </div>
    );
  }

  // Default center (world view) if no participants
  const center: L.LatLngExpression =
    participants.length > 0
      ? [participants[0].latitude, participants[0].longitude]
      : [20, 0];

  const zoom = participants.length > 0 ? 10 : 2;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-[400px] w-full rounded-lg z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Participant markers (blue) */}
      {participants.map((p) => (
        <Marker key={p.id} position={[p.latitude, p.longitude]}>
          <Popup>
            <strong>{p.name}</strong>
            <br />
            {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
          </Popup>
        </Marker>
      ))}

      {/* Midpoint marker (red) */}
      {midpoint && (
        <Marker
          position={[midpoint.latitude, midpoint.longitude]}
          icon={MidpointIcon}
        >
          <Popup>
            <strong>📍 Midpoint</strong>
            <br />
            {midpoint.latitude.toFixed(4)}, {midpoint.longitude.toFixed(4)}
          </Popup>
        </Marker>
      )}

      <FitBounds participants={participants} midpoint={midpoint} />
    </MapContainer>
  );
}
