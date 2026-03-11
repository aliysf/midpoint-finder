"use client";

import Link from "next/link";

/**
 * ketemuu logo — map marker pin with connected dots.
 * Inline SVG so it renders crisp at any size without external requests.
 */
function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Map marker pin shape */}
      <path
        d="M256 488C256 488 432 304 432 196C432 98.8 353.2 20 256 20C158.8 20 80 98.8 80 196C80 304 256 488 256 488Z"
        fill="#0f172a"
      />
      {/* Subtle ring */}
      <circle cx="256" cy="196" r="130" fill="none" stroke="#1e293b" strokeWidth="8" />
      {/* Connection lines (triangle) */}
      <line x1="256" y1="130" x2="186" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
      <line x1="256" y1="130" x2="326" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
      <line x1="186" y1="242" x2="326" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
      {/* Lines to center */}
      <line x1="256" y1="130" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
      <line x1="186" y1="242" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
      <line x1="326" y1="242" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
      {/* Participant dots (white) */}
      <circle cx="256" cy="130" r="18" fill="white" />
      <circle cx="186" cy="242" r="18" fill="white" />
      <circle cx="326" cy="242" r="18" fill="white" />
      {/* Center midpoint (blue accent) */}
      <circle cx="256" cy="205" r="26" fill="#3b82f6" />
      <circle cx="256" cy="205" r="16" fill="white" />
      <circle cx="256" cy="205" r="8" fill="#3b82f6" />
    </svg>
  );
}

/**
 * Site-wide header / navigation bar.
 * Shows the ketemuu logo and a link back to home.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Logo className="h-9 w-9" />
          <span>Ketemuu</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
