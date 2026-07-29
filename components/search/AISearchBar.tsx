"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_PROMPTS = [
  "A multiplayer futuristic shooting game",
  "A relaxing farming game with pixel art",
  "Something like a horror survival roguelike",
  "Cyberpunk open world RPG with rich story",
];

interface AISearchBarProps {
  onSearch?: (prompt: string) => void;
  isLoading?: boolean;
}

export function AISearchBar({ onSearch, isLoading = false }: AISearchBarProps) {
  const [prompt, setPrompt] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSearch?.(prompt.trim());
  }

  function handleExampleClick(examplePrompt: string) {
    setPrompt(examplePrompt);
    onSearch?.(examplePrompt);
  }

  return (
    <div id="hero-search" className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="glow-border rounded-2xl p-[1.5px]">
        <div className="glow-border-inner flex items-center gap-3 rounded-[calc(1rem-1.5px)] px-5 py-4">
          <Sparkles className="h-5 w-5 shrink-0 text-nova-400 animate-pulse" />
          <input
            id="search-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the game you're in the mood for…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
            aria-label="Describe the game you want to find or generate"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-nova-500 to-circuit-500 text-white shadow-lg transition-all hover:scale-105 active:scale-95",
              (!prompt.trim() || isLoading) && "opacity-40 hover:scale-100"
            )}
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <ArrowRight className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {EXAMPLE_PROMPTS.map((example) => (
          <motion.button
            key={example}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExampleClick(example)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-nova-500/40 hover:bg-nova-500/10 hover:text-foreground"
          >
            ✨ {example}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
