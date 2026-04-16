# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive reference guide for Pokémon Pokopia's material farming automation system (Litter → Gather → Community Box loop). Built with React + Vite, deployed to GitHub Pages.

Live site: https://drakeaharper.github.io/pokopia_strategies/

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview production build locally

No test framework or linter is configured.

## Architecture

This is a single-component React app with no routing or state management library.

- `src/main.jsx` — entry point, renders `<App />` from `pokopia-litter.jsx`
- `pokopia-litter.jsx` — the entire application in one file:
  - Top-level data constants: `MATERIALS`, `LITTER_POKEMON`, `GATHER_POKEMON`, `CHAINS`, `FARM_SETUPS`, `SPEC_STYLE`
  - Three tab components: `FlowTab` (automation overview + farm setups), `LitterTab` (filterable Pokémon grid), `GatherTab` (gather Pokémon list)
  - Shared UI components: `PokCard`, `SpecBadge`, `SectionLabel`
  - `App` manages tab state and renders the sticky header + selected tab

All styling is inline (no CSS files or CSS-in-JS library). Sprites are loaded from PokeAPI's GitHub-hosted sprite repository via `spriteUrl()`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml` which builds and deploys to GitHub Pages. The Vite `base` is set to `/pokopia_strategies/` in `vite.config.js`.
