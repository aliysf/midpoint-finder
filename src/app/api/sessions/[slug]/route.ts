/**
 * GET /api/sessions/[slug]
 *
 * Retrieves a session and all its participants by slug.
 * Also calculates and returns the current geographic midpoint.
 *
 * Response:
 *   - 200: { session, midpoint } — Session data with participants & computed midpoint
 *   - 404: { error }             — Session not found
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateMidpoint } from "@/lib/geo";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const session = await prisma.session.findUnique({
      where: { slug },
      include: {
        participants: {
          orderBy: { joinedAt: "asc" },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found." },
        { status: 404 }
      );
    }

    // Calculate the midpoint from all participant locations
    const midpoint = calculateMidpoint(
      session.participants.map((p) => ({
        latitude: p.latitude,
        longitude: p.longitude,
      }))
    );

    return NextResponse.json({ session, midpoint });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session." },
      { status: 500 }
    );
  }
}
