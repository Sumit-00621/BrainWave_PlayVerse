"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Radar, Gamepad2 } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Describe what you want",
    description:
      "\"A relaxing farming game with pixel art\" — type it like you'd tell a friend.",
  },
  {
    icon: Radar,
    title: "AI structures & matches",
    description:
      "Gemini extracts genre, tone, and mechanics, then RAWG's catalog is searched for real matches.",
  },
  {
    icon: Gamepad2,
    title: "Play, save, or generate",
    description:
      "Browse matches with match scores, save favorites, or have Gemini build you a quick playable prototype.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          How It Works
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Three steps, from a sentence to a real recommendation.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* connecting line, desktop only */}
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-void-900">
              <step.icon className="h-7 w-7 text-circuit-400" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-nova-500 to-circuit-500 text-[11px] font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
