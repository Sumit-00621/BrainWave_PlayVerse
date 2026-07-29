"use client";

import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrendingGames } from "@/components/sections/TrendingGames";
import { PopularGenres } from "@/components/sections/PopularGenres";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FAQSection } from "@/components/sections/FAQSection";
import { SearchResultsSection } from "@/components/search/SearchResultsSection";
import { Game } from "@/types/game";
import { AIConcept } from "@/services/gemini";
import { Loader2, AlertCircle } from "lucide-react";

export default function HomePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [activePrompt, setActivePrompt] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<{
    understanding: string;
    recommendedGames: Game[];
    aiConcept?: AIConcept;
  } | null>(null);

  async function handleSearch(prompt: string) {
    setIsSearching(true);
    setActivePrompt(prompt);
    setSearchError(null);

    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process AI search query.");
      }

      setSearchResult({
        understanding: data.understanding,
        recommendedGames: data.recommendedGames,
        aiConcept: data.aiConcept,
      });

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById("ai-results");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Search Error:", err);
      setSearchError(err.message || "An error occurred while communicating with Gemini AI.");
    } finally {
      setIsSearching(false);
    }
  }

  function handleClearSearch() {
    setSearchResult(null);
    setActivePrompt("");
    setSearchError(null);
  }

  return (
    <>
      <HeroSection onSearch={handleSearch} isLoading={isSearching} />

      {/* Loading Indicator */}
      {isSearching && (
        <div className="w-full py-12 flex flex-col items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-500 to-circuit-500 text-white shadow-xl animate-bounce">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
          <p className="text-sm font-medium text-gradient-nova animate-pulse">
            PlayVerse AI is analyzing your prompt with Gemini...
          </p>
        </div>
      )}

      {/* Search Error Banner */}
      {searchError && (
        <div className="max-w-2xl mx-auto px-4 py-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
          <div>
            <p className="font-semibold">AI Search Error</p>
            <p className="text-xs text-red-300/80">{searchError}</p>
          </div>
        </div>
      )}

      {/* Live AI Search Results */}
      {searchResult && !isSearching && (
        <SearchResultsSection
          prompt={activePrompt}
          understanding={searchResult.understanding}
          games={searchResult.recommendedGames}
          aiConcept={searchResult.aiConcept}
          onClear={handleClearSearch}
        />
      )}

      <TrendingGames />
      <PopularGenres />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaBanner />
      <FAQSection />
    </>
  );
}
