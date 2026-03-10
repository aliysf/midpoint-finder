"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

interface JoinSessionProps {
  slug: string;
  onJoined: () => void;
}

/**
 * Form for joining a midpoint session.
 *
 * Flow:
 * 1. User enters their display name
 * 2. Clicks "Share My Location"
 * 3. Browser requests geolocation permission
 * 4. Location is sent to the server
 * 5. Callback notifies parent to refresh data
 */
export function JoinSession({ slug, onJoined }: JoinSessionProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleJoin = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setGettingLocation(true);

    // Request geolocation from the browser
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      setGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setGettingLocation(false);
        setLoading(true);

        try {
          const response = await fetch(`/api/sessions/${slug}/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.trim(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Failed to join session.");
          }

          toast.success("You've joined the session! Your location has been shared.");
          onJoined();
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Something went wrong."
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error(
              "Location access denied. Please allow location access and try again."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location unavailable. Please try again.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out. Please try again.");
            break;
          default:
            toast.error("An unknown error occurred getting your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Join This Session
        </CardTitle>
        <CardDescription>
          Enter your name and share your location to find the midpoint with
          everyone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="join-name">Your Name</Label>
            <Input
              id="join-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
          </div>
          <Button
            onClick={handleJoin}
            disabled={loading || gettingLocation}
            className="w-full gap-2"
          >
            {gettingLocation ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Getting your location...
              </>
            ) : loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                Share My Location & Join
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
