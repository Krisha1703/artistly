
import { useState, useEffect } from "react";
import { getAllArtists } from "../actions/fetch-artist";

export const useFetchArtists = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await getAllArtists();
      console.log("📦 Artist Response:", response);

      if (response.success) {
        setAllArtists(response.artists);
        setFilteredArtists(response.artists);
      } else {
        console.error("Error fetching artists:", response.error);
      }
    };

    fetchArtists();
  }, []);

  return { allArtists, filteredArtists, setFilteredArtists };
};
