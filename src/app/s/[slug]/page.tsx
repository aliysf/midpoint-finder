import { SessionView } from "@/components/session-view";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

/**
 * Dynamic session page.
 *
 * Renders the interactive session view for a given slug.
 * Generates rich metadata (OG tags) dynamically from the session data.
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

  // Fetch session data for rich metadata
  let sessionName = "Session";
  let participantCount = 0;

  try {
    const session = await prisma.session.findUnique({
      where: { slug },
      include: { _count: { select: { participants: true } } },
    });
    if (session) {
      sessionName = session.name;
      participantCount = session._count.participants;
    }
  } catch {
    // Fallback to generic metadata if DB fails
  }

  const title = `${sessionName} — ketemuu`;
  const description = `Join "${sessionName}" on ketemuu! ${
    participantCount > 0
      ? `${participantCount} ${participantCount === 1 ? "person has" : "people have"} already shared their location.`
      : "Share your location to find the group's geographic midpoint."
  } No login required.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://ketemuu.vercel.app/s/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: false, // Session pages are ephemeral, don't index
      follow: true,
    },
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
