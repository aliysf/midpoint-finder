import { ImageResponse } from "next/og";

/**
 * Auto-generated Open Graph image for social sharing.
 * This creates a 1200x630 PNG that appears when the site is shared
 * on Facebook, Twitter, LinkedIn, WhatsApp, etc.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */

export const runtime = "edge";
export const alt = "MidPoint — Find the midpoint between friends on a map";
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
        {/* Background grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.1)",
            display: "flex",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "#fff",
            marginBottom: 30,
            fontSize: 40,
          }}
        >
          📍
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
          MidPoint
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
          Find the geographic midpoint between friends
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
          midpoint-finder-gamma.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
