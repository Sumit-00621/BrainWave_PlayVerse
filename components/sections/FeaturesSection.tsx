"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, Heart, History, Gauge, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Natural Language Search",
    description:
      "Describe a mood, a mechanic, or a memory of a game you loved — Gemini turns it into a structured search profile.",
  },
  {
    icon: Wand2,
    title: "AI Game Generator",
    description:
      "Type a game idea and get a real, playable Phaser prototype — enemies, scoring, and levels included.",
  },
  {
    icon: Gauge,
    title: "Match Scoring",
    description:
      "Every recommendation comes with a transparent match percentage and the exact reasons behind it.",
  },
  {
    icon: Heart,
    title: "Favorites",
    description:
      "Save games you want to remember, stored locally — no account required.",
  },
  {
    icon: History,
    title: "Search History",
    description: "Revisit or clear past searches any time, right from your browser.",
  },
  {
    icon: ShieldCheck,
    title: "No Backend Required",
    description:
      "Runs entirely at the edge on Vercel — your data stays in your browser unless you opt into sync.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Everything you need to find — or build — your next game
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-panel p-6"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-nova-500/20 to-circuit-500/20">
              <feature.icon className="h-5 w-5 text-nova-400" />
            </div>
            <h3 className="font-display text-lg font-semibold">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
