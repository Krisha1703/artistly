// Exploring Artists Component

"use client";

import { useState, useEffect } from "react";
import ArtistCard from "@/components/explore-artists/artist-card";
import FilterPanel from "@/components/explore-artists/filter-panel";
import { IndividualArtists } from "@/data/artists";
import Heading from "@/components/heading";

const ExploreArtists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minReviews, setMinReviews] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredArtists, setFilteredArtists] = useState([]);

  const categories = [...new Set(IndividualArtists.map((a) => a.category))];
  const locations = [...new Set(IndividualArtists.map((a) => a.location))];
  const availabilities = [...new Set(IndividualArtists.map((a) => a.availability))];

  useEffect(() => {
    let filtered = IndividualArtists.filter((artist) => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? artist.category === selectedCategory : true;
      const matchesLocation = selectedLocation ? artist.location === selectedLocation : true;
      const matchesAvailability = selectedAvailability ? artist.availability === selectedAvailability : true;
      const matchesFee = maxFee ? parseInt(artist.fee.replace(/[^\d]/g, "")) <= parseInt(maxFee) : true;
      const matchesRating = minRating ? artist.rating >= parseFloat(minRating) : true;
      const matchesReviews = minReviews ? artist.reviews >= parseInt(minReviews) : true;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesAvailability &&
        matchesFee &&
        matchesRating &&
        matchesReviews
      );
    });
    setFilteredArtists(filtered);
  }, [
    searchTerm,
    selectedCategory,
    selectedLocation,
    selectedAvailability,
    maxFee,
    minRating,
    minReviews,
  ]);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <Heading prefix="Explore" focus="Performing Artists" suffix="Across Categories" subheading={true} />

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded font-semibold"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          aria-label={isMobileFilterOpen ? "Close Filters" : "Open Filters"}
        >
          {isMobileFilterOpen ? "Close Filters" : "Filter"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Side Filter */}
        {isMobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />
        )}
        <aside
          className={`z-50 transition-transform duration-500
            fixed top-0 left-0 w-3/4 h-auto p-0
            md:static md:w-1/4 md:h-auto md:p-0 bg-white
            transform ${
              isMobileFilterOpen ? "translate-x-10 translate-y-20" : "-translate-x-full md:translate-x-0"
            }`}
        >
          <FilterPanel
            categories={categories}
            locations={locations}
            availabilities={availabilities}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedAvailability={selectedAvailability}
            minReviews={minReviews}
            setMinReviews={setMinReviews}
            setSelectedAvailability={setSelectedAvailability}
            minRating={minRating}
            setMinRating={setMinRating}
            maxFee={maxFee}
            setMaxFee={setMaxFee}
            isMobile={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        </aside>

        {/* Artist Cards */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-purple-600">Found: {filteredArtists.length} artists</h4>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-purple-500 px-4 py-2 rounded w-full max-w-xs
             focus:outline-none focus:ring-1 focus:ring-purple-500"
              
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.length === 0 && (
              <p className="col-span-full text-center text-purple-500">No matching artists found.</p>
            )}
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreArtists;
