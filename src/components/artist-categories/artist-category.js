// Artist Category Listing Component

"use client";

import { useState } from "react";
import { ArtistData } from "@/data/artists";
import SlideArrow from "./slide-arrow";
import Heading from "../heading";
import ArtistCard from "../explore-artists/artist-card";

const itemsPerPage = 4;

const ArtistCategoriesSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + itemsPerPage < ArtistData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
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
            {ArtistData.slice(startIndex, startIndex + itemsPerPage).map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </div>

          {startIndex > 0 && <SlideArrow direction="left" onClick={handlePrev} />}
          {startIndex + itemsPerPage < ArtistData.length && (
            <SlideArrow direction="right" onClick={handleNext} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistCategoriesSection;
