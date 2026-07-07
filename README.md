# SIFF Digital Hub — Website

This is the SIFF (Singles in Faith Fellowship) website, recreated as a plain HTML/CSS/JavaScript site so it can be hosted for free, load fast, and be maintained by anyone — no coding required for day-to-day updates.

## What's in this folder

```
SIFF-Digital-Hub/
├── wrangler.jsonc              Cloudflare deploy config — points at public/, don't move it
├── .gitignore / .assetsignore  Housekeeping — keeps build junk and internals off the live site
├── README.md                   This file (not published to the live site)
└── public/                     ⭐ Everything that is actually served on the live website
    ├── index.html                 Home page ("Welcome to SIFF")
    ├── resources.html              Resources hub page
    ├── recommended-reading.html    Recommended Reading (books)
    ├── teaching-library.html       Teaching Library (session recordings)
    ├── about.html                  About SIFF
    ├── 404.html                    Shown if a visitor hits a broken link
    ├── links.json                  ⭐ EVERY external link in one place — edit this file, not the HTML
    ├── css/styles.css              All colours, fonts, spacing (the "design system")
    ├── js/main.js                  Small script that applies links.json to the pages
    └── assets/img/favicon.svg      Browser tab icon
```

All site files live inside `public/` — this keeps the repository's internal files (like `.git`) from ever being served publicly. When editing content, always edit files inside `public/`.

## The one file you'll edit: `links.json`

Every external link — Zoom, Google Calendar, the Google Form, WhatsApp, Instagram, YouTube, Facebook, book links — lives in **`links.json`**. Open it in any text editor (even Notepad or TextEdit), find the field you want to change, edit the text between the quotes, save, and re-upload (or push) the file. You never need to touch the HTML pages to update a link.

Fields starting with `PLACEHOLDER` mean no real link exists yet — the button/link still displays on the site but is visually marked (dashed outline) and disabled until you replace the placeholder text with a real URL.

Current placeholders you'll likely want to fill in:
- `social.whatsapp.url` — your WhatsApp community invite link
- `social.facebook.url` — your Facebook page link
- `social.website.url` — your live domain, once you set one up (see below)
- `books.*.url` (three books) — Amazon or other links for each recommended book

## Navigation map (already wired up)

- **Home** → Resources, Join Us on Zoom, View Calendar, Listen to Previous Sessions, Ask a Question, About SIFF
- **Resources** → "View Books" opens **Recommended Reading**
- **Teaching Library** → every "Listen (Zoom)" link opens the shared Google Drive recordings folder (from `links.json` → `recordingsFolder.url`)
- Footer on every page links to WhatsApp / Instagram / YouTube / Email

---

## Live site

This site is deployed and live at: **https://siff-community-hub.agnesakin.workers.dev**

It's hosted on **Cloudflare** (via "Workers & Pages" → git-connected static site), deployed from the GitHub repository `MsBlessin/siff-digital-hub`, branch `main`. Every time a change is pushed to `main`, Cloudflare automatically rebuilds and redeploys within about a minute — no manual re-upload needed.

### How it's configured (for reference / rebuilding from scratch)
1. Code lives in a GitHub repo, pushed via `git push`.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages tab → Connect to Git**, repository selected, then on the settings screen: Framework preset "None", build command blank, deploy command blank (Cloudflare auto-detects `npx wrangler deploy`).
3. The repo includes a committed **`wrangler.jsonc`** at the root with `"assets": { "directory": "public" }` — this is required. Without a committed Wrangler config, Cloudflare's git-connected deploy treats every build as creating a brand-new Worker and fails with a "Worker already exists" error on the second deploy.
4. All servable files live inside **`public/`**, not the repo root — this is what keeps `.git` and other repository internals from being published as if they were public pages.

### Adding a custom domain later (e.g. `siffcommunity.org`)
1. Buy a domain from any registrar (Cloudflare Registrar, Namecheap, GoDaddy, etc.).
2. In the Cloudflare dashboard, open the `siff-community-hub` project → **Custom domains** → **Set up a custom domain** → enter your domain and follow the on-screen DNS instructions.
3. Cloudflare issues a free SSL certificate automatically — no redesign or code changes required, since every link on the site is relative.

---

## Alternative: GitHub Pages (also free)

If you'd rather not use Cloudflare at all, GitHub Pages works too, with one adjustment for the `public/` folder structure:

1. Code already lives in the `siff-digital-hub` GitHub repo (see above).
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, GitHub Pages only offers `/ (root)` or `/docs` as folder choices (not `public`) — so either:
   - **Easiest:** rename the `public/` folder to `docs/` in the repo (and update `wrangler.jsonc`'s `directory` to `"docs"` if you're running both hosts), then select **`main` branch, `/docs` folder**, or
   - Use a small GitHub Actions workflow to publish `public/` — ask me to set this up if you want to run GitHub Pages instead of, or alongside, Cloudflare.
4. GitHub gives you a live URL like `https://MsBlessin.github.io/siff-digital-hub/` within a minute or two.
5. To add a custom domain: **Settings → Pages → Custom domain**, enter your domain, then add the DNS records GitHub shows you.

Both options are completely free with no credit card required, and both give you free HTTPS.

---

## Testing changes on your own computer before publishing

You don't need to install anything complicated. If you have Python installed (most Mac/Linux computers do by default):

```
cd SIFF-Digital-Hub/public
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Opening the HTML files directly by double-clicking will mostly work, but the `links.json` auto-loading feature requires a local server like this, or a real hosted deployment, because browsers block that specific feature when opening a file directly from disk.)

## Accessibility & maintenance notes

- All colours, fonts and spacing are defined once at the top of `css/styles.css` as CSS variables — change a colour there and it updates everywhere.
- The site works without JavaScript (all real links are hardcoded as a fallback); `js/main.js` only upgrades links when `links.json` has been edited.
- Every image-like decoration is a lightweight inline SVG icon (no external image files to break or slow the site down), keeping the site fast on mobile data.
- Text, contrast and heading structure follow basic WCAG accessibility practices (skip link, focus outlines, alt-free decorative icons marked `aria-hidden`).
