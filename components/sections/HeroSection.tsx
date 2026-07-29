"use client";

import { motion } from "framer-motion";
import { Gamepad2, Wand2, Radar } from "lucide-react";
import { AISearchBar } from "@/components/search/AISearchBar";

const STATS = [
  { label: "Games Indexed", value: "500K+", icon: Gamepad2 },
  { label: "AI Match Accuracy", value: "94%", icon: Radar },
  { label: "Prototypes Generated", value: "10K+", icon: Wand2 },
];

interface HeroSectionProps {
  onSearch?: (prompt: string) => void;
  isLoading?: boolean;
}

export function HeroSection({ onSearch, isLoading }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-32 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-2 rounded-full border border-nova-500/30 bg-white/[0.03] px-4 py-1.5 text-xs text-muted-foreground shadow-sm"
      >
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-circuit-400" />
        Powered by Gemini &amp; RAWG
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-4xl text-center font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
      >
        Describe a game.
        <br />
        <span className="text-gradient-nova">We&apos;ll find it — or build it.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-center text-base text-muted-foreground sm:text-lg"
      >
        No filters, no genre menus. Just tell PlayVerse what you&apos;re in
        the mood for, in plain language, and let the AI take it from there.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex justify-center w-full"
      >
        <AISearchBar onSearch={onSearch} isLoading={isLoading} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel flex items-center gap-3 px-5 py-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
              <stat.icon className="h-5 w-5 text-circuit-400" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
