// Fetches all artists from the database

"use server";

import { db } from "../lib/db";

export const getAllArtists = async () => {
  try {
    const artists = await db.artist.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return{ success: true, artists };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch artists" };
  }
};
