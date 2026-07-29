"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, Wand2, Gamepad2, CheckCircle2, Cpu, ExternalLink, X, Code2 } from "lucide-react";
import { Game } from "@/types/game";
import { AIConcept } from "@/services/gemini";
import { GameCard } from "@/components/cards/GameCard";

interface SearchResultsSectionProps {
  prompt: string;
  understanding: string;
  games: Game[];
  aiConcept?: AIConcept;
  onClear?: () => void;
}

export function SearchResultsSection({
  prompt,
  understanding,
  games,
  aiConcept,
  onClear,
}: SearchResultsSectionProps) {
  const [selectedConcept, setSelectedConcept] = useState<AIConcept | null>(null);

  return (
    <section id="ai-results" className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-nova-500/30 bg-void-950/80 backdrop-blur-xl relative overflow-hidden shadow-2xl"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-nova-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-circuit-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nova-500 to-circuit-500 text-white shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-nova-400">
                  PlayVerse AI Analysis
                </span>
                <span className="rounded-full bg-nova-500/20 px-2 py-0.5 text-[10px] font-medium text-nova-300 border border-nova-500/30">
                  Gemini Powered
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-white">
                Results for: <span className="text-gradient-nova">&quot;{prompt}&quot;</span>
              </h2>
            </div>
          </div>

          {onClear && (
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
            >
              <X className="h-3.5 w-3.5" />
              Clear Search
            </button>
          )}
        </div>

        {/* AI Intent Understanding Box */}
        <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/10 p-4 md:p-5 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-circuit-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="text-xs font-medium text-circuit-400 uppercase tracking-wider block mb-1">
              AI Recommendation Reasoning
            </span>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans">
              {understanding}
            </p>
          </div>
        </div>

        {/* Recommended Games Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-display text-white flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-nova-400" />
              Matching Existing Titles ({games.length})
            </h3>
          </div>

          {games.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matching games found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {games.map((game, idx) => (
                <motion.div
                  key={game.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* AI Generated Game Concept Card */}
        {aiConcept && (
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-circuit-400" />
                <h3 className="text-lg font-semibold font-display text-white">
                  Generated AI Game Concept
                </h3>
              </div>
              <span className="text-xs text-circuit-300 font-mono bg-circuit-500/20 px-2.5 py-1 rounded-full border border-circuit-500/30">
                100% Unique Prototype
              </span>
            </div>

            <motion.div
              whileHover={{ scale: 1.005 }}
              className="rounded-2xl bg-gradient-to-r from-nova-950/60 via-void-900 to-circuit-950/60 border border-nova-500/40 p-6 relative overflow-hidden group shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded bg-nova-500/20 text-nova-300 text-[11px] font-semibold px-2 py-0.5 uppercase tracking-wide">
                      {aiConcept.genre}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Cpu className="h-3 w-3 text-circuit-400" /> {aiConcept.suggestedEngine}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white group-hover:text-nova-300 transition-colors">
                    {aiConcept.title}
                  </h4>
                  <p className="text-xs text-nova-400 font-medium italic mt-0.5">
                    &quot;{aiConcept.tagline}&quot;
                  </p>
                  <p className="text-sm text-gray-300 mt-3 max-w-3xl leading-relaxed">
                    {aiConcept.gameplaySummary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {aiConcept.keyFeatures.map((feat) => (
                      <span
                        key={feat}
                        className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gray-300"
                      >
                        <CheckCircle2 className="h-3 w-3 text-nova-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedConcept(aiConcept)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-nova-500 to-circuit-500 text-white font-medium text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-nova-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <Code2 className="h-4 w-4" />
                    View AI Blueprint
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* AI Concept Blueprint Modal */}
      <AnimatePresence>
        {selectedConcept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedConcept(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-2xl p-6 md:p-8 rounded-3xl border border-nova-500/40 bg-void-950 relative text-white max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedConcept(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-nova-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Wand2 className="h-4 w-4" /> AI Prototype Blueprint
              </div>

              <h3 className="text-2xl font-bold font-display text-white">
                {selectedConcept.title}
              </h3>
              <p className="text-sm text-nova-300 italic mb-4">&quot;{selectedConcept.tagline}&quot;</p>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs uppercase font-semibold text-circuit-400 mb-1">Core Gameplay Overview</h4>
                  <p>{selectedConcept.gameplaySummary}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-muted-foreground block">Suggested Engine</span>
                    <span className="font-semibold text-white">{selectedConcept.suggestedEngine}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-muted-foreground block">Target Audience</span>
                    <span className="font-semibold text-white">{selectedConcept.targetAudience}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-semibold text-circuit-400 mb-2">Key Game Mechanics & Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedConcept.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-gray-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-nova-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
