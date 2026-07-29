"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { GameCard } from "@/components/cards/GameCard";
import { trendingGames } from "@/lib/mock-data";

export function TrendingGames() {
  return (
    <section id="trending" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nova-500/10">
          <TrendingUp className="h-5 w-5 text-nova-400" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Trending Right Now
          </h2>
          <p className="text-sm text-muted-foreground">
            What the PlayVerse community is discovering today
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trendingGames.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
