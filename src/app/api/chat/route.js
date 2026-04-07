import getSessionHistory from "../../../../utils/chat/get-session-history";
import parseAIResponse from "../../../../utils/chat/parse-ai-response";
import { extractFilters } from "../../../../utils/chat/extract-filters";
import { buildRedirectUrl } from "../../../../utils/chat/build-redirect-url";

import { runAI } from "../../../../actions/chat/run-ai";
import { getAllArtists } from "../../../../actions/fetch-artist";
import { buildContext } from "../../../../utils/chat/build-context";

// ==========================
// 👋 GET
// ==========================
export async function GET() {
  try {
    console.log("✅ GET /api/chat hit");

    return Response.json({
      message:
        "👋 Hi! I’m your AI Artist Assistant. I can help you find performers based on your event, budget, location, or even a specific artist.",
    });
  } catch (err) {
    console.error("🔥 GET ERROR:", err);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ==========================
// 🚀 POST
// ==========================
export async function POST(req) {
  try {
    console.log("🟢 STEP 1: Request received");

    const body = await req.json();
    console.log("🟢 STEP 2: Body parsed:", body);

    const message = body?.message;
    if (!message) {
      throw new Error("Message is missing");
    }

    console.log("🟢 STEP 3: Message:", message);

    const sessionId = "artist-session";

    // ✅ FIXED SESSION
    if (!global.sessions) {
      global.sessions = new Map();
    }
    const sessions = global.sessions;

    console.log("🟢 STEP 4: Sessions ready");

    const history = getSessionHistory(sessionId, sessions);

    console.log("🟢 STEP 5: History loaded");

    // ==========================
    // 🗄️ FETCH ARTISTS
    // ==========================
    
    const data = await getAllArtists();
    const artists = data.artists;

    console.log("🟢 STEP 6: Artists fetched:", artists?.length);

    if (!artists || artists.length === 0) {
      throw new Error("No artists found");
    }

    const context = buildContext(artists);

    console.log("🟢 STEP 7: Context built");

    // ==========================
    // 🤖 RUN AI
    // ==========================
    const rawText = await runAI({
      message,
      context,
      history,
      sessionId,
    });

    console.log("🟢 STEP 8: AI response:", rawText);

    if (!rawText) {
      throw new Error("AI returned empty response");
    }

    // ==========================
    // 🧠 PARSE AI
    // ==========================
    const result = parseAIResponse(rawText, message, artists);

    console.log("🟢 STEP 9: Parsed result:", result);

    if (!result) {
      throw new Error("parseAIResponse returned undefined");
    }

    const { parsed, text, matchedArtist } = result;

    // ==========================
    // 🎯 DIRECT ARTIST MATCH
    // ==========================
    if (matchedArtist) {
      console.log("🟢 STEP 10: Artist matched:", matchedArtist.name);

      const url = buildRedirectUrl({ search: matchedArtist.name });

      return Response.json({
        message: `Showing results for ${matchedArtist.name}`,
        redirect: url,
        results: []
      });
    }

    // ==========================
    // 🎯 RECOMMENDATION
    // ==========================
    if (parsed?.type === "recommendation") {
      console.log("🟢 STEP 11: Recommendation flow");

      return Response.json({
        message: "Here are some great options:",
        results: parsed.recommendations || [],
      });
    }

    // ==========================
    // 🎯 REDIRECT
    // ==========================
    const shouldRedirect =
      parsed?.type === "redirect" ||
      /find|show|looking|search|i want/i.test(message);

    console.log("🟢 STEP 12: shouldRedirect =", shouldRedirect);

    if (shouldRedirect) {
      const filters = extractFilters({
        message,
        parsed,
        artists,
      });

      console.log("🟢 STEP 13: Filters:", filters);

      const url = buildRedirectUrl(filters);

      console.log("🟢 STEP 14: URL:", url);

      return Response.json({
        message: "Showing relevant artists...",
        redirect: url,
        results: [],
      });
    }

    // ==========================
    // 💬 NORMAL CHAT
    // ==========================
    console.log("🟢 STEP 15: Normal chat");

    return Response.json({
      message: text || "No response",
      results: [],
    });

  } catch (err) {
    console.error("🔥 POST ERROR:", err);

    return Response.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}