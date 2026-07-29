"use client";

import { motion } from "framer-motion";
import {
  Crosshair,
  Swords,
  BrainCircuit,
  Tractor,
  Blocks,
  Ghost,
  LucideIcon,
} from "lucide-react";
import { popularGenres } from "@/lib/mock-data";

const ICONS: Record<string, LucideIcon> = {
  Crosshair,
  Swords,
  BrainCircuit,
  Tractor,
  Blocks,
  Ghost,
};

export function PopularGenres() {
  return (
    <section id="genres" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Browse by Genre
        </h2>
        <p className="text-sm text-muted-foreground">
          Prefer to browse instead of describe? Start here.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {popularGenres.map((genre, i) => {
          const Icon = ICONS[genre.icon] ?? Crosshair;
          return (
            <motion.button
              key={genre.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-panel flex flex-col items-center gap-3 px-4 py-6 text-center transition-colors hover:border-nova-500/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-nova-500/20 to-circuit-500/20">
                <Icon className="h-6 w-6 text-circuit-400" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold">
                  {genre.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {genre.gameCount.toLocaleString()} games
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
