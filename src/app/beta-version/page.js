// Beta version of event matching with artists

"use client";

import { useState, memo } from "react";
import dynamic from "next/dynamic";
import ArtistCard from "@/components/explore-artists/artist-card";
import Heading from "@/components/heading";
import { useFetchArtists } from "../../../hooks/use-fetch-artist";
import {EVENT_TO_ARTIST_CATEGORIES} from "../../data/artists";

const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const GetQuoteForm = dynamic(() => import("@/components/explore-artists/classify-event"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });


const BetaEventMatch = () => {
  const { allArtists, setFilteredArtists } = useFetchArtists();
  const [predictedEvent, setPredictedEvent] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  // function for predicting and classifying the event images
  const handlePrediction = (eventClass) => {
    setPredictedEvent(eventClass);
    const suggestions = EVENT_TO_ARTIST_CATEGORIES[eventClass.toLowerCase()] || EVENT_TO_ARTIST_CATEGORIES.default;

    // filters and displays artist based on suggestion provided by classifying the event
    const filtered = allArtists.filter(artist => {
      if (Array.isArray(artist.category)) {
        return artist.category.some(cat =>
          suggestions.some(suggested =>
            cat.toLowerCase() === suggested.toLowerCase()
          )
        );
      }
      if (typeof artist.category === "string") {
        return suggestions.some(suggested =>
          artist.category.toLowerCase() === suggested.toLowerCase()
        );
      }
      return false;
    });

    // Sort by rating descending
    const sorted = filtered.sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      return ratingB - ratingA;
    });

    const topArtists = sorted.slice(0, 3);
    setFilteredArtists(filtered); 
    setTopArtists(topArtists);   
  };

  return (
    <>
      <Navbar />

      <section className="p-6 my-10 w-5/6 mx-auto">

        <Heading
          prefix="Match"
          focus="Performing Artists"
          suffix="For Your Event"
        />

        <GetQuoteForm onPrediction={handlePrediction} />

         {topArtists.length === 0 && predictedEvent && (
            <p className="text-center text-gray-500 my-4">
              No top artists found for {predictedEvent}.
            </p>
          )}

          {topArtists.length > 0 && (
            <div className="text-center my-6">
              <h2 className="text-3xl font-bold text-purple-700">
                Top {topArtists.length} Artists for {predictedEvent}
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topArtists.map((artist, index) => (
              <ArtistCard key={artist._id || index} artist={artist} />
            ))}
          </div>

        </section>

      <Footer />
    </>
  );
};

export default memo(BetaEventMatch);
