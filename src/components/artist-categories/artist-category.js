// Artist Category Listing Component

"use client";

import { useState, useEffect } from "react";
import SlideArrow from "./slide-arrow";
import Heading from "../heading";
import ArtistCard from "../explore-artists/artist-card";
import { useFetchArtists } from "../../../hooks/use-fetch-artist";

const ArtistCategoriesSection = () => {
   const { allArtists } = useFetchArtists();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // sm screens: 1 item
      } else {
        setItemsPerPage(4); // md and above: 4 items
      }
    };

    updateItems(); 
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < allArtists.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <Heading
          prefix="Popular"
          focus="Artist"
          suffix="Categories"
          subheading={true}
        />

        <div className="relative my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allArtists.slice(startIndex, startIndex + itemsPerPage).map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </div>

          {startIndex > 0 && <SlideArrow direction="left" onClick={handlePrev} />}
          {startIndex + itemsPerPage < allArtists.length && (
            <SlideArrow direction="right" onClick={handleNext} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistCategoriesSection;
