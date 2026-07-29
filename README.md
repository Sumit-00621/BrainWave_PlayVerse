# PlayVerse AI — Foundation

This is Step 1 of the build: **project architecture, folder structure, dependency list, and the full homepage layout.** No AI or RAWG calls are wired up yet — the homepage renders against local mock data so you can see and test the real UI before we touch any API.

## 1. What we built, and why

| Piece | Why it exists |
|---|---|
| `package.json` | Every dependency the whole project will eventually need (search bar, cards, animation, forms, Phaser, Firebase), pinned to versions that work together. You won't need to add packages later — just `npm install` once now. |
| `tailwind.config.ts` + `app/globals.css` | The entire visual identity lives here as **tokens**, not scattered inline styles: the `nova` (violet) and `circuit` (cyan) color scales, the `glass-panel` utility every card/nav uses, and the animated gradient border (`glow-border`) used on the primary CTA. Change the look of the whole app by editing these two files. |
| `components/ui/` | Hand-built shadcn-style primitives (`Button`, `Card`). We couldn't run the shadcn CLI in this sandbox (no network), so these are written to match shadcn's exact API — `npx shadcn@latest add <component>` will slot in cleanly later without conflicts. |
| `components/layout/` | `Navbar` and `Footer` — shared on every page, so they live outside `sections/`. |
| `components/sections/` | One file per homepage section (Hero, Trending, Genres, Features, How-it-Works, FAQ, AnimatedBackground). Each is self-contained and only imports what it needs. |
| `components/cards/GameCard.tsx` | The single reusable card used both on the homepage and later on the Game Details / Search Results pages — built once, reused everywhere. |
| `components/search/AISearchBar.tsx` | The search input UI, with a `onSearch` callback prop already in place. It currently just simulates loading — in the next step we'll pass it a real function that calls Gemini. |
| `lib/mock-data.ts` + `types/game.ts` | The `Game` type is modeled to match RAWG's response shape, so when we wire up the real API, the components underneath don't need to change — only the data source does. |
| `lib/utils.ts` | The `cn()` helper (clsx + tailwind-merge) every component uses to safely combine class names. |

## 2. Folder structure

```
playverse-ai/
├── app/
│   ├── layout.tsx        # fonts, metadata, global background/nav/footer shell
│   ├── page.tsx          # homepage — assembles all sections
│   └── globals.css       # design tokens + glass/gradient utility classes
├── components/
│   ├── ui/               # low-level primitives (Button, Card)
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # one file per homepage section
│   ├── cards/             # GameCard (reused across pages)
│   └── search/            # AISearchBar
├── lib/
│   ├── utils.ts
│   └── mock-data.ts       # placeholder content, replaced by live API data soon
├── types/
│   └── game.ts
├── hooks/                 # (empty — created for the next feature step)
├── services/              # (empty — will hold gemini.ts and rawg.ts)
└── public/
```

`hooks/` and `services/` are already created but empty on purpose — that's where the Gemini client, the RAWG client, and custom hooks like `useSearchHistory` and `useFavorites` will go in upcoming steps, so the structure doesn't need to change later.

## 3. Running it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

> **Note:** I couldn't run `npm install` myself in this sandbox (no internet access here), so I can't hand you a tested build — please run it locally and tell me about any errors so we fix them together, exactly per our workflow.

## 4. What's intentionally *not* done yet

Per the plan, these come in later steps, one at a time:

- Real Gemini call from `AISearchBar` (`services/gemini.ts`)
- Real RAWG search + `services/rawg.ts`
- Recommendation results page
- AI Mini Game Generator + Phaser engine
- Game Details page
- Favorites & Search History (localStorage hooks)
- Firebase Auth (optional)

## 5. Vercel Deployment

PlayVerse AI is optimized for 1-click zero-config deployment on [Vercel](https://vercel.com).

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import your repository.
3. In **Environment Variables**, add the following keys from your `.env.example`:
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google AI Studio API Key.
   - `NEXT_PUBLIC_RAWG_API_KEY`: Your RAWG.io API Key.
   - *(Optional)* Firebase keys (`NEXT_PUBLIC_FIREBASE_API_KEY`, etc.).
4. Click **Deploy**. Vercel will automatically run `npm run build` and publish your live app.

### Option B: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Deploy to preview environment
vercel

# 3. Deploy to production environment
vercel --prod
```

When prompted by Vercel CLI, add the environment variables specified in `.env.example`.

## 6. Testing local production build

```bash
# Build the production bundle
npm run build

# Start the production server locally
npm run start
```

