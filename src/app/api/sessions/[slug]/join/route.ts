/**
 * POST /api/sessions/[slug]/join
 *
 * Adds a participant to an existing session.
 * The participant provides their name and geographic coordinates.
 *
 * Request body:
 *   - name: string      — Participant's display name
 *   - latitude: number   — Participant's latitude
 *   - longitude: number  — Participant's longitude
 *
 * Response:
 *   - 201: { participant, midpoint } — New participant + updated midpoint
 *   - 400: { error }                 — Validation error
 *   - 404: { error }                 — Session not found
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateMidpoint } from "@/lib/geo";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, latitude, longitude } = body;

    // Validate input
    if (!name || typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        { error: "Name, latitude, and longitude are required." },
        { status: 400 }
      );
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: "Invalid coordinates." },
        { status: 400 }
      );
    }

    // Find the session
    const session = await prisma.session.findUnique({
      where: { slug },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found." },
        { status: 404 }
      );
    }

    // Create the participant
    const participant = await prisma.participant.create({
      data: {
        name: name.trim(),
        latitude,
        longitude,
        sessionId: session.id,
      },
    });

    // Get all participants and compute new midpoint
    const allParticipants = await prisma.participant.findMany({
      where: { sessionId: session.id },
    });

    const midpoint = calculateMidpoint(
      allParticipants.map((p) => ({
        latitude: p.latitude,
        longitude: p.longitude,
      }))
    );

    return NextResponse.json({ participant, midpoint }, { status: 201 });
  } catch (error) {
    console.error("Error joining session:", error);
    return NextResponse.json(
      { error: "Failed to join session." },
      { status: 500 }
    );
  }
}
