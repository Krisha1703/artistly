export function extractFilters({ message, parsed, artists }) {
  console.log("🧠 FILTER: Starting extraction");

  const lower = message.toLowerCase();
  const filters = {};

  // ==========================
  // 🎯 1. AI FILTERS (PRIORITY)
  // ==========================
  if (parsed?.filters) {
    Object.assign(filters, parsed.filters);
    console.log("🧠 FILTER: AI filters applied:", filters);
  }

  // ==========================
  // 🔎 2. ARTIST NAME (SEARCH)
  // ==========================
  if (!filters.search) {
    const match = artists.find((a) =>
      lower.includes(a.name.toLowerCase())
    );

    if (match) {
      filters.search = match.name;
      console.log("🧠 FILTER: Matched artist:", match.name);
    }
  }

  // ==========================
  // 🎭 3. CATEGORY
  // ==========================
  if (!filters.category) {
    const categoryMap = {
      dj: "DJ",
      djs: "DJ",

      singer: "Singer",
      singers: "Singer",

      dancer: "Dancer",
      dancers: "Dancer",
      dance: "Dancer",

      speaker: "Speaker",
      speakers: "Speaker",

      magician: "Magician",
      magicians: "Magician",
      magic: "Magician",

      comedian: "Comedian",
      comedians: "Comedian",
      comedy: "Comedian",

      acrobat: "Acrobat",
      acrobats: "Acrobat",

      instrumentalist: "Instrumentalist",
      instrumentalists: "Instrumentalist",
      musician: "Instrumentalist",
      musicians: "Instrumentalist",
    };

    for (const key in categoryMap) {
      if (lower.includes(key)) {
        filters.category = categoryMap[key];
        console.log("🧠 FILTER: Category detected:", filters.category);
        break;
      }
    }
  }

  // ==========================
  // 📍 4. LOCATION
  // ==========================
  if (!filters.location) {
    const match = artists.find((a) =>
      lower.includes(a.location?.toLowerCase())
    );

    if (match) {
      filters.location = match.location;
      console.log("🧠 FILTER: Location detected:", match.location);
    }
  }

  // ==========================
  // 💰 5. BUDGET (SMART)
  // ==========================
  const numbers = lower.match(/\d+/g);

  if (numbers?.length === 1) {
    if (/under|below|less than|max/i.test(lower)) {
      filters.budgetMax = numbers[0];
    } else if (/above|more than|min/i.test(lower)) {
      filters.budgetMin = numbers[0];
    } else {
      filters.budgetMax = numbers[0];
    }
  }

  if (numbers?.length >= 2) {
    filters.budgetMin = numbers[0];
    filters.budgetMax = numbers[1];
  }

  if (filters.budgetMin || filters.budgetMax) {
    console.log("🧠 FILTER: Budget:", filters.budgetMin, filters.budgetMax);
  }

  // ==========================
  // ⭐ 6. RATING
  // ==========================
  const ratingMatch = lower.match(/(\d+(\.\d+)?)\s*(star|rating)/);

  if (ratingMatch && !filters.rating) {
    filters.rating = ratingMatch[1];
    console.log("🧠 FILTER: Rating:", filters.rating);
  }

  // ==========================
  // 🌐 7. LANGUAGE
  // ==========================
  if (!filters.languages) {
    const languageMap = {
      english: "English",
      hindi: "Hindi",
      tamil: "Tamil",
      malayalam: "Malayalam",
      thai: "Thai",
      spanish: "Spanish",
      french: "French",
      german: "German",
      japanese: "Japanese",
      gujarati: "Gujarati",
      punjabi: "Punjabi",
      bengali: "Bengali",
      telugu: "Telugu",
      kannada: "Kannada",
      marathi: "Marathi",
    };

    for (const key in languageMap) {
      if (lower.includes(key)) {
        filters.languages = languageMap[key];
        console.log("🧠 FILTER: Language:", filters.languages);
        break;
      }
    }
  }

  // ==========================
  // 🕒 8. AVAILABILITY (VERY IMPORTANT)
  // ==========================
  if (!filters.availability) {
    const availabilityMap = {
      weekday: "Weekdays",
      weekdays: "Weekdays",

      weekend: "Weekends",
      weekends: "Weekends",

      morning: "Mornings",
      mornings: "Mornings",

      afternoon: "Afternoons",
      afternoons: "Afternoons",

      evening: "Evenings",
      evenings: "Evenings",

      night: "Nights",
      nights: "Nights",
    };

    for (const key in availabilityMap) {
      if (lower.includes(key)) {
        filters.availability = availabilityMap[key];
        console.log("🧠 FILTER: Availability:", filters.availability);
        break;
      }
    }
  }

  // ==========================
  // 🧹 9. CLEANUP RULES (CRITICAL)
  // ==========================

  // ❌ Remove search if it's actually category
  if (filters.search && filters.category) {
    if (
      filters.search.toLowerCase() ===
      filters.category.toLowerCase()
    ) {
      delete filters.search;
      console.log("🧹 FILTER: Removed invalid search");
    }
  }

  // ==========================
  // 🧠 FINAL LOG
  // ==========================
  console.log("🧠 FILTER: Final filters:", filters);

  return filters;
}