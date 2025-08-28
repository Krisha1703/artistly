import { db } from "../../../../../lib/db";

export async function GET() {
  const artists = await db.artist.findMany({
    include: { bookings: true },
  });
  return new Response(JSON.stringify(artists), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const newArtist = await db.artist.create({ data: body });
  return new Response(JSON.stringify(newArtist), { status: 201 });
}
