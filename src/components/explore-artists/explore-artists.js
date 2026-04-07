"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useFetchArtists } from "../../../hooks/use-fetch-artist";
import { useSearchParams } from "next/navigation";

const ArtistCard = dynamic(() => import("@/components/explore-artists/artist-card"), { ssr: false });
const FilterPanel = dynamic(() => import("@/components/explore-artists/filter-panel"), { ssr: false });
const Heading = dynamic(() => import("@/components/heading"), { ssr: false });

const ExploreArtists = () => {
  const { allArtists, filteredArtists, setFilteredArtists } = useFetchArtists();
  const searchParams = useSearchParams();

  // 🎯 STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedFeeRange, setSelectedFeeRange] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minReviews, setMinReviews] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ==========================
  // 🔗 APPLY URL PARAMS → STATE
  // ==========================
  useEffect(() => {
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const feeRange = searchParams.get("feeRange");
    const rating = searchParams.get("rating");
    const search = searchParams.get("search");
    if (search) setSearchTerm(search);

    if (category) setSelectedCategory(category);
    if (location) setSelectedLocation(location);
    if (feeRange) setSelectedFeeRange(feeRange);
    if (rating) setMinRating(rating);

  }, [searchParams]);


  // ==========================
  // 💰 PARSE FEE
  // ==========================
  const parseFeeRange = (feeRange) => {
    if (!feeRange) return { min: 0, max: 0 };

    const match = feeRange.match(/\$?(\d+(?:,\d+)?)\s*-\s*\$?(\d+(?:,\d+)?)/);

    if (match) {
      return {
        min: parseInt(match[1].replace(/,/g, "")),
        max: parseInt(match[2].replace(/,/g, "")),
      };
    }

    return { min: 0, max: 0 };
  };

  // ==========================
  // 🔍 FILTER LOGIC
  // ==========================
  useEffect(() => {
    const filtered = allArtists.filter((artist) => {
      const matchesSearch = artist.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? artist.category?.includes(selectedCategory)
        : true;

      const matchesLocation = selectedLocation
        ? artist.location === selectedLocation
        : true;

      const matchesAvailability = selectedAvailability
        ? artist.availability?.includes(selectedAvailability)
        : true;

      const matchesFeeRange = selectedFeeRange
        ? artist.feeRange === selectedFeeRange
        : true;

      const matchesRating = minRating
        ? artist.rating >= Number(minRating)
        : true;

      const matchesReviews = minReviews
        ? artist.reviews >= Number(minReviews)
        : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesAvailability &&
        matchesFeeRange &&
        matchesRating &&
        matchesReviews
      );
    });

    setFilteredArtists(filtered);
  }, [
    allArtists,
    searchTerm,
    selectedCategory,
    selectedLocation,
    selectedAvailability,
    selectedFeeRange,
    minRating,
    minReviews,
  ]);

  // ==========================
  // 📊 OPTIONS
  // ==========================
  const categories = [...new Set(allArtists.flatMap((a) => a.category || []))];
  const locations = [...new Set(allArtists.map((a) => a.location))];
  const availabilities = [...new Set(allArtists.flatMap((a) => a.availability || []))];

  // ==========================
  // UI
  // ==========================
  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <Heading
        prefix="Explore"
        focus="Performing Artists"
        suffix="Across Categories"
        subheading={true}
      />

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded font-semibold"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? "Close Filters" : "Filter"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* BACKDROP */}
        {isMobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileFilterOpen(false)}
          />
        )}

        {/* FILTER PANEL */}
        <aside
          className={`z-50 transition-transform duration-500
            fixed top-0 left-0 w-3/4
            md:static md:w-1/4
            transform ${
              isMobileFilterOpen
                ? "translate-x-10 translate-y-20"
                : "-translate-x-full md:translate-x-0"
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
            setSelectedAvailability={setSelectedAvailability}
            minReviews={minReviews}
            setMinReviews={setMinReviews}
            minRating={minRating}
            setMinRating={setMinRating}
            selectedFeeRange={selectedFeeRange}
            setSelectedFeeRange={setSelectedFeeRange}
            isMobile={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-purple-600">
              Found: {filteredArtists.length} artists
            </h4>

            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-purple-500 px-4 py-2 rounded w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.length === 0 && (
              <p className="col-span-full text-center text-purple-500">
                No matching artists found.
              </p>
            )}

            {filteredArtists.map((artist, index) => (
              <ArtistCard key={artist._id || index} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ExploreArtists);