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

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("flow");
  const tabs = [
    { id: "flow",   label: "⚙️ Automation Flow" },
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
        {tab === "litter" && <LitterTab />}
        {tab === "gather" && <GatherTab />}
      </div>
    </div>
  );
}
