import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params; // ✅ just use params directly

  try {
    // Delete artist
    const deletedArtist = await db.artist.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting artist:", err);

    // If Prisma P2025 (not found), return 404
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete artist" },
      { status: 500 }
    );
  }
}
