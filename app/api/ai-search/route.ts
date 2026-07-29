import { NextResponse } from "next/server";
import { generateAISearch } from "@/services/gemini";
import { enrichGamesWithRAWG } from "@/services/rawg";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    // 1. Generate search recommendations & original concept with Gemini AI
    const aiResult = await generateAISearch(prompt.trim());

    // 2. Enrich recommended games with real data/images from RAWG API
    const enrichedGames = await enrichGamesWithRAWG(aiResult.recommendedGames);

    return NextResponse.json({
      success: true,
      understanding: aiResult.understanding,
      recommendedGames: enrichedGames,
      aiConcept: aiResult.aiConcept,
    });
  } catch (error: any) {
    console.error("AI Search Endpoint Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to process AI search request.",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
