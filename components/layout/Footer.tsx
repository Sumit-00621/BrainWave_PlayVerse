import Link from "next/link";
import { Gamepad2, Github, Twitter, MessageCircle } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Discover", href: "#trending" },
      { label: "AI Game Generator", href: "#generate" },
      { label: "Genres", href: "#genres" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How it Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "RAWG API", href: "https://rawg.io" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void-950/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-nova-500 to-circuit-500">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">
                Play<span className="text-gradient-nova">Verse</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Describe the game you want, in your own words. PlayVerse finds
              it — or builds you a playable prototype on the spot.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-nova-500/50 hover:text-nova-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} PlayVerse AI. Built for the hackathon.</p>
          <p>Game data via RAWG · Recommendations via Gemini</p>
        </div>
      </div>
    </footer>
  );
}
