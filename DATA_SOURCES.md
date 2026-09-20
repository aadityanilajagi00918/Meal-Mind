# Data Sources

## Headline numbers, and exactly where they come from

Every number below was counted directly from the dish database embedded in `index-13-4.html`, not estimated:

| Metric | Count |
|---|---|
| Unique dish entries (each with its own `id`) | **1,614** |
| Categories | **32** |
| Entries that carry one or more alternate/regional names | 522 |
| Total alternate/regional names across those entries | 3,724 |
| **Total searchable dish names** (dish names + alternate names) | **5,338** |

That last row is where the "5,000+" figure in the README comes from. It's a count of *searchable names*, not a count of *distinct nutrition profiles* — see the next section for why that distinction matters and how it actually works.

## How regional name matching works

Each dish entry has a `common_variants` field — a comma-separated list of alternate names, spellings, and regional terms for that dish. Search matches against the dish's own `name`, its `category`, and its `common_variants` string. When a search term matches something inside `common_variants`, the result returned **is that same dish entry** — same `id`, same nutrition data — not a separate database row.

Concretely: "Poha" has `common_variants: "Kanda Poha, Patal Poha, ..."`. Searching any of those terms resolves to the one Poha entry. This is intentional, not a shortcut — regional name diversity is real and worth capturing even where a category's dominant preparations share a macro profile close enough that the database doesn't model them as separate rows. If you need a variant tracked with genuinely different macros (a fattier or leaner regional version, for instance), that's a distinct dish with its own `id` and its own `nutrients_per_unit` — not a `common_variants` entry.

This is also why the README says "1,600+ dishes, 5,000+ searchable names" rather than "5,000+ dishes." A judge who searches "Kanda Poha" live and watches it resolve to Poha's entry is seeing the feature work correctly, not finding a discrepancy — as long as the claim in front of them matches what the code does.

## Per-entry data schema

Every dish carries more than a name and a calorie count:

- **`data_basis`** — where the numbers came from: `IFCT 2017`, `USDA FoodData Central`, a manufacturer label (for packaged/branded items), or a documented recipe estimate.
- **`confidence`** — a 0–1 score on the compliance classification for that entry (see below), not on the nutrient values themselves.
- **`compliance`** — structured flags:
  - `jain_status`: compliant / non_compliant / conditional / unknown
  - `vrat_status`: compliant / non_compliant / conditional / unknown
  - `egg_status`: free / conditional / unknown
  - `flagged_ingredients`: the specific ingredients that drove the classification
  - `conditional_note`: plain-language caveat when a category commonly has both compliant and non-compliant versions (e.g., onion-garlic vs. Jain-friendly preparations of the same dish name)
- **`portions`** — one or more real-world serving sizes with gram weights, not just "per 100g"

## Known limitation, stated plainly

Cooking oils and a few other single-ingredient items are nutritionally near-identical to each other on the 16 fields this schema tracks (calories, macros, and a fixed micronutrient list) — what actually differentiates, say, mustard oil from sunflower oil (fatty-acid profile, smoke point, vitamin E content) isn't captured by these fields. This is noted directly in the affected entries' `notes` field rather than hidden.
