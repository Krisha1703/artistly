// Filter Panel Component For Exploring Artists

import SelectField from "../onboard-artists/select-field";

const FilterPanel = ({
  categories,
  locations,
  availabilities,
  selectedLocation,
  setSelectedLocation,
  selectedAvailability,
  setSelectedAvailability,
  minRating,
  setMinRating,
  minReviews,
  setMinReviews,
  maxFee,
  setMaxFee,
  isMobile,
  selectedCategory,
  setSelectedCategory,
  onClose,
}) => {
  return (
    <div
      className={`
        space-y-5 text-md
        rounded-xl p-6 shadow-lg
       
        text-purple-700
        max-h-full
        overflow-auto
        ${isMobile ? "h-full" : "h-auto"}
        relative
      `}
    >
      {/* Close button on mobile */}
      {isMobile && (
        <button
          className="absolute top-4 right-4 text-purple-500 text-2xl font-bold hover:text-purple-700"
          onClick={onClose}
          aria-label="Close filter panel"
        >
          &times;
        </button>
      )}

      <SelectField
        name="category"
        label="Category"
        options={categories}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        placeholder="All Categories"
      />

       <SelectField
        name="location"
        label="Location"
        options={locations}
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        placeholder="All Locations"
      />

      <SelectField
        name="availability"
        label="Availability"
        options={availabilities}
        value={selectedAvailability}
        onChange={(e) => setSelectedAvailability(e.target.value)}
        placeholder="All Availabilities"
      />

      <SelectField
        name="maxFee"
        label="Max Fee ($)"
        value={maxFee ? `$${maxFee}` : ""}
        onChange={(e) => setMaxFee(e.target.value.replace(/[^\d]/g, ""))}
        options={["$50", "$100", "$200", "$300", "$500", "$1000", "$1500"]}
        placeholder="Any"
      />


      <SelectField
        name="minRating"
        label="Min Rating"
        options={[4.5, 4, 3.5].map((r) => `${r}`)} 
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        placeholder="Any"
      />

      <SelectField
        name="minReviews"
        label="Min Reviews"
        value={minReviews}
        onChange={(e) => setMinReviews(e.target.value)} 
        options={[ "10","25", "50", "75", "100"]}
        placeholder="Any"
      />

    </div>
  );
};

export default FilterPanel;
