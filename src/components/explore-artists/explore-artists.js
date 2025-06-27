"use client";

import { useState, useEffect } from "react";
import ArtistCard from "@/components/explore-artists/artist-card";
import FilterPanel from "@/components/explore-artists/filter-panel";
import Heading from "@/components/heading";
import { getAllArtists } from "../../../actions/fetch-artist";

const ExploreArtists = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minReviews, setMinReviews] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // 🔍 Filtering with debug logs
  useEffect(() => {
    console.log("🔄 Filters Applied:");
    console.log("Search Term:", searchTerm);
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Location:", selectedLocation);
    console.log("Selected Availability:", selectedAvailability);
    console.log("Max Fee:", maxFee);
    console.log("Min Rating:", minRating);

    const filtered = allArtists.filter((artist) => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? artist.category?.includes(selectedCategory)
        : true;

      const matchesLocation = selectedLocation
        ? artist.location === selectedLocation
        : true;

      const matchesAvailability = selectedAvailability
        ? artist.availability?.includes(selectedAvailability)
        : true;

      const artistFeeMax = parseFeeRange(artist.feeRange);
      const inputMaxFee = parseInt(maxFee || 0);
      const matchesFee = maxFee ? artistFeeMax <= inputMaxFee : true;

      const matchesRating = minRating
        ? artist.rating >= parseFloat(minRating)
        : true;

      const result = (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesAvailability &&
        matchesFee &&
        matchesRating
      );

      if (result) {
        console.log(`✅ Artist matched: ${artist.name}`);
      }

      return result;
    });

    setFilteredArtists(filtered);
  }, [
    allArtists,
    searchTerm,
    selectedCategory,
    selectedLocation,
    selectedAvailability,
    maxFee,
    minRating,
  ]);

  const parseFeeRange = (feeRange) => {
    if (!feeRange) return 0;
    const match = feeRange.match(/\$?(\d+(?:,\d+)?)\s*-\s*\$?(\d+(?:,\d+)?)/);
    if (match) {
      const max = match[2].replace(/,/g, "");
      return parseInt(max);
    }
    return 0;
  };

  const categories = [...new Set(allArtists.flatMap((a) => a.category))];
  const locations = [...new Set(allArtists.map((a) => a.location))];
  const availabilities = [...new Set(allArtists.flatMap((a) => a.availability))];

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <Heading
        prefix="Explore"
        focus="Performing Artists"
        suffix="Across Categories"
        subheading={true}
      />

      <div className="md:hidden flex justify-end mb-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded font-semibold"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? "Close Filters" : "Filter"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
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
            md:static md:w-1/4 md:h-auto md:p-0 filter-panel
            transform ${
              isMobileFilterOpen ? "translate-x-10 translate-y-20" : "-translate-x-full md:translate-x-0"
            }`}
        >
          <FilterPanel
            categories={categories}
            locations={locations}
            availabilities={availabilities}
            selectedCategory={selectedCategory}
            setSelectedCategory={(val) => {
              console.log("🎯 Selected Category:", val);
              setSelectedCategory(val);
            }}
            selectedLocation={selectedLocation}
            setSelectedLocation={(val) => {
              console.log("📍 Selected Location:", val);
              setSelectedLocation(val);
            }}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={(val) => {
              console.log("🕒 Selected Availability:", val);
              setSelectedAvailability(val);
            }}
            minReviews={minReviews}
            setMinReviews={setMinReviews}
            minRating={minRating}
            setMinRating={(val) => {
              console.log("⭐ Min Rating Selected:", val);
              setMinRating(val);
            }}
            maxFee={maxFee}
            setMaxFee={(val) => {
              console.log("💰 Max Fee Selected:", val);
              setMaxFee(val);
            }}
            isMobile={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        </aside>

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
              <p className="col-span-full text-center text-purple-500">No matching artists found.</p>
            )}
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreArtists;
