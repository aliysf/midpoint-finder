"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { GeoPoint } from "@/lib/geo";
import type { Place } from "@/lib/places";
import { placeTypeLabels, placeTypeIcons } from "@/lib/places";

/* ------------------------------------------------------------------ */
/*  Custom marker icon factories                                       */
/* ------------------------------------------------------------------ */

/**
 * Creates a participant marker — rounded pill with person SVG + first initial.
 * Color: blue (#3b82f6)
 */
function createParticipantIcon(name: string) {
  const initial = name.charAt(0).toUpperCase();
  return L.divIcon({
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -46],
    html: `
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3b82f6;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        color: #fff;
        font-weight: 700;
        font-size: 15px;
        font-family: system-ui, sans-serif;
        line-height: 1;
      ">
        ${initial}
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 9px solid #3b82f6;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
        "></div>
      </div>
    `,
  });
}

/**
 * Midpoint marker — red pin with crosshair + animated pulse ring.
 * Color: red (#ef4444)
 */
const MidpointIcon = L.divIcon({
  className: "",
  iconSize: [48, 56],
  iconAnchor: [24, 56],
  popupAnchor: [0, -58],
  html: `
    <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
      <!-- pulse ring -->
      <div style="
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(239,68,68,0.18);
        animation: midpointPulse 2s ease-out infinite;
      "></div>
      <!-- pin body -->
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ef4444;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 3px 10px rgba(239,68,68,0.45), 0 1px 4px rgba(0,0,0,0.2);
        z-index: 2;
      ">
        <!-- crosshair SVG -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
        </svg>
        <!-- pointer -->
        <div style="
          position: absolute;
          bottom: -9px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #ef4444;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.15));
        "></div>
      </div>
    </div>
  `,
});

/**
 * Creates a place marker — small floating bubble with the venue emoji.
 * Color: white with subtle shadow.
 */
function createPlaceIcon(emoji: string) {
  return L.divIcon({
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
    html: `
      <div style="
        position: relative;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border: 2px solid #f97316;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        font-size: 16px;
        line-height: 1;
      ">
        ${emoji}
        <div style="
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 7px solid #f97316;
        "></div>
      </div>
    `,
  });
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

interface Participant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  participants: Participant[];
  midpoint: GeoPoint | null;
  places?: Place[];
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
 * Interactive map displaying all participant locations, the calculated midpoint,
 * and nearby restaurants/cafes with beautiful custom markers.
 *
 * Marker styles:
 * - Participant  → blue circle with first-name initial + drop pointer
 * - Midpoint     → red circle with crosshair icon + animated pulse ring
 * - Nearby place → white rounded square with venue emoji + orange border
 */
export function MapView({ participants, midpoint, places = [] }: MapViewProps) {
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

      {/* Participant markers — blue circle with initial */}
      {participants.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
          icon={createParticipantIcon(p.name)}
        >
          <Popup>
            <strong>{p.name}</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#666" }}>
              {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
            </span>
          </Popup>
        </Marker>
      ))}

      {/* Midpoint marker — red crosshair with pulse */}
      {midpoint && (
        <Marker
          position={[midpoint.latitude, midpoint.longitude]}
          icon={MidpointIcon}
        >
          <Popup>
            <strong>📍 Midpoint</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#666" }}>
              {midpoint.latitude.toFixed(4)}, {midpoint.longitude.toFixed(4)}
            </span>
          </Popup>
        </Marker>
      )}

      {/* Nearby place markers — emoji bubbles */}
      {places.map((place) => (
        <Marker
          key={`place-${place.id}`}
          position={[place.latitude, place.longitude]}
          icon={createPlaceIcon(placeTypeIcons[place.type] || "📍")}
        >
          <Popup>
            <strong>
              {placeTypeIcons[place.type]} {place.name}
            </strong>
            <br />
            <span style={{ fontSize: "11px", color: "#666" }}>
              {placeTypeLabels[place.type]}
              {place.cuisine && ` · ${place.cuisine}`}
            </span>
            {place.address && (
              <>
                <br />
                <span style={{ fontSize: "11px" }}>📌 {place.address}</span>
              </>
            )}
            <br />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "11px", color: "#3b82f6" }}
            >
              Get directions →
            </a>
          </Popup>
        </Marker>
      ))}

      <FitBounds participants={participants} midpoint={midpoint} />
    </MapContainer>
  );
}
