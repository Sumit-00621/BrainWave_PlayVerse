import { Game } from "@/types/game";

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

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

export async function fetchRawgGameDetails(query: string): Promise<Partial<Game> | null> {
  if (!isRealApiKey(RAWG_API_KEY)) {
    return null;
  }

  try {
    const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=1`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const gameResult = data.results?.[0];
    if (!gameResult) return null;

    return {
      name: gameResult.name,
      imageUrl: gameResult.background_image || undefined,
      rating: gameResult.rating ? Math.round(gameResult.rating * 10) / 10 : undefined,
      releaseDate: gameResult.released || undefined,
      platforms: gameResult.platforms
        ? gameResult.platforms.map((p: any) => p.platform?.name).filter(Boolean).slice(0, 3)
        : [],
      genres: gameResult.genres
        ? gameResult.genres.map((g: any) => g.name).slice(0, 3)
        : [],
    };
  } catch (error) {
    console.error("RAWG API Error:", error);
    return null;
  }
}

export async function enrichGamesWithRAWG(games: Game[]): Promise<Game[]> {
  if (!isRealApiKey(RAWG_API_KEY)) return games;

  const enriched = await Promise.all(
    games.map(async (game) => {
      const rawgData = await fetchRawgGameDetails(game.name);
      if (rawgData) {
        return {
          ...game,
          name: rawgData.name || game.name,
          imageUrl: rawgData.imageUrl || game.imageUrl,
          rating: rawgData.rating || game.rating,
          platforms: rawgData.platforms?.length ? rawgData.platforms : game.platforms,
          genres: rawgData.genres?.length ? rawgData.genres : game.genres,
        };
      }
      return game;
    })
  );

  return enriched;
}
