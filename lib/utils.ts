import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Used by every component instead of raw template strings so that
 * later classes (e.g. from a prop) correctly override earlier ones.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
