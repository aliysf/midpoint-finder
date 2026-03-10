"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShareLink } from "@/components/share-link";
import { JoinSession } from "@/components/join-session";
import { ParticipantList } from "@/components/participant-list";
import { MidpointDisplay } from "@/components/midpoint-display";
import { Users, RefreshCw } from "lucide-react";
import type { GeoPoint } from "@/lib/geo";

/**
 * Dynamically import the map component to avoid SSR issues with Leaflet.
 * Leaflet relies on `window` which doesn't exist during server rendering.
 */
const MapView = dynamic(() => import("@/components/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
      Loading map...
    </div>
  ),
});

interface Participant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  joinedAt: string;
}

interface Session {
  id: string;
  slug: string;
  name: string;
  creatorName: string;
  createdAt: string;
  participants: Participant[];
}

interface SessionViewProps {
  slug: string;
}

/**
 * Main session page component.
 *
 * Features:
 * - Polls for session data every 3 seconds for real-time updates
 * - Displays an interactive map with all participant markers + midpoint
 * - Shows participant list and midpoint coordinates
 * - Provides share link and join form
 */
export function SessionView({ slug }: SessionViewProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [midpoint, setMidpoint] = useState<GeoPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Fetch session data from the API.
   * Called initially and on a polling interval.
   */
  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch(`/api/sessions/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError("Session not found. It may have been deleted.");
          return;
        }
        throw new Error("Failed to fetch session data.");
      }

      const data = await response.json();
      setSession(data.session);
      setMidpoint(data.midpoint);
      setError(null);
    } catch (err) {
      console.error("Error fetching session:", err);
      setError("Failed to load session. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Initial fetch and polling setup
  useEffect(() => {
    fetchSession();

    // Poll every 3 seconds for real-time updates
    intervalRef.current = setInterval(fetchSession, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchSession]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Loading session...
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-destructive font-medium">
              {error || "Session not found."}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please check the link and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{session.name}</h1>
          <p className="text-sm text-muted-foreground">
            Created by <span className="font-medium">{session.creatorName}</span>{" "}
            · {new Date(session.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Badge variant="outline" className="w-fit gap-1">
          <Users className="h-3 w-3" />
          {session.participants.length}{" "}
          {session.participants.length === 1 ? "participant" : "participants"}
        </Badge>
      </div>

      {/* Share Link */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Share This Session</CardTitle>
        </CardHeader>
        <CardContent>
          <ShareLink slug={slug} />
        </CardContent>
      </Card>

      {/* Map */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            Live Map
            <Badge variant="secondary" className="gap-1 text-xs font-normal">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Auto-refreshing
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MapView participants={session.participants} midpoint={midpoint} />
          <p className="text-xs text-muted-foreground mt-2">
            🔵 Blue markers = participants · 🔴 Red marker = midpoint
          </p>
        </CardContent>
      </Card>

      {/* Two-column layout: Midpoint + Participants */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Midpoint Display */}
        <MidpointDisplay
          midpoint={midpoint}
          participantCount={session.participants.length}
        />

        {/* Participant List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <ParticipantList participants={session.participants} />
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Join Form */}
      <JoinSession slug={slug} onJoined={fetchSession} />
    </div>
  );
}
