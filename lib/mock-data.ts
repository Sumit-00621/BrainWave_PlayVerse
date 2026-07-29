import { Game, Genre, FaqItem } from "@/types/game";

// Placeholder trending games. Replaced by a live RAWG fetch in the
// "Recommendation Engine" feature step — kept here for now so the
// homepage layout has real content to lay out against.
export const trendingGames: Game[] = [
  {
    id: 1,
    name: "Nova Drift: Reforged",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    rating: 4.6,
    platforms: ["PC", "PS5", "Xbox Series X"],
    genres: ["Shooter", "Sci-Fi"],
    matchPercentage: 92,
    matchReasons: ["Futuristic", "Multiplayer", "Fast-Paced"],
  },
  {
    id: 2,
    name: "Emberfall Tactics",
    imageUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    rating: 4.3,
    platforms: ["PC", "Switch"],
    genres: ["Strategy", "RPG"],
    matchPercentage: 87,
    matchReasons: ["Story Rich", "Turn-Based"],
  },
  {
    id: 3,
    name: "Harvest Moon Valley",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    rating: 4.8,
    platforms: ["PC", "Switch", "Mobile"],
    genres: ["Simulation", "Pixel Art"],
    matchPercentage: 95,
    matchReasons: ["Relaxing", "Pixel Art", "Farming"],
  },
  {
    id: 4,
    name: "Voidrunner Protocol",
    imageUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    rating: 4.4,
    platforms: ["PC", "PS5"],
    genres: ["Action", "Sci-Fi"],
    matchPercentage: 89,
    matchReasons: ["Story Rich", "Futuristic", "Single-player"],
  },
];

export const popularGenres: Genre[] = [
  { id: "shooter", name: "Shooter", gameCount: 1240, icon: "Crosshair" },
  { id: "rpg", name: "RPG", gameCount: 2310, icon: "Swords" },
  { id: "strategy", name: "Strategy", gameCount: 980, icon: "BrainCircuit" },
  { id: "simulation", name: "Simulation", gameCount: 760, icon: "Tractor" },
  { id: "platformer", name: "Platformer", gameCount: 640, icon: "Blocks" },
  { id: "horror", name: "Horror", gameCount: 410, icon: "Ghost" },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does the AI actually pick games for me?",
    answer:
      "You describe what you're in the mood for in plain language. Gemini turns that into a structured profile — genre, theme, difficulty, multiplayer, platform — and we match it against live data from RAWG's catalog of 500,000+ games.",
  },
  {
    id: "faq-2",
    question: "Can I really generate a playable game?",
    answer:
      "Yes. Describe the game you want, and Gemini generates a structured configuration — not raw code — which our Phaser engine turns into an actual playable prototype in your browser.",
  },
  {
    id: "faq-3",
    question: "Do I need an account?",
    answer:
      "No. Favorites and search history are saved locally in your browser. An optional account (via Firebase) lets you sync them across devices.",
  },
  {
    id: "faq-4",
    question: "Is PlayVerse free?",
    answer:
      "Yes — PlayVerse is a discovery and prototyping tool, not a storefront. We link out to official platforms when you want to play the real thing.",
  },
];
