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

function isRealApiKey(key?: string): boolean {
  if (!key || !key.trim()) return false;
  const lower = key.trim().toLowerCase();
  return (
    !lower.includes("your_") &&
    !lower.includes("placeholder") &&
    !lower.includes("xxx") &&
    key.trim().length > 10
  );
}

export async function generateAISearch(userPrompt: string): Promise<AISearchResponse> {
  const apiKey = GEMINI_API_KEY;

  if (isRealApiKey(apiKey)) {
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
      "gemini-1.5-flash",
      "gemini-2.0-flash-exp",
      "gemini-1.5-pro",
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
          console.warn(`Model ${modelName} returned status ${res.status}:`, lastErrorText);
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} exception:`, err);
        lastErrorText = String(err);
      }
    }

    console.warn("Gemini API call returned errors/401. Using PlayVerse AI smart fallback engine.");
  } else {
    console.warn("Gemini API key not set or is placeholder. Using PlayVerse AI smart fallback engine.");
  }

  // Gracefully return PlayVerse AI dynamic response if key is missing or API returns 401/error
  return generateDynamicFallback(userPrompt);
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

function generateDynamicFallback(prompt: string): AISearchResponse {
  const lower = prompt.toLowerCase();
  
  let genre = "Action RPG";
  let conceptTitle = "CyberSynth: Horizon";
  let tagline = "Neon-drenched adaptive survival in an evolving metropolis";
  let engine = "Unreal Engine 5";
  let features = [
    "Procedural AI Narrative Engine",
    "Dynamic Ray-Traced Cyberpunk World",
    "Real-time Neural Combat Physics",
    "Seamless Co-op & Solo Play"
  ];
  let recommended: Game[] = [];

  if (lower.includes("farm") || lower.includes("relax") || lower.includes("pixel") || lower.includes("cozy")) {
    genre = "Cozy Farming Simulation";
    conceptTitle = "Starlight Valley";
    tagline = "Cultivate alien flora and build a peaceful sanctuary among the stars";
    engine = "Unity 6";
    features = [
      "Procedural Crop Genetics & Hybrid Breeding",
      "Dynamic Weather & Seasonal Solar Cycles",
      "Cozy Village Commerce & NPC Relationships",
      "Lo-Fi Adaptive Soundtrack System"
    ];
    recommended = [
      {
        id: "fb-1",
        name: "Stardew Valley",
        rating: 4.9,
        platforms: ["PC", "Switch", "PlayStation", "Xbox"],
        genres: ["Simulation", "RPG", "Indie"],
        description: "The ultimate relaxing farm life simulation with rich crafting and community building.",
        matchPercentage: 98,
        matchReasons: ["Charming Pixel Art Style", "Ultra-relaxing Farm Mechanics", "High Replayability"],
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
      },
      {
        id: "fb-2",
        name: "Animal Crossing: New Horizons",
        rating: 4.8,
        platforms: ["Switch"],
        genres: ["Simulation", "Casual"],
        description: "Escape to a deserted island paradise and create your own customizable haven.",
        matchPercentage: 94,
        matchReasons: ["Relaxing Real-time Atmosphere", "Deep Customization", "Wholesome Gameplay"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
      },
      {
        id: "fb-3",
        name: "Dave the Diver",
        rating: 4.9,
        platforms: ["PC", "Switch", "PlayStation"],
        genres: ["Adventure", "Casual", "Indie"],
        description: "Deep-sea exploration by day, running a cozy sushi restaurant by night.",
        matchPercentage: 91,
        matchReasons: ["Gorgeous Pixel Graphics", "Addictive Gameplay Loop", "Relaxing Exploration"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
      }
    ];
  } else if (lower.includes("horror") || lower.includes("roguelike") || lower.includes("survival")) {
    genre = "Horror Roguelike Survival";
    conceptTitle = "Void Echoes: Abyss";
    tagline = "Traverse procedurally shifting nightmare dimensions where light is your only weapon";
    engine = "Unreal Engine 5";
    features = [
      "Procedurally Shifted Haunted Corridors",
      "Biometric Fear & Sanity System",
      "Permadeath with Artifact Progression",
      "Dynamic Spatial Audio Horror Mechanics"
    ];
    recommended = [
      {
        id: "fb-4",
        name: "Dead by Daylight",
        rating: 4.4,
        platforms: ["PC", "PlayStation", "Xbox"],
        genres: ["Horror", "Survival", "Multiplayer"],
        description: "Asymmetrical 4v1 multiplayer horror game where one player takes on the role of the killer.",
        matchPercentage: 96,
        matchReasons: ["Intense Survival Horror", "Multiplayer Co-op Strategy", "High Stakes Gameplay"],
        imageUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80"
      },
      {
        id: "fb-5",
        name: "Phasmophobia",
        rating: 4.7,
        platforms: ["PC", "VR", "PlayStation 5", "Xbox Series X"],
        genres: ["Horror", "Co-op", "Indie"],
        description: "4-player online co-op psychological horror where you investigate paranormal activity.",
        matchPercentage: 93,
        matchReasons: ["Voice Recognition Ghosts", "Chilling Atmospheric Tension", "Co-op Investigation"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
      },
      {
        id: "fb-6",
        name: "Hades",
        rating: 4.9,
        platforms: ["PC", "PlayStation", "Xbox", "Switch"],
        genres: ["Action", "Roguelike", "Indie"],
        description: "Defy the god of the dead in this fast-paced rogue-like dungeon crawler.",
        matchPercentage: 90,
        matchReasons: ["Peak Roguelike Mechanics", "Addictive Progression", "Stunning Art & Combat"],
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80"
      }
    ];
  } else if (lower.includes("shooting") || lower.includes("futuristic") || lower.includes("multiplayer") || lower.includes("fps")) {
    genre = "Futuristic Tactical FPS";
    conceptTitle = "Apex Vanguard 2099";
    tagline = "High-speed orbital drop squad combat with zero-gravity firefights";
    engine = "Unreal Engine 5";
    features = [
      "Zero-G Vertical Gunplay Engine",
      "Modular Exosuit Weapon Customization",
      "Dynamic Destructible Battlegrounds",
      "Competitive 64-Player Tactical Warfare"
    ];
    recommended = [
      {
        id: "fb-7",
        name: "Cyberpunk 2077",
        rating: 4.6,
        platforms: ["PC", "PlayStation 5", "Xbox Series X"],
        genres: ["Action", "RPG", "Sci-Fi"],
        description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power.",
        matchPercentage: 97,
        matchReasons: ["Futuristic World Design", "Rich Storytelling", "High Octane Gunplay"],
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
      },
      {
        id: "fb-8",
        name: "The Finals",
        rating: 4.5,
        platforms: ["PC", "PlayStation 5", "Xbox Series X"],
        genres: ["Shooter", "Multiplayer", "Action"],
        description: "Free-to-play combat game show with complete arena destruction and vertical movement.",
        matchPercentage: 95,
        matchReasons: ["Fast-Paced Multiplayer", "Fully Destructible Environments", "Futuristic Combat"],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
      },
      {
        id: "fb-9",
        name: "Helldivers 2",
        rating: 4.8,
        platforms: ["PC", "PlayStation 5"],
        genres: ["Shooter", "Co-op", "Sci-Fi"],
        description: "Join forces with up to three friends and wreak havoc on an alien threat threatening Super Earth.",
        matchPercentage: 92,
        matchReasons: ["Kinetic Co-op Shooting", "Futuristic Sci-Fi Warfare", "High Energy Action"],
        imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
      }
    ];
  } else {
    recommended = [
      {
        id: "fb-10",
        name: "Cyberpunk 2077",
        rating: 4.6,
        platforms: ["PC", "PlayStation 5", "Xbox Series X"],
        genres: ["Action", "RPG", "Sci-Fi"],
        description: "An open-world action RPG set in Night City with deep customization and story.",
        matchPercentage: 96,
        matchReasons: ["Immersive World", "Great Visuals", "Action-Packed Mechanics"],
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
      },
      {
        id: "fb-11",
        name: "Elden Ring",
        rating: 4.9,
        platforms: ["PC", "PlayStation", "Xbox"],
        genres: ["Action", "RPG", "Fantasy"],
        description: "A vast fantasy action RPG created by Hidetaka Miyazaki and George R. R. Martin.",
        matchPercentage: 93,
        matchReasons: ["Unmatched Exploration", "Deep Combat System", "Masterpiece Level Design"],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
      },
      {
        id: "fb-12",
        name: "The Witcher 3: Wild Hunt",
        rating: 4.9,
        platforms: ["PC", "PlayStation", "Xbox", "Switch"],
        genres: ["RPG", "Story-Rich", "Fantasy"],
        description: "A story-driven open world RPG set in a visually stunning fantasy universe.",
        matchPercentage: 91,
        matchReasons: ["Exceptional Narrative", "Rich Character Choices", "Vast Open World"],
        imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
      }
    ];
  }

  return {
    understanding: `Analyzed "${prompt}" using PlayVerse AI. Recommended matching titles and generated a custom concept concept.`,
    recommendedGames: recommended,
    aiConcept: {
      title: conceptTitle,
      tagline: tagline,
      genre: genre,
      gameplaySummary: `A revolutionary ${genre.toLowerCase()} experience designed around "${prompt}". Features dynamic procedural environments, adaptive AI difficulty, and seamless player agency.`,
      keyFeatures: features,
      suggestedEngine: engine,
      targetAudience: "Gamers seeking high-immersion & innovative gameplay mechanics"
    }
  };
}
