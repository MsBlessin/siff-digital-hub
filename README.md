# SIFF Digital Hub — Website

This is the SIFF (Singles in Faith Fellowship) website, recreated as a plain HTML/CSS/JavaScript site so it can be hosted for free, load fast, and be maintained by anyone — no coding required for day-to-day updates.

## What's in this folder

```
SIFF-Digital-Hub/
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

## Recommended hosting: Cloudflare Pages (free, fast, reliable)

Cloudflare Pages is free forever for a static site like this, includes free HTTPS, and makes adding a custom domain later a two-click job.

### Step 1 — Put the code on GitHub (Cloudflare deploys from a Git repo)
1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository**. Name it e.g. `siff-digital-hub`. Keep it Public or Private (either works). Click **Create repository**.
3. On your computer, open a terminal in this `SIFF-Digital-Hub` folder and run:
   ```
   git init
   git add .
   git commit -m "Initial SIFF Digital Hub site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/siff-digital-hub.git
   git push -u origin main
   ```
   (Replace `YOUR-USERNAME` with your GitHub username. If you don't use the terminal, GitHub's website also lets you drag-and-drop all these files into a new repository instead.)

### Step 2 — Connect Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in (free account).
2. In the left sidebar, go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize Cloudflare to access GitHub, then select your `siff-digital-hub` repository.
4. Build settings: leave **Framework preset** as "None", **Build command** blank, **Build output directory** as `/` (root). Click **Save and Deploy**.
5. Within a minute, Cloudflare gives you a live URL like `siff-digital-hub.pages.dev`. That's your live website.

### Step 3 — Every future update is automatic
From now on, whenever you edit `links.json` (or any file) and push the change to GitHub, Cloudflare automatically redeploys the site within seconds. No manual re-upload needed.

### Step 4 — Add a custom domain later (e.g. `siffcommunity.org`)
1. Buy a domain from any registrar (Cloudflare Registrar, Namecheap, GoDaddy, etc.).
2. In Cloudflare Pages, open your project → **Custom domains** → **Set up a custom domain** → enter your domain and follow the on-screen DNS instructions.
3. Cloudflare issues a free SSL certificate automatically — no redesign or code changes required, because the site was built to be domain-agnostic (all links are relative).

---

## Alternative: GitHub Pages (also free)

If you'd rather not use Cloudflare at all:

1. Push this folder to a GitHub repository (same as Step 1 above).
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder, then **Save**.
4. GitHub gives you a live URL like `https://YOUR-USERNAME.github.io/siff-digital-hub/` within a minute or two.
5. To add a custom domain: **Settings → Pages → Custom domain**, enter your domain, then add the DNS records GitHub shows you (a `CNAME` record pointing to `YOUR-USERNAME.github.io`, or the four `A` records GitHub lists for an apex domain).

Both options are completely free with no credit card required, and both give you free HTTPS.

---

## Testing changes on your own computer before publishing

You don't need to install anything complicated. If you have Python installed (most Mac/Linux computers do by default):

```
cd SIFF-Digital-Hub
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Opening the HTML files directly by double-clicking will mostly work, but the `links.json` auto-loading feature requires a local server like this, or a real hosted deployment, because browsers block that specific feature when opening a file directly from disk.)

## Accessibility & maintenance notes

- All colours, fonts and spacing are defined once at the top of `css/styles.css` as CSS variables — change a colour there and it updates everywhere.
- The site works without JavaScript (all real links are hardcoded as a fallback); `js/main.js` only upgrades links when `links.json` has been edited.
- Every image-like decoration is a lightweight inline SVG icon (no external image files to break or slow the site down), keeping the site fast on mobile data.
- Text, contrast and heading structure follow basic WCAG accessibility practices (skip link, focus outlines, alt-free decorative icons marked `aria-hidden`).
