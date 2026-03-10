import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap for Google and other search engines.
 *
 * Includes:
 * - Home page (highest priority)
 *
 * Session pages (/s/[slug]) are user-generated and ephemeral,
 * so they're not included in the sitemap.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://midpoint-finder-gamma.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
