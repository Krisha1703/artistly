// app/api/bookings/my/route.js
import { db } from "../../../../../lib/db";

export async function GET(req) {
  try {
    // Optional: get userId from query if needed
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const whereClause = userId ? { userId } : {};

    const bookings = await db.booking.findMany({
      where: whereClause,
      include: { artist: true },
      orderBy: { eventDate: "desc" },
    });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
      status: 500,
    });
  }
}
