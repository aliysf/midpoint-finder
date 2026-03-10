"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  joinedAt: string;
}

interface ParticipantListProps {
  participants: Participant[];
}

/**
 * Displays the list of participants who have joined the session.
 *
 * Each row shows:
 * - Participant name
 * - Their coordinates (rounded)
 * - When they joined
 */
export function ParticipantList({ participants }: ParticipantListProps) {
  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <User className="h-10 w-10 mb-2 opacity-50" />
        <p className="text-sm">No one has joined yet.</p>
        <p className="text-xs mt-1">Share the link to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {participants.map((p, index) => (
        <div
          key={p.id}
          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-sm">{p.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {new Date(p.joinedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Badge>
        </div>
      ))}
    </div>
  );
}
