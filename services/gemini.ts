import { Game } from "@/types/game";

export interface AIConcept {
  title: string;
  tagline: string;
  genre: string;
  gameplaySummary: string;
  keyFeatures: string[];
  suggestedEngine: string;
  targetAudience: string;
}

export interface AISearchResponse {
  understanding: string;
  recommendedGames: Game[];
  aiConcept: AIConcept;
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateAISearch(userPrompt: string): Promise<AISearchResponse> {
  const apiKey = GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new Error("Gemini API Key (NEXT_PUBLIC_GEMINI_API_KEY) is missing or invalid.");
  }

  const systemInstruction = `You are the core AI engine of PlayVerse AI.
Analyze the user's prompt and generate a JSON response with recommendations for real games and a unique new AI game concept.

Rules:
1. Output ONLY a raw valid JSON object without any additional markdown text.
2. Ensure string values use double quotes and contain valid escape sequences.

JSON Schema:
{
  "understanding": "A short, engaging 1-2 sentence breakdown of what the user wants to play.",
  "recommendedGames": [
    {
      "id": "1",
      "name": "Game Title",
      "rating": 4.5,
      "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
      "genres": ["Genre1", "Genre2"],
      "description": "Short explanation of why it matches.",
      "matchPercentage": 95,
      "matchReasons": ["Reason 1", "Reason 2", "Reason 3"],
      "imageUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
    }
  ],
  "aiConcept": {
    "title": "Unique Game Name",
    "tagline": "Catchy short tagline",
    "genre": "Genre Blend",
    "gameplaySummary": "Overview of mechanics and theme.",
    "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    "suggestedEngine": "Unreal Engine 5",
    "targetAudience": "Target gamer demographic"
  }
}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${systemInstruction}\n\nUser Prompt: "${userPrompt}"`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2048,
      responseMimeType: "application/json"
    }
  };

  const modelsToTry = [
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-flash-latest"
  ];

  let lastErrorText = "";

  for (const modelName of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          return parseGeminiJsonResponse(rawText);
        }
      } else {
        lastErrorText = await res.text();
        console.warn(`Model ${modelName} failed (${res.status}):`, lastErrorText);
      }
    } catch (err: any) {
      console.warn(`Model ${modelName} exception:`, err);
      lastErrorText = String(err);
    }
  }

  throw new Error(`Gemini API requests failed. Details: ${lastErrorText}`);
}

function parseGeminiJsonResponse(rawText: string): AISearchResponse {
  let cleanText = rawText.trim();

  // Strip markdown fence blocks if present
  if (cleanText.startsWith("```json")) {
    cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Extract JSON object from first { to last }
  const firstBrace = cleanText.indexOf("{");
  const lastBrace = cleanText.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleanText = cleanText.substring(firstBrace, lastBrace + 1);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(cleanText);
  } catch (err) {
    const sanitized = cleanText
      .replace(/\r\n/g, "\\n")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
    parsed = JSON.parse(sanitized);
  }

  return {
    understanding: parsed.understanding || "Matching games analyzed by PlayVerse AI.",
    recommendedGames: Array.isArray(parsed.recommendedGames)
      ? parsed.recommendedGames.map((g: any, i: number) => ({
          id: g.id || `ai-${i}`,
          name: g.name || "Unknown Game",
          rating: typeof g.rating === "number" ? g.rating : 4.5,
          platforms: Array.isArray(g.platforms) ? g.platforms : ["PC"],
          genres: Array.isArray(g.genres) ? g.genres : ["Action"],
          description: g.description || "",
          matchPercentage: typeof g.matchPercentage === "number" ? g.matchPercentage : 90,
          matchReasons: Array.isArray(g.matchReasons) ? g.matchReasons : ["AI Choice"],
          imageUrl: g.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        }))
      : [],
    aiConcept: parsed.aiConcept || {
      title: "Project Nova",
      tagline: "Procedural world generated by AI",
      genre: "Action-Adventure",
      gameplaySummary: "A procedural experience tailored to your gaming style.",
      keyFeatures: ["Procedural World", "Adaptive AI", "Dynamic Weather", "Emergent Narrative"],
      suggestedEngine: "Unreal Engine 5",
      targetAudience: "Action RPG Enthusiasts",
    },
  };
}
