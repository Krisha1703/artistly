// /pages/api/analytics.js (Next.js 13: /app/api/analytics/route.js)
import { db } from "../../../../../lib/db";


export async function GET() {
  try {
    // Total counts
    const totalUsers = await db.user.count();
    const totalArtists = await db.artist.count();
    const totalBookings = await db.booking.count();

    // Revenue
    const bookings = await db.booking.findMany();
    const totalRevenue = bookings.reduce((sum, b) => sum + b.bookingFee, 0);

    // Bookings per month
    const monthlyData = [];
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const bookingsByMonth = {};

    bookings.forEach(b => {
      const month = new Date(b.eventDate).getMonth();
      bookingsByMonth[month] = (bookingsByMonth[month] || 0) + 1;
    });

    for (let i = 0; i < 12; i++) {
      monthlyData.push({ month: monthNames[i], count: bookingsByMonth[i] || 0 });
    }

    // Artists by category
    const artists = await db.artist.findMany();
    const categoryCount = {};
    artists.forEach(a => {
      a.category.forEach(c => categoryCount[c] = (categoryCount[c] || 0) + 1);
    });

    const categoryData = Object.entries(categoryCount).map(([name, count]) => ({ name, count }));

    return new Response(JSON.stringify({
      totalUsers,
      totalArtists,
      totalBookings,
      totalRevenue,
      monthlyData,
      categoryData
    }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch analytics" }), { status: 500 });
  }
}