"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  const handleGetStarted = () => {
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    const heroSearch = document.getElementById("hero-search");

    if (heroSearch) {
      heroSearch.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (searchInput) {
      setTimeout(() => {
        searchInput.focus();
        searchInput.classList.add("ring-2", "ring-nova-400");
        setTimeout(() => searchInput.classList.remove("ring-2", "ring-nova-400"), 1500);
      }, 350);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-nova-500/30 bg-gradient-to-r from-nova-950/80 via-void-950 to-circuit-950/80 p-8 sm:p-12 text-center shadow-2xl"
      >
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-nova-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-circuit-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-500 to-circuit-500 text-white shadow-lg">
            <Gamepad2 className="h-6 w-6" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your next favorite game?
          </h2>

          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Describe any game idea, mechanics, or mood in plain language and let Gemini AI match or generate it instantly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleGetStarted}
              className="h-12 px-8 text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
