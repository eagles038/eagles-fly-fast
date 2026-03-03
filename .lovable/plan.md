

## Plan: Visual Parity Between Static and React Versions

### Problem Summary
1. **checkout.html**: Cart items are rendered dynamically via JS — the user wants them visible in HTML initially
2. **All static pages** need visual parity with React versions — styles, layout, and structure must match

### Analysis of Differences

**checkout.html:**
- Cart items block (`#checkoutItems`) is empty, filled by JS from localStorage — needs default/placeholder items hardcoded in HTML
- Comment field uses `<textarea>` in static vs `<input>` in React — minor
- Delivery time section (ASAP / Scheduled with date picker) missing from static
- Structure is largely similar but some styling differences

**404.html:**
- Static version has a rich design (icon, subtitle, description, button with icon)
- React version is minimal (plain text "Oops! Page not found" in English, no styled icon)
- The static 404 is actually *better* than React — React's NotFound needs updating to match static, or vice versa. Since static should match React, but React's 404 is currently bare-bones, we should first **upgrade the React NotFound** to a proper Russian-language page, then align static to it. Alternatively, keep the already-good static 404 and upgrade React to match it.

**Category pages (pizza.html, rolls.html, burgers.html, drinks.html):**
- Already have hardcoded product cards in HTML (done previously)
- Need CSS style audit for visual parity with React's `CategoryPage.tsx` (breadcrumbs, filters, product card layout, SEO text sections)

**contacts.html:**
- Has the content structure matching React's `Contacts.tsx` (contact methods, map, working hours)
- CSS styling parity needs verification

**delivery.html:**
- Has benefits grid, zones, payment methods matching React's `Delivery.tsx`
- CSS styling parity needs verification

**privacy.html:**
- Has all 9 sections of privacy policy
- CSS styling parity needs verification

### Implementation Plan

#### 1. Fix checkout.html — Hardcode default cart items in HTML
- Add 2-3 sample product cards in `#checkoutItems` as visible HTML (e.g., Пепперони, Классический бургер)
- These serve as initial visible content for SEO/SSR; JS will replace them with actual cart contents on load
- Add the "Delivery Time" section (ASAP / Scheduled) that exists in React but is missing from static
- Ensure the JS `initCheckout()` properly handles the pre-existing HTML items (replace on cart load, show empty state if cart is empty)

#### 2. Update static 404.html — Match React or vice versa
- Since the static 404 is already well-designed in Russian, **upgrade React's NotFound.tsx** to match the static version's design (Russian text, styled icon, proper button)
- This brings both into parity

#### 3. CSS audit and fixes across all pages
- Compare key visual properties (border-radius, shadows, colors, spacing, typography) between React Tailwind output and static CSS
- Key areas: product cards, page headers, form elements, buttons, card backgrounds
- Fix discrepancies in `static/style.css`

#### 4. Ensure structural parity for contacts, delivery, privacy pages
- Verify all content blocks present in React exist in static HTML
- Check responsive behavior matches

### Files to Modify
- `static/checkout.html` — add hardcoded cart items, add delivery time section
- `static/script.js` — update `initCheckout()` to handle pre-existing HTML items
- `static/style.css` — CSS fixes for visual parity
- `src/pages/NotFound.tsx` — upgrade to match static 404 design
- Potentially minor fixes to `static/contacts.html`, `static/delivery.html`, `static/privacy.html`, `static/404.html`, category pages

### Technical Notes
- Cart items in checkout are inherently dynamic (localStorage), so the hardcoded HTML items serve as placeholder/fallback content that JS replaces on page load
- The approach of "HTML-first, JS-enhances" aligns with the project's SEO-first architecture for Bitrix migration

