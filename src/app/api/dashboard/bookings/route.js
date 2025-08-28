import { db } from "../../../../../lib/db";

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { eventDate: "desc" },
      include: {
        artist: {
          select: {
            name: true,
            location: true,
            category: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch bookings" }),
      { status: 500 }
    );
  }
}
