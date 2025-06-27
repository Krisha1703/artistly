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
        nav-menu-item
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
        options={["$100", "$200", "$500", "$1000", "$2000", "$5000", "$5000+"]}
        placeholder="Any"
      />


      <SelectField
        name="minRating"
        label="Min Rating"
        options={[4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((r) => `${r}`)} 
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        placeholder="Any"
      />

    </div>
  );
};

export default FilterPanel;
