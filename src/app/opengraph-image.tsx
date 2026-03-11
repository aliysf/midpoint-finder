import { ImageResponse } from "next/og";

/**
 * Auto-generated Open Graph image for social sharing.
 * Features the ketemuu logo (map marker + connection dots).
 */

export const runtime = "edge";
export const alt = "ketemuu — Find the midpoint between friends on a map";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            top: -100,
            right: -100,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
            bottom: -200,
            left: -100,
            display: "flex",
          }}
        />

        {/* Logo — inline SVG map marker with connection dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            position: "relative",
          }}
        >
          <svg
            viewBox="0 0 512 512"
            width="100"
            height="100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 488C256 488 432 304 432 196C432 98.8 353.2 20 256 20C158.8 20 80 98.8 80 196C80 304 256 488 256 488Z"
              fill="#1e293b"
            />
            <circle cx="256" cy="196" r="130" fill="none" stroke="#334155" strokeWidth="6" />
            <line x1="256" y1="130" x2="186" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
            <line x1="256" y1="130" x2="326" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
            <line x1="186" y1="242" x2="326" y2="242" stroke="white" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
            <line x1="256" y1="130" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
            <line x1="186" y1="242" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
            <line x1="326" y1="242" x2="256" y2="205" stroke="white" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
            <circle cx="256" cy="130" r="18" fill="white" />
            <circle cx="186" cy="242" r="18" fill="white" />
            <circle cx="326" cy="242" r="18" fill="white" />
            <circle cx="256" cy="205" r="26" fill="#3b82f6" />
            <circle cx="256" cy="205" r="16" fill="white" />
            <circle cx="256" cy="205" r="8" fill="#3b82f6" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          ketemuu
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginTop: 16,
            maxWidth: 700,
            display: "flex",
          }}
        >
          Find the perfect meeting spot between friends
        </div>

        {/* Features row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 40,
          }}
        >
          {["📍 Share Location", "🎯 Find Midpoint", "🍽️ Nearby Places"].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 18,
                }}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            display: "flex",
          }}
        >
          ketemuu.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
