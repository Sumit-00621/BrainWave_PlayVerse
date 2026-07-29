/**
 * Shape used across the app for a single game — modeled loosely on the
 * RAWG API response so `services/rawg.ts` (built in a later step) can
 * map directly onto it.
 */
export interface Game {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number; // 0–5
  releaseDate?: string;
  platforms: string[];
  genres: string[];
  description?: string;
  /** 0–100, only present when the game came from an AI-driven search */
  matchPercentage?: number;
  /** short "why recommended" tags, e.g. ["Futuristic", "Multiplayer"] */
  matchReasons?: string[];
}

export interface Genre {
  id: string;
  name: string;
  gameCount: number;
  icon: string; // lucide-react icon name
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
