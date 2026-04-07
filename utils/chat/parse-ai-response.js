export default function parseAIResponse(text, message, artists) {
  console.log("🧠 PARSER: Raw input:", text);

  if (!text) {
    return {
      parsed: null,
      text: "",
      matchedArtist: null,
      intent: "unknown",
    };
  }

  // ==========================
  // 🧹 CLEAN MARKDOWN
  // ==========================
  let cleanText = text.trim();

  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/```json|```/g, "").trim();
  }

  console.log("🧠 PARSER: Clean text:", cleanText);

  // ==========================
  // 🧠 SAFE JSON EXTRACTION
  // ==========================
  let parsed = null;

  try {
    parsed = JSON.parse(cleanText);
    console.log("✅ PARSER: Full JSON parsed");
  } catch {
    console.log("⚠️ PARSER: Full parse failed, trying extraction");

    const match = cleanText.match(/\{[\s\S]*\}/);

    if (match) {
      try {
        parsed = JSON.parse(match[0]);
        console.log("✅ PARSER: Extracted JSON parsed");
      } catch {
        console.log("❌ PARSER: Extraction parse failed");
      }
    }
  }

  // ==========================
  // 🧠 INTENT DETECTION (VERY IMPORTANT)
  // ==========================
  const lower = message.toLowerCase();

  let intent = "chat";

  if (/book|hire|get quote|contact/i.test(lower)) {
    intent = "booking";
  } else if (/recommend|suggest|best/i.test(lower)) {
    intent = "recommendation";
  } else if (/find|search|show|looking/i.test(lower)) {
    intent = "search";
  }

  console.log("🧠 PARSER: Detected intent:", intent);

  // ==========================
  // 🎯 IMPROVED ARTIST MATCHING
  // ==========================
  let matchedArtist = null;

  for (const artist of artists) {
    const name = artist.name.toLowerCase();

    if (
      lower.includes(name) ||
      name.includes(lower) ||
      lower.includes(name.split(" ")[0]) // partial match
    ) {
      matchedArtist = artist;
      break;
    }
  }

  if (matchedArtist) {
    console.log("🎯 PARSER: Matched artist:", matchedArtist.name);
  }

  return {
    parsed,
    text: cleanText,
    matchedArtist,
    intent,
  };
}