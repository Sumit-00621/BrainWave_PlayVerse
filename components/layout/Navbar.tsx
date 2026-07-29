"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Menu, X, Heart, History, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Discover", href: "#trending" },
  { label: "Genres", href: "#genres" },
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const handleGetStarted = () => {
    setIsOpen(false);
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

  const showNotification = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel flex h-16 items-center justify-between px-4 sm:px-6"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-nova-500 to-circuit-500 shadow-md">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Play<span className="text-gradient-nova">Verse</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search history"
              onClick={() => {
                handleGetStarted();
                showNotification("Type a query above to view AI recommendations");
              }}
              title="Search History"
            >
              <History className="h-4 w-4 text-muted-foreground hover:text-white" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Favorites"
              onClick={() => showNotification("Click any game card to bookmark your favorites!")}
              title="Favorites"
            >
              <Heart className="h-4 w-4 text-muted-foreground hover:text-pink-400" />
            </Button>

            <Button
              variant="gradient"
              size="sm"
              onClick={handleGetStarted}
              className="shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Get Started
            </Button>
          </div>

          <button
            className="p-2 md:hidden text-white"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>

        {/* Toast Notification */}
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 top-24 z-50 rounded-xl bg-void-900/90 border border-nova-500/40 px-4 py-2 text-xs text-nova-300 backdrop-blur-md shadow-xl flex items-center gap-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-nova-400" />
              {activeNotification}
            </motion.div>
          )}
        </AnimatePresence>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-panel mt-2 flex flex-col gap-1 p-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="gradient"
              size="sm"
              onClick={handleGetStarted}
              className="mt-2 w-full flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-4 w-4" />
              Get Started
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
