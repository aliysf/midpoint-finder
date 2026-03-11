import { ImageResponse } from "next/og";

/**
 * Auto-generated favicon for the ketemuu app.
 * Renders the logo: map marker pin with connected dots.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          viewBox="0 0 512 512"
          width="256"
          height="256"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Map marker pin shape */}
          <path
            d="M256 488C256 488 432 304 432 196C432 98.8 353.2 20 256 20C158.8 20 80 98.8 80 196C80 304 256 488 256 488Z"
            fill="#0f172a"
          />
          {/* Connection lines */}
          <line x1="256" y1="130" x2="186" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
          <line x1="256" y1="130" x2="326" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
          <line x1="186" y1="242" x2="326" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
          <line x1="256" y1="130" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
          <line x1="186" y1="242" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
          <line x1="326" y1="242" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
          {/* Participant dots */}
          <circle cx="256" cy="130" r="18" fill="white" />
          <circle cx="186" cy="242" r="18" fill="white" />
          <circle cx="326" cy="242" r="18" fill="white" />
          {/* Center midpoint dot */}
          <circle cx="256" cy="205" r="26" fill="#3b82f6" />
          <circle cx="256" cy="205" r="16" fill="white" />
          <circle cx="256" cy="205" r="8" fill="#3b82f6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
