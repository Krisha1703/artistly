export function buildRedirectUrl(filters) {
  const params = new URLSearchParams();

  console.log("🧭 BUILD URL: Incoming filters:", filters);

  // ==========================
  // 🎯 SEARCH (ONLY NAME)
  // ==========================
  if (filters.search && filters.search.length > 2) {
    params.set("search", filters.search);
  }

  // ==========================
  // 🎭 CATEGORY
  // ==========================
  if (filters.category) {
    params.set("category", filters.category);
  }

  // ==========================
  // 📍 LOCATION
  // ==========================
  if (filters.location) {
    params.set("location", filters.location);
  }

  // ==========================
  // 💰 BUDGET
  // ==========================
  if (filters.budgetMin) {
    params.set("budgetMin", filters.budgetMin);
  }

  if (filters.budgetMax) {
    params.set("budgetMax", filters.budgetMax);
  }

  // ==========================
  // ⭐ RATING
  // ==========================
  if (filters.rating) {
    params.set("rating", filters.rating);
  }

  // ==========================
  // 🕒 AVAILABILITY (NEW)
  // ==========================
  if (filters.availability) {
    params.set("availability", filters.availability);
  }

  const url = params.toString()
    ? `/artists?${params.toString()}`
    : `/artists`;

  console.log("🧭 BUILD URL: Final URL:", url);

  return url;
}