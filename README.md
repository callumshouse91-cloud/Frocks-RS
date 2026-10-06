# Maison Elowen – bridal boutique website

## What this file is

This is the rulebook. The AI reads it before every change. It says how the system must behave: how pictures are used, what the site may say, what the AI may do, how it should feel, and what counts as done.

It does **not** say what to build. That is the prompt's job, written for each piece of work in the five-part format: who it's for and the one action, what to build in order, content rules, technical rules, what done looks like. The prompt can be short because this file is long. That is the trade: time spent here is saved on every prompt after it.

If something isn't written here or in the prompt, it doesn't get built.

## Where we start

The folder contains two things, on purpose:

- `README.md` — this file
- `images/` — the 14 photos listed under Images below

Nothing else. The first thing the AI must do is create the data files (`data/dresses.json`, `data/site.json`, `data/enquiries.json`) from the Images section and the rules below, list them, and stop for approval — before any page is written.

---

## 1. Outcome — what the site is for

**For:** a bride (or her mum) who has found the shop online and is deciding whether to visit.
**The one action:** she books an appointment.

Every decision in this file, and every prompt that follows, is resolved against that sentence. If a feature doesn't move her closer to booking, it waits.

---

## 2. Feel and tone — how it must come across

- **Feel:** a quiet, well-lit boutique. Lots of white space. The photos do the work; the page stays out of their way.
- **Tone:** warm, plain, unhurried. No exclamation marks. No "stunning", "dream", "perfect".
- **Colour:** ivory background, near-black text, one soft accent (oyster or pale blush) used sparingly for the booking button and links. Nothing bright.
- **Type:** one serif for headings, one plain sans-serif for body. Generous line height. Never more than about 70 characters per line.
- **Layout:** single column on mobile; two or three columns for the collection on desktop. Photos in a consistent 4:5 frame so the collection reads as one set.
- **Motion:** none, apart from the booking confirmation appearing.

---

## 3. Images — how pictures are used

All 14 files live in `images/`, shot as one consistent set (same light, no faces, no text).

**The rule:** nothing on the site refers to a photo directly. Every page reads file names from `data/`. So the collection can start with three dresses and grow to eight, or swap one out, by editing `dresses.json` alone. The AI never hard-codes an image.

Never crop, recolour or add text to an image. If a page needs an image that isn't in this list, write **TBC** and leave the slot visible.

### Dresses (portrait, 4:5) — referenced from `data/dresses.json`

| # | File | Silhouette | Fabric | Detail |
|---|---|---|---|---|
| 1 | `dress-aline-lace.jpg` | A-line | Lace | Long illusion sleeves, modest neckline, chapel train |
| 2 | `dress-ballgown-tulle.jpg` | Ball gown | Tulle | Strapless sweetheart bodice, layered skirt |
| 3 | `dress-mermaid-satin.jpg` | Mermaid | Satin | Plain bodice, dramatic flare from the knee |
| 4 | `dress-sheath-crepe.jpg` | Sheath | Crepe | Square neckline, clean lines, no embellishment |
| 5 | `dress-boho-chiffon.jpg` | Boho | Chiffon | Embroidered floral lace, relaxed shoulder |
| 6 | `dress-tea-length-vintage.jpg` | Tea-length | Satin | 1950s, fitted bodice, collar and bow detail |
| 7 | `dress-bridal-jumpsuit.jpg` | Jumpsuit | Crepe | Halter neck, wide leg, tailored |
| 8 | `dress-off-shoulder-train.jpg` | Ball gown | Mikado | Off-the-shoulder, cathedral train |

Each entry in `dresses.json` carries: `id`, `name`, `image`, `silhouette`, `fabric`, `detail`, `price_from`, `price_to`, `featured` (true/false). The collection page shows every dress; the home page shows only `featured` ones. Filters are built from the `silhouette` and `fabric` values present in the file, not from a fixed list.

### Site imagery — referenced from `data/site.json`

| # | File | Used for | Shape |
|---|---|---|---|
| 9 | `hero-boutique-interior.jpg` | Home hero | 16:9 |
| 10 | `about-fitting-room.jpg` | About / How a fitting works | 3:2 |
| 11 | `accessory-veil.jpg` | Accessories | 1:1 |
| 12 | `accessory-shoes.jpg` | Accessories | 1:1 |
| 13 | `accessory-hairpiece.jpg` | Accessories | 1:1 |
| 14 | `logo-maison-elowen.png` | Header and footer (transparent) | — |

`site.json` holds `hero`, `about`, `logo` and an `accessories` list (`name`, `image`, `one_line`). Swapping the hero or adding a fourth accessory is a change to that file, not to the code.

---

## 4. Content rules — what the site may say

- The eight dresses and six site images are the only ones that exist. Never add a dress, a photo or a detail that isn't in the Images section.
- Prices are **TBC** until the owner gives them. Don't invent one. If a prompt supplies prices, use those exactly, shown as ranges ("£1,800–£2,400") unless `dresses.json` says exact.
- Where information is missing — opening hours, address, lead times — show a named placeholder such as **[ADDRESS]** and leave it visible. Don't fill the gap. Every placeholder is listed under "Placeholders to replace" below. A price that is `null` in `dresses.json` shows as "Price TBC".
- Sample data is allowed in one place only: `data/enquiries.json`, so the owner view has something to show. Every record carries `"sample": true`, names are plainly fictional, and the owner view shows a banner saying so. Nothing else on the site may be made up.
- No testimonials unless real ones are added to `data/testimonials.json`.

---

## 5. Data rules — where facts live

- Data lives in `data/` as JSON. Code reads the data; it never hard-codes a dress, a price or an image.
- Changing what the site shows is a change to a data file, not to the code. If a prompt asks for something that would need a fact hard-coded, the AI proposes the data change instead.
- Bookings and enquiries are saved to the shop's own database (Neon Postgres, see §7) and read only by the owner at `/admin`. They are sent nowhere else.

---

## 6. AI rules and guardrails — what the AI features may do

**Status: on hold.** Not in the current build plan. Nothing in this section is built unless a prompt asks for it.

Two AI features are planned: *Find my dress* (a bride describes what she wants and gets 2–3 dresses back with a reason for each) and *Owner insights* (a summary of enquiries: what's being asked for, repeated questions, what to stock).

**What they may say**
- Recommend only dresses that exist in `dresses.json`. Never invent a dress, a price or a detail.
- Answer only from the site's own data and content. If nothing fits, say "I'm not sure" and point to booking a fitting — never stretch.
- Keep to the tone in section 2.

**What they may do**
- All AI code lives in one file, `ai.js`. Nothing else on the site calls a model.
- The connection (provider, endpoint, model, key) is entered by the owner in a Settings panel and held only in that browser. No key or endpoint appears anywhere in the code or the files.
- If no connection is saved, the AI features call nothing and show "AI not configured. Open Settings and add an approved endpoint and key." Everything else on the site works exactly as before.
- Every AI call sends only what it needs: the question and the relevant data. Never the whole site, never the enquiries unless the owner is asking about enquiries.
- If a call fails, show the error in plain words, never a blank.

This is the wall, on purpose. The feature is built and visible before the connection exists, so the request to IT is a specific one.

---

## 7. Technical rules — how the build must behave

- Next.js (App Router, TypeScript), deployed to Vercel. Agreed 06 Oct 2026 so that bookings can be saved and `/admin` can be password-protected. No package is added without asking first.
- No external resources at runtime: fonts are served from the site itself, no scripts from elsewhere, no analytics, no cookies.
- Before writing any code, **list every file you will create or change and stop for approval**.
- Keep each change small. One sentence explaining it before it's made.
- If two requirements conflict, ask, with a recommendation. Never guess.
- Build in the order the prompt gives. Finish one thing, log it under "What changed", then move on.

### Back end — honest about what exists

| Today | Next | Needs |
|---|---|---|
| Content (dresses, site details) read from `data/*.json` | — | Nothing. The owner edits a file and redeploys |
| Bookings and enquiries saved to Neon Postgres (Vercel free tier) from Step 3 | Email the shop when a new one arrives | An email service (not chosen yet) |
| Site on Vercel | Own domain | The shop's domain pointed at Vercel |

The pattern is the point: the front of the site is finished and useful on its own. The back end is three small, nameable requests, not a rebuild.

---

## 8. What done looks like — the record

After every change, the AI updates the sections below. The owner reads "For the shop this means" aloud and corrects it in their own words. Those corrections are the acceptance test.

### What this site does
A website for Maison Elowen that helps a bride decide to visit and book an appointment. Today it has a home page and a holding page for booking. The collection and booking form come next.

### What changed in this version
- 06 Oct 2026 — v0.1 — Data files created: `data/dresses.json` (the 8 dresses, prices TBC), `data/site.json` (logo, hero, accessories, contact placeholders), `data/enquiries.json` (3 sample records). README renamed and rules updated to match the agreed stack.
- 06 Oct 2026 — v0.2 — Step 1, landing page. Home page with a hero line and "Book an appointment" button, "How a fitting works" in three steps, opening hours, address and a map slot. Header with the shop name and booking button, footer with contact details. `/book` is a holding page that gives the phone and email until the booking form exists. 10 of the 14 photos are faulty and show as "Image TBC" (see "Photos to replace").
- 06 Oct 2026 — v0.3 — All 14 photos are now shown as supplied, at the owner's request. The logo appears in the header at 64px.

### For the shop this means
- You have a home page that tells a bride how a fitting works and gives her one clear way to book.
- When you fill in your phone, email, address, opening hours or fitting details in `data/site.json`, they appear on every page. You don't touch any code.
- Anything still missing is highlighted in yellow on the page, so you can see at a glance what's left to fill in.

### What it does not do yet
- Show the collection (Step 2 next)
- Take bookings online. `/book` only gives the phone and email for now (Step 3)
- Show clean versions of 10 photos. The files themselves are faulty (see "Photos to replace")
- Show a real map
- Save or send bookings
- Email the shop when a booking arrives
- Take payment or deposits
- Show prices, sizes, address, phone or opening hours. These are placeholders until you supply them
- Find my dress / Owner insights (on hold)

### Placeholders to replace
All of these live in `data/` and change without touching code.

| Placeholder | File | Field |
|---|---|---|
| Price TBC (`null`) | `data/dresses.json` | `price_from`, `price_to` on each dress. Same number in both means an exact price |
| [SIZES] | `data/dresses.json` | `sizes` on each dress, e.g. "UK 6–20" |
| [ADDRESS] | `data/site.json` | `contact.address` |
| [PHONE] | `data/site.json` | `contact.phone` |
| [EMAIL] | `data/site.json` | `contact.email` |
| [OPENING HOURS] | `data/site.json` | `contact.opening_hours` |
| [MAP] | `data/site.json` | `contact.map` (a map link or embed, when chosen) |
| [FITTING LENGTH] | `data/site.json` | `fitting.length` |
| [NUMBER OF GUESTS] | `data/site.json` | `fitting.guests` |
| [WHAT TO BRING] | `data/site.json` | `fitting.what_to_bring` |

### Photos to replace
On the owner's instruction, all 14 photos are used as supplied. Ten of them have a strip of another photo across the top, and the logo is a square collage rather than a transparent wordmark: `logo-maison-elowen.png`, `hero-boutique-interior.jpg`, `about-fitting-room.jpg`, `dress-boho-chiffon.jpg`, `dress-tea-length-vintage.jpg`, `dress-bridal-jumpsuit.jpg`, `dress-off-shoulder-train.jpg`, `accessory-veil.jpg`, `accessory-shoes.jpg`, `accessory-hairpiece.jpg`. To replace one, save a clean file under the same name in `public/images/`. No other change is needed.

Which dresses appear on the home page is set by `featured` in `dresses.json` (currently A-Line Lace, Tulle Ball Gown, Crepe Sheath. Change freely).

### How to run it
Needs Node.js 20 or newer. In this folder run `npm install` once, then `npm run dev`, then open http://localhost:3000. The owner view will be at `/admin` from Step 5. Data is in `data/`, photos are in `public/images/`.

To add a dress: put its photo (portrait, 4:5) in `public/images/`, then copy an existing entry in `data/dresses.json` and change the details.

### What IT (or the shop's host) needs to enable
- A Vercel account (free tier) with a Neon Postgres database added from the Storage tab
- Two environment variables: `DATABASE_URL`, `ADMIN_PASSWORD`
- Later: an email service if the shop wants new bookings emailed

---

## Technical log
Decisions, assumptions and open doubts, in date order. Nothing goes in "What changed" above that isn't explained here.

- 06 Oct 2026 — Build brief conflicted with this README on several points. The owner's representative said "do what is best", so these recommendations were applied:
  - Stack is Next.js on Vercel, not plain HTML. Saving bookings and a password-protected `/admin` both need server code.
  - Bookings and enquiries go to Neon Postgres (the current form of "Vercel Postgres", free tier). Chosen over a key–value store because these are simple tables: newest-first lists and status changes are one-line queries, and the data can be exported.
  - `/admin` uses the browser's built-in username-and-password box (HTTP Basic Auth), checked against `ADMIN_PASSWORD`. No cookies.
  - Missing facts are named placeholders (`[ADDRESS]`) rather than plain TBC, so the owner knows what each one needs. Prices stay `null` and show "Price TBC".
  - The budget-band filter (under £1,000 / £1,000–£2,500 / over £2,500) is built, but it is hidden while no dress has a price.
  - Style filters come from the `silhouette` and `fabric` values in the data, not a fixed list.
  - A `sizes` field was added to each dress for the detail view. An `alt` field was added to dresses and site images for accessible alt text, written from the image descriptions.
  - Featured dresses (A-Line Lace, Tulle Ball Gown, Crepe Sheath) were picked to show a range of styles. They are not a business decision.
  - The AI features (§6) are on hold. They are not in the build brief.
  - Renamed `README (5).md` to `README.md`, and `Images/` to `images/`. Vercel is case-sensitive.
  - `images/README.txt` and `images/manifest.json` are kept as source notes. The site doesn't read them.
  - Open doubt: the project sits in OneDrive, and syncing `node_modules` may be slow. It was left in place. If OneDrive causes problems, move the folder out.
- 06 Oct 2026 — Photos moved from `images/` to `public/images/`, because `next/image` only serves files from `public/`. Approved.
- 06 Oct 2026 — Installed `next` 16, `react` 19, `react-dom` 19, and the dev tools `typescript` 5 and `@types/*`. Approved. Used TypeScript 5 rather than 7 because Next.js expects 5.
- 06 Oct 2026 — Found that 10 of the 14 image files are broken (a strip of another photo stuck on top, and the logo is a collage on white rather than a transparent wordmark). §3 forbids cropping, so they are set to "TBC" in the data with the original filename kept in `image_file_when_fixed`. Owner to supply clean files.
- 06 Oct 2026 — Fonts are Cormorant Garamond (headings) and Inter (body) via `next/font`, which copies them into the site at build time. No requests to Google from visitors.
- 06 Oct 2026 — On narrow phones the header button reads "Book", but screen readers still hear "Book an appointment". This keeps the header on one line at 375px.
- 06 Oct 2026 — Checked at 375px: no sideways scrolling, button tap targets at least 44px high, visible keyboard focus. Contrast measured: body text 16:1, muted text 6.7:1, links 6.8:1, button 12:1, placeholders 9.8:1. All pass AA.
- 06 Oct 2026 — The "How a fitting works" copy makes no promises about the shop (no "private", "no pressure" or similar) because those would be invented facts. Length and number of guests are placeholders.
- 06 Oct 2026 — The owner asked for the photos in the folder to be used as they are, so the "TBC" image settings were reverted. The faulty images are not cropped or edited, which still keeps to §3. The "Image TBC" slot code remains for any image later set to "TBC".
