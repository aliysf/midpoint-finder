import type { MetadataRoute } from "next";

/**
 * Web App Manifest for PWA-like behavior.
 * Enables "Add to Home Screen" on mobile devices.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ketemuu — Find the Middle Ground",
    short_name: "ketemuu",
    description:
      "Find the geographic midpoint between friends. Create a shareable link, share locations, and discover the perfect meeting spot.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
