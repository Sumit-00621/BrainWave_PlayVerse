"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { Game } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  className?: string;
}

export function GameCard({ game, className }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass-panel group flex flex-col overflow-hidden",
        className
      )}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={game.imageUrl}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-transparent to-transparent" />

        {game.matchPercentage && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/10 bg-void-950/80 px-2.5 py-1 text-xs font-semibold backdrop-blur">
            <span className="text-gradient-nova">{game.matchPercentage}% Match</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug">
            {game.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-xs text-circuit-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            {game.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>

        {game.matchReasons && game.matchReasons.length > 0 && (
          <ul className="mt-1 flex flex-col gap-1 border-t border-white/5 pt-3">
            {game.matchReasons.slice(0, 3).map((reason) => (
              <li
                key={reason}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Check className="h-3 w-3 text-circuit-400" />
                {reason}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
