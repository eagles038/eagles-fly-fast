
# Plan: Category Pages with Filters and SEO Text

## Overview
Create 4 separate static HTML pages for each menu category (Pizza, Rolls, Burgers, Drinks), with tag-based filtering for Pizza and Rolls, and an SEO text block at the bottom of each page.

## New Files to Create

### 1. `static/pizza.html`
- Full page with header, footer, cart sidebar (reuse from delivery.html template)
- SEO meta tags: title "Пицца с доставкой — Eagles Food", description about pizza delivery
- Breadcrumb: Главная > Пицца
- Page title: h1 "Пицца" with description
- **Filter tags** (from React `pizzaFilters`): Акция, Острая, Вегетарианская, С курицей, С мясом, Сырная -- with SVG icons
- Product grid with all 4 pizzas (with `filterTags` on each item)
- SEO text block at the bottom (~200 words about pizza, ingredients, delivery)

### 2. `static/rolls.html`
- Same structure as pizza.html
- SEO meta tags for rolls
- **Filter tags** (from React `rollsFilters`): Акция, Хит, Запечённые, С лососем, С угрём, Премиум
- Product grid with all 4 rolls (with `filterTags`)
- SEO text block about rolls and Japanese cuisine

### 3. `static/burgers.html`
- Same structure, **no filters** (per user request: filters only for Pizza and Rolls)
- Product grid with all 4 burgers
- SEO text block about burgers

### 4. `static/drinks.html`
- Same structure, **no filters**
- Product grid with all 4 drinks
- SEO text block about drinks

## Changes to Existing Files

### `static/style.css`
Add new BEM blocks:
- `.category-page` -- page wrapper for category pages
- `.category-page__hero` -- small hero banner with category title
- `.breadcrumb` / `.breadcrumb__item` / `.breadcrumb__separator` -- breadcrumb navigation
- `.seo-text` / `.seo-text__title` / `.seo-text__content` -- SEO text block at bottom, styled as readable prose
- `.menu-category__filter-icon` -- icon inside filter buttons (SVG inline)
- `.menu-category__empty` -- empty state when no products match filters

### `static/script.js`
- Add `filterTags` arrays to each item in `menuCategories` data (matching React component)
- Add `categoryFilters` data object with filter definitions for pizza and rolls
- Add `initCategoryPage()` function:
  - Detects which category page we're on via `data-category` attribute
  - Renders filter buttons from `categoryFilters` data
  - Handles filter toggle (multi-select)
  - Filters product cards by matching `filterTags`
  - Shows empty state with "Сбросить фильтры" button when no matches
- Update `initMenu()` to also render grids on category pages

### Navigation Updates
- Update `header__nav` links in all static pages to point to `/pizza.html`, `/rolls.html`, `/burgers.html`, `/drinks.html` instead of `#pizza`, `#rolls`, etc.
- Update footer menu links similarly
- Update mobile menu links

## Technical Details

### Filter Tags Data (added to menuCategories items)
```text
Pizza:
  Пепперони: ['spicy', 'with-meat']
  Маргарита: ['vegetarian', 'cheese']
  BBQ Курица: ['with-chicken']
  4 сыра: ['vegetarian', 'cheese']

Rolls:
  Филадельфия: ['hot', 'with-salmon', 'premium']
  Калифорния: ['baked']
  Дракон: ['sale', 'with-eel', 'premium']
  Унаги: ['sale', 'with-eel', 'baked']
```

### SEO Text Content (example for pizza page)
Each page gets a `.seo-text` section with:
- h2 heading relevant to the category
- 2-3 paragraphs of unique, keyword-rich text about the category
- Natural mentions of delivery, quality ingredients, and the Eagles Food brand
- Internal links to other categories and the main page

### Page Structure (BEM)
```text
body.page.page--inner
  header.header (same as other inner pages)
  main.main
    section.category-hero
      .container
        .breadcrumb
        h1.category-hero__title
        p.category-hero__subtitle
    section.menu-category[data-category="pizza"]
      .container
        .menu-category__filters (only for pizza/rolls)
        .menu-category__grid
        .menu-category__empty (hidden by default)
    section.seo-text
      .container
        h2.seo-text__title
        .seo-text__content (paragraphs)
  footer.footer (same as other pages)
  cart sidebar (same as other pages)
```
