import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration for search engine crawlers.
 *
 * Allows all crawlers to index all public pages.
 * Points to the sitemap for efficient crawling.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://midpoint-finder-gamma.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
