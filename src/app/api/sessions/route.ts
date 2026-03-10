/**
 * POST /api/sessions
 *
 * Creates a new midpoint-finding session.
 * Generates a unique short slug for sharing.
 *
 * Request body:
 *   - name: string       — Session name / description
 *   - creatorName: string — Name of the person creating the session
 *
 * Response:
 *   - 201: { session } — The created session object with its slug
 *   - 400: { error }   — Validation error
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, creatorName } = body;

    if (!name || !creatorName) {
      return NextResponse.json(
        { error: "Session name and your name are required." },
        { status: 400 }
      );
    }

    // Generate a short, URL-friendly slug (8 characters)
    const slug = nanoid(8);

    const session = await prisma.session.create({
      data: {
        slug,
        name: name.trim(),
        creatorName: creatorName.trim(),
      },
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create session.", details: message },
      { status: 500 }
    );
  }
}
