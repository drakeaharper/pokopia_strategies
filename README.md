# Pokopia Strategies

Interactive reference guide for material farming automation in [Pokémon Pokopia](https://www.pokemon.com/us/pokemon-news/pokemon-pokopia-arriving-in-2026) (Nintendo Switch 2, March 2026).

**Live site:** https://drakeaharper.github.io/pokopia_strategies/

## What's covered

The guide focuses on the **Litter → Gather → Community Box** automation loop — the core passive farming system in Pokopia. Three tabs:

### Automation Flow
- Visual breakdown of the core loop: Litter Pokémon drop materials → Gather Pokémon collect them → Community Box buffers stock → Processors (Burn/Chop/Recycle/Crush) refine into finished goods
- All material transformation chains (e.g. Iron Ore → Burn → Iron Ingot, Nonburnable Garbage → Recycle → Iron Ore + Paper)
- Four recommended farm setups: Iron Ingot, Honey, Self-Loop Recycling, and Lumber

### Litter Pokémon
- All 21 Litter Pokémon with sprites, filterable by material drop
- 11 material types: Vine Rope, Twine, Fluff, Honey, Small Log, Sturdy Stick, Stone, Iron Ore, Nonburnable Garbage, Squishy Clay, Leaf
- Bonus specialties flagged (e.g. Trubbish has Recycle, Mareep has Generate)

### Gather Pokémon
- All 21 Gather Pokémon with sprites and notes
- Highlights dual-role Pokémon — Machop/Machoke/Machamp have both Gather and Build

## Tech stack

- React + Vite
- Sprites from [PokeAPI](https://github.com/PokeAPI/sprites)
- Deployed to GitHub Pages via Actions

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
