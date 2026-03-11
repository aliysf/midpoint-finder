import { ImageResponse } from "next/og";

/**
 * Auto-generated Apple Touch Icon (180x180).
 * Same logo as favicon but with a colored background
 * since iOS requires non-transparent icons.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          borderRadius: 36,
        }}
      >
        <svg
          viewBox="0 0 512 512"
          width="140"
          height="140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Map marker pin shape */}
          <path
            d="M256 488C256 488 432 304 432 196C432 98.8 353.2 20 256 20C158.8 20 80 98.8 80 196C80 304 256 488 256 488Z"
            fill="#1e293b"
          />
          {/* Connection lines */}
          <line x1="256" y1="130" x2="186" y2="242" stroke="white" strokeWidth="6" opacity="0.35" strokeLinecap="round" />
          <line x1="256" y1="130" x2="326" y2="242" stroke="white" strokeWidth="6" opacity="0.35" strokeLinecap="round" />
          <line x1="186" y1="242" x2="326" y2="242" stroke="white" strokeWidth="6" opacity="0.35" strokeLinecap="round" />
          <line x1="256" y1="130" x2="256" y2="205" stroke="white" strokeWidth="6" opacity="0.55" strokeLinecap="round" />
          <line x1="186" y1="242" x2="256" y2="205" stroke="white" strokeWidth="6" opacity="0.55" strokeLinecap="round" />
          <line x1="326" y1="242" x2="256" y2="205" stroke="white" strokeWidth="6" opacity="0.55" strokeLinecap="round" />
          {/* Participant dots */}
          <circle cx="256" cy="130" r="20" fill="white" />
          <circle cx="186" cy="242" r="20" fill="white" />
          <circle cx="326" cy="242" r="20" fill="white" />
          {/* Center midpoint dot */}
          <circle cx="256" cy="205" r="28" fill="#3b82f6" />
          <circle cx="256" cy="205" r="18" fill="white" />
          <circle cx="256" cy="205" r="9" fill="#3b82f6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
