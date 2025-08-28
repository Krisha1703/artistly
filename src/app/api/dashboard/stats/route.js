import { db } from "../../../../../lib/db";

export async function GET() {
  try {
    // 1. Total Artists
    const totalArtists = await db.artist.count();

    // 2. Total Bookings
    const totalBookings = await db.booking.count();

    // 3. Total Users
    const totalUsers = await db.user.count();

    // 4. Completed Payments
    const completedPayments = await db.booking.count({
      where: { paymentStatus: "completed" },
    });

    // 5. Pending Payments
    const pendingPayments = await db.booking.count({
      where: { paymentStatus: "pending" },
    });

    // 6. Failed Payments
    const failedPayments = await db.booking.count({
      where: { paymentStatus: "failed" },
    });

    // 7. Total Revenue
    const totalRevenueAgg = await db.booking.aggregate({
      _sum: { bookingFee: true },
      where: { paymentStatus: "completed" },
    });
    const totalRevenue = totalRevenueAgg._sum.bookingFee || 0;

    // 8. Guests Served
    const guestsServedAgg = await db.booking.aggregate({
      _sum: { guests: true },
    });
    const guestsServed = guestsServedAgg._sum.guests || 0;

    // 9. Average Artist Rating
    const avgRatingAgg = await db.artist.aggregate({
      _avg: { rating: true },
    });
    const averageArtistRating = avgRatingAgg._avg.rating || 0;

    return new Response(
      JSON.stringify({
        totalArtists,
        totalBookings,
        totalUsers,
        completedPayments,
        pendingPayments,
        failedPayments,
        totalRevenue,
        guestsServed,
        averageArtistRating,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
      status: 500,
    });
  }
}
