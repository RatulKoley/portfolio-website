# Portfolio → Portfolio + Shop Plan

Target: https://ratulkoley.dpdns.org (Netlify, builds from GitHub `RatulKoley/portfolio-website`)
Stack today: React 19 + Vite 8 + Tailwind 4 + Framer Motion, single-page, content centralized in `src/data/portfolio.js`.

## Decisions locked in
- **Payments**: Razorpay (existing account) for online checkout + two free direct rails:
  - **Direct UPI**: UPI ID `7602497859@superyes` → on-page QR + deep link with the product amount pre-filled; buyer pays and submits the 12-digit UTR for verification.
  - **Direct bank transfer**: account no. + IFSC shown with copy buttons; buyer submits transfer reference for verification.
- **Catalog mix**: digital assets (apps, source-code repos/templates) **and** services (complete business setup, custom projects, integrations).
- **Architecture**: separate routes (`/shop`, `/shop/:slug`) via react-router — shareable product URLs, cleaner homepage.
- **Enhancements**: visual polish & animations, SEO & performance, new content sections, accessibility & mobile — all four.

---

## Phase 1 — Shop (new code)

### 1.1 Routing & structure
- Add `react-router-dom`. Routes: `/` (portfolio) · `/shop` (catalog) · `/shop/:slug` (product) · `/services/:slug` reuses product page for services. 404 page.
- `netlify.toml` with SPA fallback (`/* → /index.html 200`) so deep links don't 404 on Netlify.
- New data module `src/data/products.js` (same pattern as `portfolio.js`): slug, name, type (`app` | `source-code` | `service`), tagline, description, features, techStack, gallery, demoUrl, priceInr (+ optional compareAt), delivery note, license note, status (draft/live), razorpayLink.
- Site-level config (UPI ID, bank details) centralized with products for easy editing.

### 1.2 Catalog page
- Sectioned: **Digital assets** (apps + source code) and **Services**.
- Filters by category/tech, search, sorted cards with price, tech chips, "Buy" → product page.

### 1.3 Product page
- Gallery/screenshots, description, feature list, tech stack, demo link, license terms (personal vs commercial for source code; scope/milestones for services).
- Buy panel with **3 tabs**, matching your rails:
  1. **Razorpay** — hosted Payment Links (created per product in your Razorpay dashboard; URL stored in product data). No keys in code, no backend, handles cards/UPI/netbanking + international if enabled on your account.
  2. **UPI QR** — `upi://pay?pa=7602497859@superyes&am=<price>&cu=INR&tn=<product>` rendered as a QR next to a "Open UPI app" button (mobile). Copy VPA/amount helpers. Buyer then submits the UTR.
  3. **Bank transfer** — details + copy buttons, buyer submits reference.
- **Verification flow**: "I've paid — verify" form (name, email/WhatsApp, product, UTR/reference, optional screenshot) → **Netlify Forms** (free tier, submissions in your Netlify dashboard + email notifications). You verify the credit and deliver the file/access by email.
  - Future upgrade hook: Razorpay webhook + Netlify Function to auto-stamp paid orders.

### 1.4 Cross-links
- Navbar: add **Shop** link; Hero/Projects CTAs link into the shop; Services teaser section on the homepage pointing to `/shop` services.

## Phase 2 — Enhancements (existing pages)

- **Visual polish**: hero polish (staggered reveal, subtle glow/grid background), scroll-reveal on all sections, card hover micro-interactions, refined spacing/typography.
- **New sections**: **Services** ("complete business setup, custom builds, integrations") with 3-4 service cards → `/shop`; **Testimonials** (data-driven, easy to fill later); **"How buying works"** strip on the shop (Pay → Verify → Deliver).
- **SEO**: per-route `<title>`/meta via document head updates, Open Graph/Twitter tags, JSON-LD (`Person`, `Product` + `Offer` in INR for listed assets), `sitemap.xml`, `robots.txt`, canonical URLs.
- **Performance**: lazy-load the shop route (React.lazy + Suspense), compress `hero.png`/`headshot.png`, font-display tuning, Lighthouse pass before deploy.
- **Accessibility & mobile**: honor `prefers-reduced-motion` in animations, aria-current on nav, labeled forms, visible focus states, mobile menu + UPI-button UX on phones.

## Phase 3 — Verify & deploy

- `npm run lint && npm run build`, then local `vite preview` smoke test of every route (desktop + mobile viewport).
- Deploy: push the branch to GitHub (Netlify auto-builds), or `netlify deploy` via CLI / browser session. Your call at that point.
- After deploy: test deep links (`/shop`, `/shop/:slug`) against SPA fallback, submit a test verification form, click through all three payment rails.

## Notes / risks
- Never place Razorpay secret keys in frontend code — Payment Links avoid this entirely.
- UPI/bank rails are manual-verify by design (zero fees); auto-verification via Razorpay webhook is a later upgrade, not day one.
- Services get a fixed-price or "starting at" price; complex ones route to an enquiry/quote CTA instead of checkout.
- Product ZIPs are delivered privately (via email/drive link after verification) — never as public URLs on the site.
