"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareLinkProps {
  slug: string;
}

/**
 * Share link component with copy-to-clipboard functionality.
 *
 * Generates the full URL for the session and provides:
 * - A read-only input showing the URL
 * - A copy button with visual feedback
 * - A native share button (on supported browsers)
 */
export function ShareLink({ slug }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/s/${slug}`
      : `/s/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my MidPoint session",
          text: "Click the link to share your location and find our midpoint!",
          url,
        });
      } catch {
        // User cancelled the share dialog
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex gap-2">
      <Input value={url} readOnly className="font-mono text-sm" />
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        className="shrink-0"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        className="shrink-0"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
