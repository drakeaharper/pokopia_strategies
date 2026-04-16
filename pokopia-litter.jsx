import { useState } from "react";

const MATERIALS = {
  "Vine Rope":           { color: "#4ade80", bg: "#14532d", emoji: "🌿" },
  "Twine":               { color: "#fbbf24", bg: "#451a03", emoji: "🪢" },
  "Fluff":               { color: "#f9a8d4", bg: "#500724", emoji: "🧶" },
  "Honey":               { color: "#fde047", bg: "#422006", emoji: "🍯" },
  "Small Log":           { color: "#d97706", bg: "#431407", emoji: "🪵" },
  "Sturdy Stick":        { color: "#a3e635", bg: "#1a2e05", emoji: "🎍" },
  "Stone":               { color: "#94a3b8", bg: "#0f172a", emoji: "🪨" },
  "Iron Ore":            { color: "#60a5fa", bg: "#172554", emoji: "⛏️" },
  "Nonburnable Garbage": { color: "#c084fc", bg: "#3b0764", emoji: "🗑️" },
  "Squishy Clay":        { color: "#fb923c", bg: "#431407", emoji: "🧱" },
  "Leaf":                { color: "#86efac", bg: "#14532d", emoji: "🍃" },
};

const SPEC_STYLE = {
  Grow:     { bg: "#14532d", text: "#4ade80",  label: "🌱 Grow" },
  Generate: { bg: "#1c1917", text: "#fde047",  label: "⚡ Generate" },
  Recycle:  { bg: "#164e63", text: "#67e8f9",  label: "♻️ Recycle" },
  Bulldoze: { bg: "#431407", text: "#fb923c",  label: "🔨 Bulldoze" },
  Burn:     { bg: "#450a0a", text: "#f87171",  label: "🔥 Burn" },
  Build:    { bg: "#1e1b4b", text: "#a5b4fc",  label: "🏗️ Build" },
  Water:    { bg: "#172554", text: "#93c5fd",  label: "💧 Water" },
  Litter:   { bg: "#3b0764", text: "#c084fc",  label: "💫 Litter" },
};

const LITTER_POKEMON = [
  { name: "Bellsprout",     id: 69,    drop: "Vine Rope",           extras: ["Grow"] },
  { name: "Weepinbell",     id: 70,    drop: "Vine Rope",           extras: ["Grow"] },
  { name: "Venusaur",       id: 3,     drop: "Leaf",                extras: [] },
  { name: "Tangrowth",      id: 465,   drop: "Leaf",                extras: ["Grow"] },
  { name: "Spinarak",       id: 167,   drop: "Twine",               extras: [] },
  { name: "Ariados",        id: 168,   drop: "Twine",               extras: [] },
  { name: "Larvesta",       id: 636,   drop: "Twine",               extras: ["Burn"] },
  { name: "Combee",         id: 415,   drop: "Honey",               extras: [] },
  { name: "Haxorus",        id: 612,   drop: "Small Log",           extras: [] },
  { name: "Cacturne",       id: 332,   drop: "Sturdy Stick",        extras: [] },
  { name: "Mareep",         id: 179,   drop: "Fluff",               extras: ["Generate"] },
  { name: "Flaaffy",        id: 180,   drop: "Fluff",               extras: ["Generate"] },
  { name: "Bastiodon",      id: 411,   drop: "Stone",               extras: [] },
  { name: "Tyrantrum",      id: 697,   drop: "Stone",               extras: [] },
  { name: "Glimmet",        id: 970,   drop: "Iron Ore",            extras: [] },
  { name: "Glimmora",       id: 971,   drop: "Iron Ore",            extras: [] },
  { name: "Grimer",         id: 88,    drop: "Nonburnable Garbage", extras: [] },
  { name: "Muk",            id: 89,    drop: "Nonburnable Garbage", extras: [] },
  { name: "Trubbish",       id: 568,   drop: "Nonburnable Garbage", extras: ["Recycle"] },
  { name: "Garbodor",       id: 569,   drop: "Nonburnable Garbage", extras: ["Recycle"] },
  { name: "Paldean Wooper", id: 10253, drop: "Squishy Clay",        extras: [] },
  { name: "Clodsire",       id: 980,   drop: "Squishy Clay",        extras: ["Bulldoze"] },
];

const GATHER_POKEMON = [
  { name: "Machop",    id: 66,  extras: ["Build"], note: "Earliest — great dual role" },
  { name: "Machoke",   id: 67,  extras: ["Build"], note: "Build + Gather combo" },
  { name: "Machamp",   id: 68,  extras: ["Build"], note: "Best Build + Gather" },
  { name: "Minccino",  id: 572, extras: [],        note: "Easy early option" },
  { name: "Cinccino",  id: 573, extras: [],        note: "" },
  { name: "Gastly",    id: 92,  extras: [],        note: "" },
  { name: "Mismagius", id: 429, extras: [],        note: "" },
  { name: "Mr. Mime",  id: 122, extras: [],        note: "" },
  { name: "Mime Jr.",  id: 439, extras: [],        note: "" },
  { name: "Espeon",    id: 196, extras: [],        note: "" },
  { name: "Girafarig", id: 203, extras: [],        note: "" },
  { name: "Farigiraf", id: 981, extras: [],        note: "" },
  { name: "Duskull",   id: 355, extras: [],        note: "" },
  { name: "Dusclops",  id: 356, extras: [],        note: "" },
  { name: "Dusknoir",  id: 477, extras: [],        note: "" },
  { name: "Dreepy",    id: 885, extras: [],        note: "" },
  { name: "Drakloak",  id: 886, extras: [],        note: "" },
  { name: "Dragapult", id: 887, extras: [],        note: "" },
  { name: "Rolycoly",  id: 837, extras: [],        note: "" },
  { name: "Carkol",    id: 838, extras: [],        note: "" },
  { name: "Coalossal", id: 839, extras: [],        note: "" },
];

const CHAINS = [
  { from: "Nonburnable Garbage", via: "Recycle",   to: ["Iron Ore", "Paper"],  special: true,  note: "Trubbish/Garbodor self-supply this whole chain ⭐" },
  { from: "Small Log",           via: "Chop",      to: ["Lumber"],             special: false, note: "Lumber is essential for building" },
  { from: "Squishy Clay",        via: "Burn",      to: ["Bricks"],             special: false, note: "Fire-types bake clay into bricks" },
  { from: "Stone",               via: "Crush",     to: ["Concrete"],           special: false, note: "Heavy Pokémon crush stone" },
  { from: "Iron Ore",            via: "Burn",      to: ["Iron Ingot"],         special: false, note: "Smelted at a Furnace" },
  { from: "Honey",               via: "Vespiquen", to: ["Rare Furniture"],     special: false, note: "Trade for exclusive items" },
];

const CYCLES = [
  {
    name: "⛏️ Iron Ingot Cycle",
    color: "#60a5fa", bg: "#172554",
    summary: "Smelt Iron Ore into Iron Ingots",
    pipeline: [
      { icon: "⛏️", label: "Glimmet / Glimmora", role: "Litter → Iron Ore" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect ore from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer raw Iron Ore" },
      { icon: "🤲", label: "Gather Pokémon", role: "Deliver ore to furnace" },
      { icon: "🔥", label: "Smelting Furnace", role: "Burn Pokémon smelts ore" },
      { icon: "✅", label: "Iron Ingots", role: "Collect from furnace output" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Litter Pokémon (Glimmet/Glimmora)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Place between habitats and furnace" },
      { name: "Smelting Furnace", icon: "🔥", cost: "20 Stone, 10 Iron Ore, 5 Bricks", unlock: "Unlocked via quest", note: "Processes ore into ingots" },
    ],
    pokemon: [
      { name: "Glimmet", id: 970, role: "Litter", count: "2–3", habitat: "House near Community Box" },
      { name: "Glimmora", id: 971, role: "Litter", count: "1–2", habitat: "House near Community Box" },
      { name: "Machop", id: 66, role: "Gather + Build", count: "2–3", habitat: "House between box & furnace" },
      { name: "Charmander", id: 4, role: "Burn (smelting)", count: "1", habitat: "Near Smelting Furnace" },
    ],
    layout: "Place the Community Box centrally between the Litter habitat and the Smelting Furnace. Keep Gather Pokémon housed in range of both. The furnace should be within ~8 tiles of the box for efficient delivery.",
    grid: {
      rows: 5, cols: 7,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Litter", color: "#60a5fa" },
        { r: 0, c: 1, icon: "⛏️", label: "Glimmet", color: "#60a5fa" },
        { r: 1, c: 0, icon: "⛏️", label: "Glimmora", color: "#60a5fa" },
        { r: 2, c: 3, icon: "📦", label: "Box", color: "#fde047" },
        { r: 1, c: 3, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 2, c: 4, icon: "🤲", label: "Machop", color: "#67e8f9" },
        { r: 4, c: 5, icon: "🔥", label: "Furnace", color: "#fb923c" },
        { r: 4, c: 6, icon: "✅", label: "Output", color: "#4ade80" },
      ],
    },
  },
  {
    name: "🍯 Honey Cycle",
    color: "#fde047", bg: "#422006",
    summary: "Produce Honey and trade for rare furniture",
    pipeline: [
      { icon: "🐝", label: "Combee", role: "Litter → Honey" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect honey from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer Honey" },
      { icon: "🎭", label: "Vespiquen", role: "Trade Honey → Rare Furniture" },
      { icon: "✅", label: "Exclusive furniture", role: "Collect from Vespiquen" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Combee (Litter)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Place near Combee habitat" },
      { name: "Vespiquen Trade Post", icon: "🎭", cost: "10 Lumber, 10 Honey, 5 Fluff", unlock: "Unlocked via quest", note: "Vespiquen exchanges honey for furniture" },
    ],
    pokemon: [
      { name: "Combee", id: 415, role: "Litter", count: "3–4", habitat: "House near Community Box" },
      { name: "Gastly", id: 92, role: "Gather", count: "2", habitat: "House near box & trade post" },
      { name: "Dreepy", id: 885, role: "Gather", count: "1–2", habitat: "House near box & trade post" },
    ],
    layout: "Combee habitat should be close to the Community Box. Place the Vespiquen Trade Post within delivery range of your Gather Pokémon. This is a simpler cycle — no processing station needed beyond the trade post.",
    grid: {
      rows: 4, cols: 6,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Litter", color: "#fde047" },
        { r: 0, c: 1, icon: "🐝", label: "Combee", color: "#fde047" },
        { r: 1, c: 1, icon: "🐝", label: "Combee", color: "#fde047" },
        { r: 1, c: 3, icon: "📦", label: "Box", color: "#fde047" },
        { r: 0, c: 3, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 1, c: 4, icon: "🤲", label: "Gastly", color: "#67e8f9" },
        { r: 3, c: 5, icon: "🎭", label: "Trade", color: "#c084fc" },
      ],
    },
  },
  {
    name: "♻️ Self-Loop: Paper + Iron Ore",
    color: "#c084fc", bg: "#3b0764",
    summary: "Trubbish/Garbodor supply AND recycle their own garbage",
    pipeline: [
      { icon: "🗑️", label: "Trubbish / Garbodor", role: "Litter → Nonburnable Garbage" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect garbage from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer garbage" },
      { icon: "♻️", label: "Trubbish / Garbodor", role: "Recycle → Iron Ore + Paper" },
      { icon: "✅", label: "Iron Ore + Paper", role: "Dual output, fully self-contained" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Trubbish/Garbodor (dual role)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Central hub for garbage buffering" },
      { name: "Recycling Station", icon: "♻️", cost: "15 Stone, 10 Iron Ore, 5 Paper", unlock: "Unlocked via quest", note: "Where Recycle spec Pokémon process garbage" },
    ],
    pokemon: [
      { name: "Trubbish", id: 568, role: "Litter + Recycle", count: "2–3", habitat: "House near box & recycler" },
      { name: "Garbodor", id: 569, role: "Litter + Recycle", count: "1–2", habitat: "House near box & recycler" },
      { name: "Minccino", id: 572, role: "Gather", count: "2", habitat: "House between habitats & box" },
    ],
    layout: "This cycle is unique — Trubbish/Garbodor serve double duty as both Litter AND Recycle Pokémon. Place their habitat near both the Community Box and Recycling Station. Gather Pokémon shuttle garbage between them. Fully self-contained loop — no external inputs needed!",
    grid: {
      rows: 5, cols: 6,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Dual Role", color: "#c084fc" },
        { r: 0, c: 1, icon: "🗑️", label: "Trubbish", color: "#c084fc" },
        { r: 1, c: 1, icon: "🗑️", label: "Garbodor", color: "#c084fc" },
        { r: 2, c: 3, icon: "📦", label: "Box", color: "#fde047" },
        { r: 1, c: 3, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 2, c: 4, icon: "🤲", label: "Minccino", color: "#67e8f9" },
        { r: 4, c: 5, icon: "♻️", label: "Recycler", color: "#4ade80" },
      ],
    },
  },
  {
    name: "🪵 Lumber Cycle",
    color: "#d97706", bg: "#431407",
    summary: "Chop Small Logs into Lumber for building",
    pipeline: [
      { icon: "🪵", label: "Haxorus", role: "Litter → Small Logs" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect logs from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer Small Logs" },
      { icon: "🤲", label: "Gather Pokémon", role: "Deliver logs to sawmill" },
      { icon: "🌲", label: "Scyther / Farfetch'd", role: "Chop → Lumber" },
      { icon: "✅", label: "Lumber ready", role: "Essential building material" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Haxorus (Litter)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Place between habitat and sawmill" },
      { name: "Sawmill", icon: "🌲", cost: "20 Lumber, 10 Stone, 5 Iron Ingot", unlock: "Unlocked via quest", note: "Chop-spec Pokémon process logs here" },
    ],
    pokemon: [
      { name: "Haxorus", id: 612, role: "Litter", count: "2–3", habitat: "House near Community Box" },
      { name: "Machoke", id: 67, role: "Gather + Build", count: "2", habitat: "House between box & sawmill" },
      { name: "Scyther", id: 123, role: "Chop", count: "1–2", habitat: "Near Sawmill" },
    ],
    layout: "Linear layout works best: Haxorus habitat → Community Box → Sawmill. Gather Pokémon (ideally Machop line for dual Build utility) shuttle logs from box to sawmill. Keep the sawmill at the end of the chain.",
    grid: {
      rows: 4, cols: 7,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Litter", color: "#d97706" },
        { r: 0, c: 1, icon: "🪵", label: "Haxorus", color: "#d97706" },
        { r: 1, c: 1, icon: "🪵", label: "Haxorus", color: "#d97706" },
        { r: 1, c: 3, icon: "📦", label: "Box", color: "#fde047" },
        { r: 0, c: 3, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 1, c: 4, icon: "🤲", label: "Machoke", color: "#67e8f9" },
        { r: 3, c: 6, icon: "🌲", label: "Sawmill", color: "#4ade80" },
      ],
    },
  },
  {
    name: "🧱 Brick Cycle",
    color: "#fb923c", bg: "#431407",
    summary: "Bake Squishy Clay into Bricks",
    pipeline: [
      { icon: "🧱", label: "Paldean Wooper / Clodsire", role: "Litter → Squishy Clay" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect clay from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer Squishy Clay" },
      { icon: "🤲", label: "Gather Pokémon", role: "Deliver clay to furnace" },
      { icon: "🔥", label: "Smelting Furnace", role: "Burn Pokémon bakes clay" },
      { icon: "✅", label: "Bricks", role: "Used in advanced buildings" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Wooper/Clodsire (Litter)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Central buffer for clay" },
      { name: "Smelting Furnace", icon: "🔥", cost: "20 Stone, 10 Iron Ore, 5 Bricks", unlock: "Unlocked via quest", note: "Shared with Iron Ingot cycle if nearby" },
    ],
    pokemon: [
      { name: "Paldean Wooper", id: 10253, role: "Litter", count: "2–3", habitat: "House near Community Box" },
      { name: "Clodsire", id: 980, role: "Litter + Bulldoze", count: "1–2", habitat: "House near Community Box" },
      { name: "Machamp", id: 68, role: "Gather + Build", count: "2", habitat: "House between box & furnace" },
      { name: "Torchic", id: 255, role: "Burn (baking)", count: "1", habitat: "Near Smelting Furnace" },
    ],
    layout: "Similar layout to Iron Ingot — place Community Box between the clay Litter habitat and the Smelting Furnace. Pro tip: If you already have an Iron Ingot cycle, you can share the same furnace and Gather Pokémon by placing clay Pokémon in range of the same Community Box.",
    grid: {
      rows: 5, cols: 7,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Litter", color: "#fb923c" },
        { r: 0, c: 1, icon: "🧱", label: "Wooper", color: "#fb923c" },
        { r: 1, c: 0, icon: "🧱", label: "Clodsire", color: "#fb923c" },
        { r: 2, c: 3, icon: "📦", label: "Box", color: "#fde047" },
        { r: 1, c: 3, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 2, c: 4, icon: "🤲", label: "Machamp", color: "#67e8f9" },
        { r: 4, c: 5, icon: "🔥", label: "Furnace", color: "#f87171" },
        { r: 4, c: 6, icon: "✅", label: "Output", color: "#4ade80" },
      ],
    },
  },
  {
    name: "🪨 Concrete Cycle",
    color: "#94a3b8", bg: "#0f172a",
    summary: "Crush Stone into Concrete",
    pipeline: [
      { icon: "🪨", label: "Bastiodon / Tyrantrum", role: "Litter → Stone" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect stone from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer Stone" },
      { icon: "🤲", label: "Gather Pokémon", role: "Deliver to crusher" },
      { icon: "🔨", label: "Crusher Station", role: "Heavy Pokémon crush stone" },
      { icon: "✅", label: "Concrete", role: "Used for roads and structures" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Bastiodon/Tyrantrum (Litter)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Place centrally" },
      { name: "Crusher Station", icon: "🔨", cost: "25 Stone, 10 Iron Ingot, 5 Bricks", unlock: "Unlocked via quest", note: "Heavy Pokémon crush stone here" },
    ],
    pokemon: [
      { name: "Bastiodon", id: 411, role: "Litter", count: "2–3", habitat: "House near Community Box" },
      { name: "Tyrantrum", id: 697, role: "Litter", count: "1–2", habitat: "House near Community Box" },
      { name: "Machamp", id: 68, role: "Gather + Build", count: "2–3", habitat: "House between box & crusher" },
    ],
    layout: "Straightforward chain: Stone Litter habitat → Community Box → Crusher Station. Machamp line is ideal here for Gather + Build dual role. The Crusher Station tends to be large, so plan extra space at the end of the chain.",
    grid: {
      rows: 5, cols: 7,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Litter", color: "#94a3b8" },
        { r: 0, c: 1, icon: "🪨", label: "Bastiodon", color: "#94a3b8" },
        { r: 1, c: 0, icon: "🪨", label: "Tyrantrum", color: "#94a3b8" },
        { r: 2, c: 3, icon: "📦", label: "Box", color: "#fde047" },
        { r: 1, c: 3, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 2, c: 4, icon: "🤲", label: "Machamp", color: "#67e8f9" },
        { r: 4, c: 6, icon: "🔨", label: "Crusher", color: "#fb923c" },
      ],
    },
  },
  {
    name: "🧶 Fluff & Twine Cycle",
    color: "#f9a8d4", bg: "#500724",
    summary: "Farm Fluff and Twine for crafting",
    pipeline: [
      { icon: "🧶", label: "Mareep / Flaaffy", role: "Litter → Fluff" },
      { icon: "🪢", label: "Spinarak / Ariados", role: "Litter → Twine" },
      { icon: "🤲", label: "Gather Pokémon", role: "Collect materials from ground" },
      { icon: "📦", label: "Community Box", role: "Buffer Fluff & Twine" },
      { icon: "✅", label: "Crafting materials", role: "Used for furniture & decorations" },
    ],
    buildings: [
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Mareep/Flaaffy (Fluff)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Spinarak/Ariados (Twine)" },
      { name: "Pokémon House", icon: "🏠", cost: "10 Lumber, 5 Stone", unlock: "Story progression", note: "Houses Gather Pokémon" },
      { name: "Community Box", icon: "📦", cost: "15 Lumber, 5 Iron Ingot", unlock: "After building tutorial", note: "Place centrally between both habitats" },
    ],
    pokemon: [
      { name: "Mareep", id: 179, role: "Litter + Generate", count: "2–3", habitat: "House near Community Box" },
      { name: "Flaaffy", id: 180, role: "Litter + Generate", count: "1–2", habitat: "House near Community Box" },
      { name: "Spinarak", id: 167, role: "Litter", count: "2–3", habitat: "House near Community Box" },
      { name: "Ariados", id: 168, role: "Litter", count: "1–2", habitat: "House near Community Box" },
      { name: "Cinccino", id: 573, role: "Gather", count: "2–3", habitat: "House near box" },
    ],
    layout: "No processing station needed — this is a pure collection cycle. Place both Litter habitats flanking a central Community Box so Gather Pokémon can cover both. Mareep/Flaaffy also have the Generate specialty, giving bonus electricity if you need it.",
    grid: {
      rows: 4, cols: 5,
      cells: [
        { r: 0, c: 0, icon: "🏠", label: "Fluff", color: "#f9a8d4" },
        { r: 0, c: 1, icon: "🧶", label: "Mareep", color: "#f9a8d4" },
        { r: 1, c: 0, icon: "🧶", label: "Flaaffy", color: "#f9a8d4" },
        { r: 2, c: 2, icon: "📦", label: "Box", color: "#fde047" },
        { r: 1, c: 2, icon: "🏠", label: "Gather", color: "#67e8f9" },
        { r: 2, c: 3, icon: "🤲", label: "Cinccino", color: "#67e8f9" },
        { r: 3, c: 4, icon: "🏠", label: "Twine", color: "#fbbf24" },
        { r: 3, c: 3, icon: "🪢", label: "Spinarak", color: "#fbbf24" },
      ],
    },
  },
];

const FARM_SETUPS = [
  {
    name: "⛏️ Iron Ingot Farm",
    color: "#60a5fa", bg: "#172554",
    steps: [
      { icon: "⛏️", label: "Glimmet / Glimmora",   role: "Litter → Iron Ore" },
      { icon: "🤲", label: "Machop / Minccino",     role: "Gather → Community Box" },
      { icon: "📦", label: "Community Box",          role: "Buffers Iron Ore" },
      { icon: "🔥", label: "Charmander / Torchic",  role: "Burn → Smelt at Furnace" },
      { icon: "✅", label: "Iron Ingots ready",      role: "" },
    ],
  },
  {
    name: "🍯 Honey Farm",
    color: "#fde047", bg: "#422006",
    steps: [
      { icon: "🐝", label: "Combee",                role: "Litter → Honey" },
      { icon: "🤲", label: "Gastly / Dreepy",       role: "Gather → Community Box" },
      { icon: "📦", label: "Community Box",          role: "Buffers Honey" },
      { icon: "🎭", label: "Vespiquen",              role: "Trade Honey → Rare Furniture" },
      { icon: "✅", label: "Exclusive furniture",   role: "" },
    ],
  },
  {
    name: "♻️ Self-Loop: Paper + Iron Ore",
    color: "#c084fc", bg: "#3b0764",
    steps: [
      { icon: "🗑️", label: "Trubbish / Garbodor",  role: "Litter → Nonburnable Garbage" },
      { icon: "🤲", label: "Any Gather Pokémon",    role: "Gather → Community Box" },
      { icon: "📦", label: "Community Box",          role: "Buffers garbage" },
      { icon: "♻️", label: "Trubbish / Garbodor",  role: "Recycle → Iron Ore + Paper" },
      { icon: "✅", label: "Fully self-contained!", role: "" },
    ],
  },
  {
    name: "🪵 Lumber Farm",
    color: "#d97706", bg: "#431407",
    steps: [
      { icon: "🪵", label: "Haxorus",               role: "Litter → Small Logs" },
      { icon: "🤲", label: "Machop / Cinccino",     role: "Gather → Community Box" },
      { icon: "📦", label: "Community Box",          role: "Buffers Small Logs" },
      { icon: "🌲", label: "Scyther / Farfetch'd",  role: "Chop → Lumber" },
      { icon: "✅", label: "Lumber for building",   role: "" },
    ],
  },
];

const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

function SpecBadge({ spec, small }) {
  const s = SPEC_STYLE[spec] ?? { bg: "#1e293b", text: "#94a3b8", label: spec };
  return (
    <span style={{
      fontSize: small ? 9 : 10, background: s.bg, color: s.text,
      padding: small ? "1px 5px" : "2px 7px", borderRadius: 999,
      fontWeight: 700, border: `1px solid ${s.text}44`, whiteSpace: "nowrap",
    }}>{s.label}</span>
  );
}

function PokCard({ mon, accentColor, accentBg, tag }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `linear-gradient(135deg,${accentBg},#1e293b)` : "#111827",
        border: hov ? `1.5px solid ${accentColor}99` : "1.5px solid #1e293b",
        borderRadius: 14, padding: "12px 12px 10px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        width: 118, transition: "all 0.18s", cursor: "default",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 20px ${accentColor}22` : "none",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0f172a", borderRadius: 10, border: "1px solid #1e293b",
      }}>
        <img src={spriteUrl(mon.id)} alt={mon.name}
          style={{ width: 50, height: 50, imageRendering: "pixelated" }}
          onError={(e) => { e.target.style.display = "none"; }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, textAlign: "center", color: "#cbd5e1", lineHeight: 1.2 }}>
        {mon.name}
      </span>
      {tag && (
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
          background: accentBg, color: accentColor, border: `1px solid ${accentColor}55`,
        }}>{tag}</span>
      )}
      {mon.extras?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
          {mon.extras.map((s) => <SpecBadge key={s} spec={s} small />)}
        </div>
      )}
      {mon.note && (
        <span style={{ fontSize: 9, color: "#64748b", textAlign: "center", lineHeight: 1.3, fontStyle: "italic" }}>
          {mon.note}
        </span>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", margin: "0 0 12px",
      letterSpacing: 1.5, textTransform: "uppercase" }}>{children}</p>
  );
}

// ── TABS ──────────────────────────────────────────────────────────────────────

function FlowTab() {
  return (
    <div>
      {/* Core loop */}
      <div style={{ background: "#0d1117", border: "1px solid #334155", borderRadius: 18, padding: "20px 22px", marginBottom: 24 }}>
        <SectionLabel>The Core Automation Loop</SectionLabel>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, overflowX: "auto", paddingBottom: 6 }}>
          {[
            { icon: "💫", label: "Litter Pokémon",  sub: "Drops materials passively",      color: "#c084fc", bg: "#3b0764" },
            { arrow: true, label: "falls to ground" },
            { icon: "🤲", label: "Gather Pokémon",  sub: "Picks up items from the ground", color: "#67e8f9", bg: "#164e63" },
            { arrow: true, label: "deposits into" },
            { icon: "📦", label: "Community Box",   sub: "Two-way shared storage buffer",  color: "#fde047", bg: "#422006", glow: true },
            { arrow: true, label: "Gather fetches & delivers to" },
            { icon: "⚙️", label: "Processor",       sub: "Burn / Chop / Recycle converts", color: "#fb923c", bg: "#431407" },
            { arrow: true, label: "finished goods" },
            { icon: "✅", label: "You Collect",     sub: "From box or workbench",          color: "#4ade80", bg: "#14532d" },
          ].map((n, i) => n.arrow ? (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 6px", minWidth: 64 }}>
              <span style={{ fontSize: 18, color: "#334155" }}>→</span>
              <span style={{ fontSize: 9, color: "#475569", textAlign: "center", lineHeight: 1.3, marginTop: 2 }}>{n.label}</span>
            </div>
          ) : (
            <div key={i} style={{
              background: n.bg, border: `1.5px solid ${n.color}55`, borderRadius: 12,
              padding: "12px 14px", display: "flex", flexDirection: "column", alignItems: "center",
              gap: 5, minWidth: 108, textAlign: "center",
              boxShadow: n.glow ? `0 0 24px ${n.color}44` : "none",
            }}>
              <span style={{ fontSize: 22 }}>{n.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: n.color }}>{n.label}</span>
              <span style={{ fontSize: 9, color: "#94a3b8", lineHeight: 1.4 }}>{n.sub}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: "10px 14px", background: "#111827", borderRadius: 10, border: "1px solid #1e293b" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.7 }}>
            💡 <strong style={{ color: "#94a3b8" }}>Pro tip:</strong> The Community Box is bidirectional —
            Gather Pokémon deposit Litter drops <em>into</em> it, then retrieve materials <em>from</em> it
            and carry them to a nearby Smelting Furnace or other processor. Place your box between habitats
            and the processor to maximize coverage range.
          </p>
        </div>
      </div>

      {/* Material chains */}
      <div style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 18, padding: "20px 22px", marginBottom: 24 }}>
        <SectionLabel>Material Transformation Chains</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CHAINS.map((c) => {
            const fm = MATERIALS[c.from];
            return (
              <div key={c.from} style={{
                display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
                padding: "10px 14px",
                background: c.special ? "#1a0a2e" : "#111827",
                border: c.special ? "1px solid #7c3aed55" : "1px solid #1e293b",
                borderRadius: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: fm?.bg, color: fm?.color, border: `1px solid ${fm?.color}44` }}>
                  {fm?.emoji} {c.from}
                </span>
                <span style={{ color: "#475569" }}>→</span>
                <span style={{ fontSize: 11, color: "#a78bfa", background: "#1e1b4b", padding: "3px 9px", borderRadius: 999, fontWeight: 600, border: "1px solid #4c1d9555" }}>
                  {c.via}
                </span>
                <span style={{ color: "#475569" }}>→</span>
                {c.to.map((t) => {
                  const tm = MATERIALS[t];
                  return (
                    <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: tm?.bg ?? "#172554", color: tm?.color ?? "#60a5fa", border: `1px solid ${tm?.color ?? "#60a5fa"}44` }}>
                      {tm?.emoji ?? "✨"} {t}
                    </span>
                  );
                })}
                <span style={{ marginLeft: "auto", fontSize: 10, fontStyle: "italic", color: c.special ? "#c084fc" : "#475569" }}>
                  {c.note}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farm setups */}
      <SectionLabel>Recommended Farm Setups</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
        {FARM_SETUPS.map((setup) => (
          <div key={setup.name} style={{ background: "#0d1117", border: `1px solid ${setup.color}44`, borderRadius: 14, padding: "16px 18px" }}>
            <p style={{ fontWeight: 700, color: setup.color, fontSize: 13, margin: "0 0 12px" }}>{setup.name}</p>
            {setup.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 18 }}>
                  <span style={{ fontSize: 13 }}>{step.icon}</span>
                  {i < setup.steps.length - 1 && <div style={{ width: 1, height: 12, background: "#1e293b", margin: "2px 0" }} />}
                </div>
                <div style={{ paddingBottom: i < setup.steps.length - 1 ? 2 : 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#e2e8f0" }}>{step.label}</span>
                  {step.role && <span style={{ fontSize: 10, color: "#64748b", marginLeft: 5 }}>{step.role}</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LitterTab() {
  const [filter, setFilter] = useState("All");
  const all = ["All", ...Object.keys(MATERIALS)];
  const filtered = filter === "All" ? LITTER_POKEMON : LITTER_POKEMON.filter((p) => p.drop === filter);
  const grouped = Object.keys(MATERIALS).reduce((acc, m) => {
    const g = filtered.filter((p) => p.drop === m);
    if (g.length) acc[m] = g;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {all.map((m) => {
          const mat = MATERIALS[m];
          const active = filter === m;
          return (
            <button key={m} onClick={() => setFilter(m)} style={{
              padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer",
              border: active ? `1.5px solid ${mat?.color ?? "#7c3aed"}` : "1.5px solid #334155",
              background: active ? (mat?.bg ?? "#1e1b4b") : "transparent",
              color: active ? (mat?.color ?? "#a78bfa") : "#64748b",
              transition: "all 0.15s",
            }}>
              {mat ? `${mat.emoji} ${m}` : "⚡ All"}
            </button>
          );
        })}
      </div>
      {Object.entries(grouped).map(([material, mons]) => {
        const mat = MATERIALS[material];
        return (
          <div key={material} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${mat.color}44` }}>
              <span style={{ fontSize: 18 }}>{mat.emoji}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: mat.color }}>{material}</span>
              <span style={{ fontSize: 11, background: mat.bg, color: mat.color, padding: "2px 8px", borderRadius: 999, border: `1px solid ${mat.color}55` }}>
                {mons.length} Pokémon
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {mons.map((mon) => {
                const m = MATERIALS[mon.drop];
                return <PokCard key={mon.name} mon={mon} accentColor={m.color} accentBg={m.bg} tag={`${m.emoji} ${mon.drop}`} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GatherTab() {
  return (
    <div>
      <div style={{ background: "#0d1117", border: "1px solid #164e63", borderRadius: 14, padding: "14px 18px", marginBottom: 22 }}>
        <p style={{ margin: "0 0 8px", fontSize: 13, color: "#67e8f9", fontWeight: 700 }}>🤲 How Gather works</p>
        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
          Gather Pokémon roam passively and pick up any items on the ground near their habitat, depositing them into the nearest{" "}
          <strong style={{ color: "#fde047" }}>Community Box</strong>. They also work in reverse — retrieving raw materials from the box
          and delivering them to nearby processing stations like the <strong style={{ color: "#fb923c" }}>Smelting Furnace</strong>.
          Keep Gather Pokémon off your active party so they have uninterrupted free time to work.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
        {GATHER_POKEMON.map((mon) => (
          <PokCard key={mon.name} mon={mon} accentColor="#67e8f9" accentBg="#164e63" tag="🤲 Gather" />
        ))}
      </div>

      <div style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 14, padding: "16px 20px" }}>
        <SectionLabel>Gather Pokémon with bonus specialties</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {GATHER_POKEMON.filter((m) => m.extras.length > 0).map((mon) => (
            <div key={mon.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#111827", borderRadius: 999, border: "1px solid #1e293b" }}>
              <img src={spriteUrl(mon.id)} alt={mon.name} style={{ width: 22, height: 22, imageRendering: "pixelated" }}
                onError={(e) => { e.target.style.display = "none"; }} />
              <span style={{ fontSize: 11, color: "#e2e8f0", fontWeight: 600 }}>{mon.name}</span>
              {mon.extras.map((s) => <SpecBadge key={s} spec={s} small />)}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 10, color: "#475569", margin: "10px 0 0", lineHeight: 1.6 }}>
          Machop, Machoke, and Machamp are the standout picks: Gather passively and Build structures,
          effectively filling two roster slots in one Pokémon.
        </p>
      </div>
    </div>
  );
}

function LayoutGrid({ grid, accentColor }) {
  const cellSize = 52;
  const gap = 2;
  const cellMap = {};
  grid.cells.forEach((cell) => { cellMap[`${cell.r}-${cell.c}`] = cell; });

  return (
    <div style={{
      display: "inline-grid",
      gridTemplateColumns: `repeat(${grid.cols}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${grid.rows}, ${cellSize}px)`,
      gap,
      background: "#0a0a0f",
      border: `1px solid ${accentColor}33`,
      borderRadius: 10,
      padding: 8,
    }}>
      {Array.from({ length: grid.rows * grid.cols }).map((_, idx) => {
        const r = Math.floor(idx / grid.cols);
        const c = idx % grid.cols;
        const cell = cellMap[`${r}-${c}`];
        return (
          <div key={idx} style={{
            width: cellSize, height: cellSize,
            background: cell ? `${cell.color}18` : "#111827",
            border: cell ? `1.5px solid ${cell.color}66` : "1px solid #1e293b44",
            borderRadius: 6,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 1,
          }}>
            {cell && <>
              <span style={{ fontSize: 14, lineHeight: 1 }}>{cell.icon}</span>
              <span style={{ fontSize: 7, fontWeight: 700, color: cell.color, textAlign: "center", lineHeight: 1.1 }}>
                {cell.label}
              </span>
            </>}
          </div>
        );
      })}
    </div>
  );
}

function CyclesTab() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <div style={{ background: "#0d1117", border: "1px solid #334155", borderRadius: 14, padding: "14px 18px", marginBottom: 22 }}>
        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
          Each cycle is a complete material pipeline — from Litter source to finished product.
          Click a cycle to see buildings required, Pokémon assignments, and a suggested placement grid.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CYCLES.map((cycle, ci) => {
          const isOpen = expanded === ci;
          return (
            <div key={cycle.name} style={{
              background: "#0d1117",
              border: `1px solid ${isOpen ? cycle.color + "88" : cycle.color + "44"}`,
              borderRadius: 16,
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}>
              {/* Header — always visible */}
              <div
                onClick={() => setExpanded(isOpen ? null : ci)}
                style={{
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12,
                  background: isOpen ? `${cycle.bg}` : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: cycle.color, flex: 1 }}>
                  {cycle.name}
                </span>
                <span style={{
                  fontSize: 10, color: "#94a3b8", background: "#111827",
                  padding: "3px 10px", borderRadius: 999, border: "1px solid #1e293b",
                }}>
                  {cycle.summary}
                </span>
                <span style={{ fontSize: 14, color: "#64748b", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>
                  ▼
                </span>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div style={{ padding: "0 20px 20px" }}>
                  {/* Pipeline */}
                  <div style={{ marginBottom: 20 }}>
                    <SectionLabel>Pipeline</SectionLabel>
                    <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                      {cycle.pipeline.map((step, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                          <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            gap: 3, padding: "8px 10px", minWidth: 80, textAlign: "center",
                            background: "#111827", borderRadius: 10, border: "1px solid #1e293b",
                          }}>
                            <span style={{ fontSize: 16 }}>{step.icon}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#e2e8f0" }}>{step.label}</span>
                            <span style={{ fontSize: 9, color: "#64748b", lineHeight: 1.3 }}>{step.role}</span>
                          </div>
                          {i < cycle.pipeline.length - 1 && (
                            <span style={{ fontSize: 14, color: "#334155", padding: "0 4px" }}>→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two-column: Grid + Buildings */}
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
                    {/* Layout Grid */}
                    {cycle.grid && (
                      <div style={{ flex: "0 0 auto" }}>
                        <SectionLabel>Suggested Layout</SectionLabel>
                        <LayoutGrid grid={cycle.grid} accentColor={cycle.color} />
                        <p style={{ fontSize: 9, color: "#475569", margin: "8px 0 0", maxWidth: 300, lineHeight: 1.5 }}>
                          {cycle.layout}
                        </p>
                      </div>
                    )}

                    {/* Buildings */}
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <SectionLabel>Buildings Required</SectionLabel>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {cycle.buildings.map((b, i) => (
                          <div key={i} style={{
                            display: "flex", alignItems: "flex-start", gap: 10,
                            padding: "10px 14px", background: "#111827",
                            borderRadius: 10, border: "1px solid #1e293b",
                          }}>
                            <span style={{ fontSize: 18, flexShrink: 0 }}>{b.icon}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0" }}>{b.name}</span>
                                <span style={{
                                  fontSize: 9, padding: "2px 7px", borderRadius: 999,
                                  background: "#1e1b4b", color: "#a5b4fc", border: "1px solid #4c1d9555",
                                }}>
                                  {b.cost}
                                </span>
                              </div>
                              <div style={{ fontSize: 9, color: "#64748b", marginTop: 3, lineHeight: 1.4 }}>
                                {b.note}
                                {b.unlock && <span style={{ color: "#475569" }}> · {b.unlock}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pokémon Assignments */}
                  <div>
                    <SectionLabel>Pokémon Assignments</SectionLabel>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {cycle.pokemon.map((mon) => (
                        <div key={`${mon.name}-${mon.role}`} style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "8px 14px", background: "#111827",
                          borderRadius: 12, border: "1px solid #1e293b",
                          minWidth: 220,
                        }}>
                          <div style={{
                            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "#0f172a", borderRadius: 8, border: "1px solid #1e293b", flexShrink: 0,
                          }}>
                            <img src={spriteUrl(mon.id)} alt={mon.name}
                              style={{ width: 30, height: 30, imageRendering: "pixelated" }}
                              onError={(e) => { e.target.style.display = "none"; }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0" }}>{mon.name}</div>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
                              <span style={{
                                fontSize: 9, padding: "1px 6px", borderRadius: 999,
                                background: cycle.bg, color: cycle.color, border: `1px solid ${cycle.color}44`,
                                fontWeight: 600,
                              }}>
                                {mon.role}
                              </span>
                              <span style={{ fontSize: 9, color: "#64748b" }}>×{mon.count}</span>
                            </div>
                            <div style={{ fontSize: 9, color: "#475569", marginTop: 2 }}>{mon.habitat}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("flow");
  const tabs = [
    { id: "flow",   label: "⚙️ Automation Flow" },
    { id: "cycles", label: "🔄 Cycles" },
    { id: "litter", label: "💫 Litter Pokémon" },
    { id: "gather", label: "🤲 Gather Pokémon" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0a0a0f 0%,#0d1117 60%,#0a0a0f 100%)",
      fontFamily: "'Segoe UI',system-ui,sans-serif",
      color: "#e2e8f0", paddingBottom: 60,
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg,#1e0533 0%,#0c1445 50%,#1e0533 100%)",
        borderBottom: "2px solid #7c3aed", padding: "20px 28px 0",
        boxShadow: "0 4px 32px #7c3aed44", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#a78bfa" }}>
            Pokémon Pokopia
          </span>
          <h1 style={{
            margin: "2px 0 16px", fontSize: "clamp(17px,3.5vw,27px)", fontWeight: 800,
            background: "linear-gradient(90deg,#c084fc,#67e8f9,#4ade80)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Litter · Gather · Community Box System
          </h1>
          <div style={{ display: "flex", gap: 2 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "8px 18px", borderRadius: "8px 8px 0 0", fontSize: 12, fontWeight: 700,
                cursor: "pointer", border: "none",
                background: tab === t.id ? "#0d1117" : "transparent",
                color: tab === t.id ? "#e2e8f0" : "#64748b",
                borderTop: tab === t.id ? "2px solid #7c3aed" : "2px solid transparent",
                transition: "all 0.15s",
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 0" }}>
        {tab === "flow"   && <FlowTab />}
        {tab === "cycles" && <CyclesTab />}
        {tab === "litter" && <LitterTab />}
        {tab === "gather" && <GatherTab />}
      </div>
    </div>
  );
}
