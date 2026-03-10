"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Dialog for creating a new midpoint session.
 *
 * Collects a session name and the creator's name, then calls
 * the POST /api/sessions endpoint to create the session.
 * Redirects to the new session page on success.
 */
export function CreateSessionDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!sessionName.trim() || !creatorName.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sessionName.trim(),
          creatorName: creatorName.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create session.");
      }

      const { session } = await response.json();
      toast.success("Session created! Share the link with your friends.");
      setOpen(false);
      setSessionName("");
      setCreatorName("");
      router.push(`/s/${session.slug}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="lg" className="gap-2 text-base px-8 py-6" />
        }
      >
        <Plus className="h-5 w-5" />
        Create Session
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Session</DialogTitle>
          <DialogDescription>
            Give your session a name and enter your display name. You&apos;ll get a
            shareable link to send to friends.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="session-name">Session Name</Label>
            <Input
              id="session-name"
              placeholder='e.g. "Weekend Meetup" or "Lunch Spot"'
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="creator-name">Your Name</Label>
            <Input
              id="creator-name"
              placeholder="Enter your display name"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={loading} className="gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create & Get Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
