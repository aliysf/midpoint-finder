import { SessionView } from "@/components/session-view";
import type { Metadata } from "next";

/**
 * Dynamic session page.
 *
 * Renders the interactive session view for a given slug.
 * The slug is extracted from the URL params.
 *
 * Route: /s/:slug
 */

interface SessionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SessionPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Session ${slug} — MidPoint`,
    description: "Join this session, share your location, and find the midpoint!",
  };
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SessionView slug={slug} />
    </div>
  );
}
