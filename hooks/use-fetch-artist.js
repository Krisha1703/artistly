"use client";

import { useState, useEffect } from "react";
import { getAllArtists } from "../actions/fetch-artist";

export const useFetchArtists = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchArtists = async () => {
      const response = await getAllArtists();

      if (response.success) {
        setAllArtists(response.artists);
        setFilteredArtists(response.artists);
      } else {
        console.error(response.error);
      }
    };

    fetchArtists();
  }, [isMounted,setAllArtists, setFilteredArtists]);

  return {
    allArtists: isMounted ? allArtists : [], 
    filteredArtists: isMounted ? filteredArtists : [],
    setFilteredArtists,
  };
};
