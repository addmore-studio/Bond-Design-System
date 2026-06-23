"use client";

import { useState } from "react";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "shrink-0 p-0.5 rounded text-ink-muted hover:text-ink transition-colors cursor-pointer",
        className
      )}
      title={`Copy "${value}"`}
    >
      {copied ? (
        <RiCheckLine size={11} className="text-bronze-500" />
      ) : (
        <RiFileCopyLine size={11} />
      )}
    </button>
  );
}

function CopyRow({ label, value, accent = false }: {
  label?: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 group">
      <span className={cn(
        "text-[11px] truncate",
        accent ? "text-bronze-500" : "text-ink-muted"
      )}>
        {label ?? value}
      </span>
      <CopyButton value={value} className="opacity-0 group-hover:opacity-100" />
    </div>
  );
}

type ColorToken = {
  name: string;
  cssVar: string;
  value: string;
  tailwind?: string;
  alphaBg?: boolean;
  dark?: string;
};

type ColorGroup = {
  group: string;
  tokens: ColorToken[];
};

// ── Semantic tokens ─────────────────────────────────────────────────────
const semanticGroups: ColorGroup[] = [
  {
    group: "Foreground",
    tokens: [
      { name: "fg/primary",    cssVar: "--color-ink",            value: "#281e15", dark: "#ecece2",              tailwind: "text-ink" },
      { name: "fg/secondary",  cssVar: "--color-ink-secondary",  value: "#52402f", dark: "rgba(236,236,226,0.72)",tailwind: "text-ink-secondary" },
      { name: "fg/muted",      cssVar: "--color-ink-muted",      value: "#a8917a", dark: "rgba(255,255,255,0.48)",tailwind: "text-ink-muted" },
      { name: "fg/on-primary", cssVar: "--color-ink-on-primary", value: "#ecece2", dark: "#281e15",              tailwind: "text-ink-on-primary" },
      { name: "fg/on-dark",    cssVar: "--color-ink-on-dark",    value: "#ecece2", dark: "#ecece2",              tailwind: "text-ink-on-dark" },
      { name: "fg/inverse",    cssVar: "--color-ink-inverse",    value: "#ffffff", dark: "#17110c",              tailwind: "text-ink-inverse" },
    ],
  },
  {
    group: "Background",
    tokens: [
      { name: "bg/primary",   cssVar: "--color-surface",         value: "#faf8f6", dark: "#281e15",              tailwind: "bg-surface" },
      { name: "bg/secondary", cssVar: "--color-surface-2",       value: "#f0ebe5", dark: "#3a2d21",              tailwind: "bg-surface-2" },
      { name: "bg/surface",   cssVar: "--color-surface-3",       value: "#ddd4c8", dark: "#17110c",              tailwind: "bg-surface-3" },
      { name: "bg/muted",     cssVar: "--color-surface-muted",   value: "#f5f5ee", dark: "#52402f",              tailwind: "bg-surface-muted" },
      { name: "bg/inverse",   cssVar: "--color-surface-inverse", value: "#17110c", dark: "#fafaf7",              tailwind: "bg-surface-inverse" },
      { name: "bg/glass",     cssVar: "--color-surface-glass",   value: "rgba(40,30,21,0.32)", dark: "rgba(236,236,226,0.04)", tailwind: "bg-surface-glass", alphaBg: true },
    ],
  },
  {
    group: "Border",
    tokens: [
      { name: "border/default",   cssVar: "--color-stroke",       value: "#ddd4c8",             dark: "#ddddd0",              tailwind: "border-stroke" },
      { name: "border/highlight", cssVar: "--color-stroke-strong",value: "#c4b5a3",             dark: "rgba(255,255,255,0.08)",tailwind: "border-stroke-strong" },
      { name: "border/muted",     cssVar: "--color-stroke-muted", value: "#a8917a",             dark: "#c4c4b3",              tailwind: "border-stroke-muted" },
      { name: "border/glass",     cssVar: "--color-stroke-glass", value: "rgba(40,30,21,0.32)", dark: "rgba(236,236,226,0.04)",tailwind: "border-stroke-glass", alphaBg: true },
    ],
  },
  {
    group: "Button",
    tokens: [
      { name: "button/primary-bg",  cssVar: "--color-btn-primary-bg",  value: "#281e15", dark: "#ecece2", tailwind: "bg-btn-primary-bg" },
      { name: "button/primary-fg",  cssVar: "--color-btn-primary-fg",  value: "#ecece2", dark: "#281e15", tailwind: "text-btn-primary-fg" },
      { name: "button/ghost-bg",    cssVar: "--color-btn-ghost-bg",    value: "#f0ebe5", dark: "#3a2d21", tailwind: "bg-btn-ghost-bg" },
      { name: "button/ghost-fg",    cssVar: "--color-btn-ghost-fg",    value: "#281e15", dark: "#ffffff",  tailwind: "text-btn-ghost-fg" },
      { name: "button/glass",       cssVar: "--color-btn-glass-bg",    value: "rgba(40,30,21,0.32)", dark: "rgba(236,236,226,0.04)", alphaBg: true },
      { name: "button/success-bg",  cssVar: "--color-btn-success-bg",  value: "#618a35", dark: "#7fa655", tailwind: "bg-btn-success-bg" },
      { name: "button/success-fg",  cssVar: "--color-btn-success-fg",  value: "#ffffff", tailwind: "text-btn-success-fg" },
      { name: "button/warning-bg",  cssVar: "--color-btn-warning-bg",  value: "#c07418", dark: "#e09635", tailwind: "bg-btn-warning-bg" },
      { name: "button/warning-fg",  cssVar: "--color-btn-warning-fg",  value: "#ffffff", tailwind: "text-btn-warning-fg" },
    ],
  },
  {
    group: "Brand",
    tokens: [
      { name: "brand/default",  cssVar: "--color-brand",          value: "#9e542f", dark: "#9e542f", tailwind: "text-brand" },
      { name: "brand/hover",    cssVar: "--color-brand-hover",    value: "#874828", dark: "#d6804e", tailwind: "text-brand-hover" },
      { name: "brand/subtle",   cssVar: "--color-brand-subtle",   value: "#fae8dc", dark: "#3f2113", tailwind: "bg-brand-subtle" },
      { name: "brand/muted",    cssVar: "--color-brand-muted",    value: "#f3ccb3", dark: "#552d19", tailwind: "bg-brand-muted" },
      { name: "brand/emphasis", cssVar: "--color-brand-emphasis", value: "#6e3a20", dark: "#e9a97f", tailwind: "text-brand-emphasis" },
      { name: "brand/on-brand", cssVar: "--color-brand-on",       value: "#ffffff", dark: "#ffffff",  tailwind: "text-brand-on" },
    ],
  },
];

// ── Primitive palettes ───────────────────────────────────────────────────
const primitiveGroups: ColorGroup[] = [
  {
    group: "Brown",
    tokens: [
      { name: "brown/50",  cssVar: "--color-brown-50",  value: "#faf8f6", tailwind: "bg-brown-50" },
      { name: "brown/100", cssVar: "--color-brown-100", value: "#f0ebe5", tailwind: "bg-brown-100" },
      { name: "brown/200", cssVar: "--color-brown-200", value: "#ddd4c8", tailwind: "bg-brown-200" },
      { name: "brown/300", cssVar: "--color-brown-300", value: "#c4b5a3", tailwind: "bg-brown-300" },
      { name: "brown/400", cssVar: "--color-brown-400", value: "#a8917a", tailwind: "bg-brown-400" },
      { name: "brown/500", cssVar: "--color-brown-500", value: "#8d7259", tailwind: "bg-brown-500" },
      { name: "brown/600", cssVar: "--color-brown-600", value: "#6e5640", tailwind: "bg-brown-600" },
      { name: "brown/700", cssVar: "--color-brown-700", value: "#52402f", tailwind: "bg-brown-700" },
      { name: "brown/800", cssVar: "--color-brown-800", value: "#3a2d21", tailwind: "bg-brown-800" },
      { name: "brown/900", cssVar: "--color-brown-900", value: "#281e15", tailwind: "bg-brown-900" },
      { name: "brown/950", cssVar: "--color-brown-950", value: "#17110c", tailwind: "bg-brown-950" },
    ],
  },
  {
    group: "Sand",
    tokens: [
      { name: "sand/50",  cssVar: "--color-sand-50",  value: "#fafaf7", tailwind: "bg-sand-50" },
      { name: "sand/100", cssVar: "--color-sand-100", value: "#f5f5ee", tailwind: "bg-sand-100" },
      { name: "sand/200", cssVar: "--color-sand-200", value: "#ecece2", tailwind: "bg-sand-200" },
      { name: "sand/300", cssVar: "--color-sand-300", value: "#ddddd0", tailwind: "bg-sand-300" },
      { name: "sand/400", cssVar: "--color-sand-400", value: "#c4c4b3", tailwind: "bg-sand-400" },
      { name: "sand/500", cssVar: "--color-sand-500", value: "#a8a894", tailwind: "bg-sand-500" },
      { name: "sand/600", cssVar: "--color-sand-600", value: "#8a8a74", tailwind: "bg-sand-600" },
      { name: "sand/700", cssVar: "--color-sand-700", value: "#6b6b58", tailwind: "bg-sand-700" },
      { name: "sand/800", cssVar: "--color-sand-800", value: "#4f4f40", tailwind: "bg-sand-800" },
      { name: "sand/900", cssVar: "--color-sand-900", value: "#36362b", tailwind: "bg-sand-900" },
      { name: "sand/950", cssVar: "--color-sand-950", value: "#1f1f18", tailwind: "bg-sand-950" },
    ],
  },
  {
    group: "Bronze",
    tokens: [
      { name: "bronze/50",  cssVar: "--color-bronze-50",  value: "#fdf5f0", tailwind: "bg-bronze-50" },
      { name: "bronze/100", cssVar: "--color-bronze-100", value: "#fae8dc", tailwind: "bg-bronze-100" },
      { name: "bronze/200", cssVar: "--color-bronze-200", value: "#f3ccb3", tailwind: "bg-bronze-200" },
      { name: "bronze/300", cssVar: "--color-bronze-300", value: "#e9a97f", tailwind: "bg-bronze-300" },
      { name: "bronze/400", cssVar: "--color-bronze-400", value: "#d6804e", tailwind: "bg-bronze-400" },
      { name: "bronze/500", cssVar: "--color-bronze-500", value: "#9e542f", tailwind: "bg-bronze-500" },
      { name: "bronze/600", cssVar: "--color-bronze-600", value: "#874828", tailwind: "bg-bronze-600" },
      { name: "bronze/700", cssVar: "--color-bronze-700", value: "#6e3a20", tailwind: "bg-bronze-700" },
      { name: "bronze/800", cssVar: "--color-bronze-800", value: "#552d19", tailwind: "bg-bronze-800" },
      { name: "bronze/900", cssVar: "--color-bronze-900", value: "#3f2113", tailwind: "bg-bronze-900" },
      { name: "bronze/950", cssVar: "--color-bronze-950", value: "#2a150c", tailwind: "bg-bronze-950" },
    ],
  },
  {
    group: "Green",
    tokens: [
      { name: "green/50",  cssVar: "--color-green-50",  value: "#f2f5ec", tailwind: "bg-green-50" },
      { name: "green/100", cssVar: "--color-green-100", value: "#e2ebd4", tailwind: "bg-green-100" },
      { name: "green/200", cssVar: "--color-green-200", value: "#c4d8ab", tailwind: "bg-green-200" },
      { name: "green/300", cssVar: "--color-green-300", value: "#a0c07e", tailwind: "bg-green-300" },
      { name: "green/400", cssVar: "--color-green-400", value: "#7fa655", tailwind: "bg-green-400" },
      { name: "green/500", cssVar: "--color-green-500", value: "#618a35", tailwind: "bg-green-500" },
      { name: "green/600", cssVar: "--color-green-600", value: "#4d6f29", tailwind: "bg-green-600" },
      { name: "green/700", cssVar: "--color-green-700", value: "#3a551e", tailwind: "bg-green-700" },
      { name: "green/800", cssVar: "--color-green-800", value: "#293c15", tailwind: "bg-green-800" },
      { name: "green/900", cssVar: "--color-green-900", value: "#1b290e", tailwind: "bg-green-900" },
      { name: "green/950", cssVar: "--color-green-950", value: "#0f1707", tailwind: "bg-green-950" },
    ],
  },
  {
    group: "Red",
    tokens: [
      { name: "red/50",  cssVar: "--color-red-50",  value: "#f8f0ee", tailwind: "bg-red-50" },
      { name: "red/100", cssVar: "--color-red-100", value: "#f0ddd9", tailwind: "bg-red-100" },
      { name: "red/200", cssVar: "--color-red-200", value: "#e1bab3", tailwind: "bg-red-200" },
      { name: "red/300", cssVar: "--color-red-300", value: "#ce9389", tailwind: "bg-red-300" },
      { name: "red/400", cssVar: "--color-red-400", value: "#b86961", tailwind: "bg-red-400" },
      { name: "red/500", cssVar: "--color-red-500", value: "#9e413a", tailwind: "bg-red-500" },
      { name: "red/600", cssVar: "--color-red-600", value: "#7e3230", tailwind: "bg-red-600" },
      { name: "red/700", cssVar: "--color-red-700", value: "#5f2524", tailwind: "bg-red-700" },
      { name: "red/800", cssVar: "--color-red-800", value: "#431a19", tailwind: "bg-red-800" },
      { name: "red/900", cssVar: "--color-red-900", value: "#2c110f", tailwind: "bg-red-900" },
      { name: "red/950", cssVar: "--color-red-950", value: "#190908", tailwind: "bg-red-950" },
    ],
  },
  {
    group: "Orange",
    tokens: [
      { name: "orange/50",  cssVar: "--color-orange-50",  value: "#fdf6e8", tailwind: "bg-orange-50" },
      { name: "orange/100", cssVar: "--color-orange-100", value: "#faebcc", tailwind: "bg-orange-100" },
      { name: "orange/200", cssVar: "--color-orange-200", value: "#f5d49e", tailwind: "bg-orange-200" },
      { name: "orange/300", cssVar: "--color-orange-300", value: "#edb868", tailwind: "bg-orange-300" },
      { name: "orange/400", cssVar: "--color-orange-400", value: "#e09635", tailwind: "bg-orange-400" },
      { name: "orange/500", cssVar: "--color-orange-500", value: "#c07418", tailwind: "bg-orange-500" },
      { name: "orange/600", cssVar: "--color-orange-600", value: "#9a5d12", tailwind: "bg-orange-600" },
      { name: "orange/700", cssVar: "--color-orange-700", value: "#75470d", tailwind: "bg-orange-700" },
      { name: "orange/800", cssVar: "--color-orange-800", value: "#533209", tailwind: "bg-orange-800" },
      { name: "orange/900", cssVar: "--color-orange-900", value: "#362006", tailwind: "bg-orange-900" },
      { name: "orange/950", cssVar: "--color-orange-950", value: "#1e1203", tailwind: "bg-orange-950" },
    ],
  },
];

// ── Alpha tokens ─────────────────────────────────────────────────────────
const alphaGroups: ColorGroup[] = [
  {
    group: "Brown alpha",
    tokens: [
      { name: "brown-a4",  cssVar: "--color-brown-a4",  value: "rgba(40,30,21,0.04)",  alphaBg: true },
      { name: "brown-a8",  cssVar: "--color-brown-a8",  value: "rgba(40,30,21,0.08)",  alphaBg: true },
      { name: "brown-a12", cssVar: "--color-brown-a12", value: "rgba(40,30,21,0.12)",  alphaBg: true },
      { name: "brown-a16", cssVar: "--color-brown-a16", value: "rgba(40,30,21,0.16)",  alphaBg: true },
      { name: "brown-a24", cssVar: "--color-brown-a24", value: "rgba(40,30,21,0.24)",  alphaBg: true },
      { name: "brown-a32", cssVar: "--color-brown-a32", value: "rgba(40,30,21,0.32)",  alphaBg: true },
      { name: "brown-a48", cssVar: "--color-brown-a48", value: "rgba(40,30,21,0.48)",  alphaBg: true },
      { name: "brown-a64", cssVar: "--color-brown-a64", value: "rgba(40,30,21,0.64)",  alphaBg: true },
      { name: "brown-a72", cssVar: "--color-brown-a72", value: "rgba(40,30,21,0.72)",  alphaBg: true },
      { name: "brown-a80", cssVar: "--color-brown-a80", value: "rgba(40,30,21,0.80)",  alphaBg: true },
    ],
  },
  {
    group: "Sand alpha",
    tokens: [
      { name: "sand-a4",  cssVar: "--color-sand-a4",  value: "rgba(236,236,226,0.04)", alphaBg: true },
      { name: "sand-a8",  cssVar: "--color-sand-a8",  value: "rgba(236,236,226,0.08)", alphaBg: true },
      { name: "sand-a12", cssVar: "--color-sand-a12", value: "rgba(236,236,226,0.12)", alphaBg: true },
      { name: "sand-a16", cssVar: "--color-sand-a16", value: "rgba(236,236,226,0.16)", alphaBg: true },
      { name: "sand-a24", cssVar: "--color-sand-a24", value: "rgba(236,236,226,0.24)", alphaBg: true },
      { name: "sand-a32", cssVar: "--color-sand-a32", value: "rgba(236,236,226,0.32)", alphaBg: true },
      { name: "sand-a48", cssVar: "--color-sand-a48", value: "rgba(236,236,226,0.48)", alphaBg: true },
      { name: "sand-a64", cssVar: "--color-sand-a64", value: "rgba(236,236,226,0.64)", alphaBg: true },
      { name: "sand-a72", cssVar: "--color-sand-a72", value: "rgba(236,236,226,0.72)", alphaBg: true },
      { name: "sand-a80", cssVar: "--color-sand-a80", value: "rgba(236,236,226,0.80)", alphaBg: true },
    ],
  },
  {
    group: "White alpha",
    tokens: [
      { name: "white-a4",  cssVar: "--color-white-a4",  value: "rgba(255,255,255,0.04)", alphaBg: true },
      { name: "white-a8",  cssVar: "--color-white-a8",  value: "rgba(255,255,255,0.08)", alphaBg: true },
      { name: "white-a12", cssVar: "--color-white-a12", value: "rgba(255,255,255,0.12)", alphaBg: true },
      { name: "white-a16", cssVar: "--color-white-a16", value: "rgba(255,255,255,0.16)", alphaBg: true },
      { name: "white-a24", cssVar: "--color-white-a24", value: "rgba(255,255,255,0.24)", alphaBg: true },
      { name: "white-a32", cssVar: "--color-white-a32", value: "rgba(255,255,255,0.32)", alphaBg: true },
      { name: "white-a48", cssVar: "--color-white-a48", value: "rgba(255,255,255,0.48)", alphaBg: true },
      { name: "white-a64", cssVar: "--color-white-a64", value: "rgba(255,255,255,0.64)", alphaBg: true },
      { name: "white-a72", cssVar: "--color-white-a72", value: "rgba(255,255,255,0.72)", alphaBg: true },
      { name: "white-a80", cssVar: "--color-white-a80", value: "rgba(255,255,255,0.80)", alphaBg: true },
    ],
  },
  {
    group: "Black alpha",
    tokens: [
      { name: "black-a4",  cssVar: "--color-black-a4",  value: "rgba(0,0,0,0.04)",  alphaBg: true },
      { name: "black-a8",  cssVar: "--color-black-a8",  value: "rgba(0,0,0,0.08)",  alphaBg: true },
      { name: "black-a12", cssVar: "--color-black-a12", value: "rgba(0,0,0,0.12)",  alphaBg: true },
      { name: "black-a16", cssVar: "--color-black-a16", value: "rgba(0,0,0,0.16)",  alphaBg: true },
      { name: "black-a24", cssVar: "--color-black-a24", value: "rgba(0,0,0,0.24)",  alphaBg: true },
      { name: "black-a32", cssVar: "--color-black-a32", value: "rgba(0,0,0,0.32)",  alphaBg: true },
      { name: "black-a48", cssVar: "--color-black-a48", value: "rgba(0,0,0,0.48)",  alphaBg: true },
      { name: "black-a64", cssVar: "--color-black-a64", value: "rgba(0,0,0,0.64)",  alphaBg: true },
      { name: "black-a72", cssVar: "--color-black-a72", value: "rgba(0,0,0,0.72)",  alphaBg: true },
      { name: "black-a80", cssVar: "--color-black-a80", value: "rgba(0,0,0,0.80)",  alphaBg: true },
    ],
  },
  {
    group: "Bronze alpha",
    tokens: [
      { name: "bronze-a4",  cssVar: "--color-bronze-a4",  value: "rgba(158,84,47,0.04)", alphaBg: true },
      { name: "bronze-a8",  cssVar: "--color-bronze-a8",  value: "rgba(158,84,47,0.08)", alphaBg: true },
      { name: "bronze-a12", cssVar: "--color-bronze-a12", value: "rgba(158,84,47,0.12)", alphaBg: true },
      { name: "bronze-a16", cssVar: "--color-bronze-a16", value: "rgba(158,84,47,0.16)", alphaBg: true },
      { name: "bronze-a24", cssVar: "--color-bronze-a24", value: "rgba(158,84,47,0.24)", alphaBg: true },
      { name: "bronze-a32", cssVar: "--color-bronze-a32", value: "rgba(158,84,47,0.32)", alphaBg: true },
      { name: "bronze-a48", cssVar: "--color-bronze-a48", value: "rgba(158,84,47,0.48)", alphaBg: true },
      { name: "bronze-a64", cssVar: "--color-bronze-a64", value: "rgba(158,84,47,0.64)", alphaBg: true },
      { name: "bronze-a72", cssVar: "--color-bronze-a72", value: "rgba(158,84,47,0.72)", alphaBg: true },
      { name: "bronze-a80", cssVar: "--color-bronze-a80", value: "rgba(158,84,47,0.80)", alphaBg: true },
    ],
  },
];

// ── Typography ────────────────────────────────────────────────────────────
const typographyTokens = [
  {
    name: "Body/Sm/Regular",
    specs: [
      { label: "family", value: "Inter" },
      { label: "size",   value: "13px" },
      { label: "weight", value: "350" },
      { label: "lh",     value: "1.5" },
      { label: "ls",     value: "-0.02em" },
    ],
    sample: "The quick brown fox jumps over the lazy dog.",
    style: { fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 350, lineHeight: 1.5, letterSpacing: "-0.02em" },
  },
  {
    name: "Body/Sm/Medium",
    specs: [
      { label: "family", value: "Inter" },
      { label: "size",   value: "13px" },
      { label: "weight", value: "450" },
      { label: "lh",     value: "1.5" },
      { label: "ls",     value: "-0.02em" },
    ],
    sample: "The quick brown fox jumps over the lazy dog.",
    style: { fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 450, lineHeight: 1.5, letterSpacing: "-0.02em" },
  },
  {
    name: "Body/Base",
    specs: [
      { label: "family", value: "Inter" },
      { label: "size",   value: "16px" },
      { label: "weight", value: "400" },
      { label: "lh",     value: "1.5" },
      { label: "ls",     value: "-0.01em" },
    ],
    sample: "The quick brown fox jumps over the lazy dog.",
    style: { fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: 1.5, letterSpacing: "-0.01em" },
  },
  {
    name: "Body/Lg",
    specs: [
      { label: "family", value: "Inter" },
      { label: "size",   value: "18px" },
      { label: "weight", value: "400" },
      { label: "lh",     value: "1.6" },
      { label: "ls",     value: "-0.01em" },
    ],
    sample: "The quick brown fox jumps over the lazy dog.",
    style: { fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: 400, lineHeight: 1.6, letterSpacing: "-0.01em" },
  },
  {
    name: "Heading/H5",
    specs: [
      { label: "family", value: "Season Mix-TRIAL" },
      { label: "size",   value: "32px" },
      { label: "weight", value: "420" },
      { label: "lh",     value: "1.4" },
      { label: "ls",     value: "-0.03em" },
    ],
    sample: "Your tasks.",
    style: { fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 420, lineHeight: 1.4, letterSpacing: "-0.03em" },
  },
  {
    name: "Heading/Display",
    specs: [
      { label: "family", value: "Season Mix-TRIAL" },
      { label: "size",   value: "116px" },
      { label: "weight", value: "420" },
      { label: "lh",     value: "1" },
      { label: "ls",     value: "-0.04em" },
    ],
    sample: "Bond.",
    style: { fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 420, lineHeight: 1, letterSpacing: "-0.04em" },
  },
];

// ── Font sizes ────────────────────────────────────────────────────────────
const fontSizeTokens = [
  { name: "font-size/xs",   cssVar: "--text-xs",   value: "10px",  px: 10 },
  { name: "font-size/sm",   cssVar: "--text-sm",   value: "14px",  px: 14 },
  { name: "font-size/base", cssVar: "--text-base",  value: "16px",  px: 16 },
  { name: "font-size/lg",   cssVar: "--text-lg",   value: "18px",  px: 18 },
  { name: "font-size/xl",   cssVar: "--text-xl",   value: "20px",  px: 20 },
  { name: "font-size/2xl",  cssVar: "--text-2xl",  value: "24px",  px: 24 },
  { name: "font-size/3xl",  cssVar: "--text-3xl",  value: "30px",  px: 30 },
  { name: "font-size/4xl",  cssVar: "--text-4xl",  value: "36px",  px: 36 },
  { name: "font-size/5xl",  cssVar: "--text-5xl",  value: "48px",  px: 48 },
  { name: "font-size/6xl",  cssVar: "--text-6xl",  value: "60px",  px: 60 },
  { name: "font-size/7xl",  cssVar: "--text-7xl",  value: "72px",  px: 72 },
  { name: "font-size/8xl",  cssVar: "--text-8xl",  value: "96px",  px: 96 },
  { name: "font-size/9xl",  cssVar: "--text-9xl",  value: "116px", px: 116 },
];

// ── Spacing ───────────────────────────────────────────────────────────────
const spacingTokens = [
  { name: "spacing/0",   cssVar: "--spacing",       value: "0px",   px: 0 },
  { name: "spacing/px",  cssVar: "--spacing-px",    value: "1px",   px: 1 },
  { name: "spacing/0.5", cssVar: "--spacing-05",    value: "2px",   px: 2 },
  { name: "spacing/1",   cssVar: "--spacing-1",     value: "4px",   px: 4 },
  { name: "spacing/1.5", cssVar: "--spacing-15",    value: "6px",   px: 6 },
  { name: "spacing/2",   cssVar: "--spacing-2",     value: "8px",   px: 8 },
  { name: "spacing/2.5", cssVar: "--spacing-25",    value: "10px",  px: 10 },
  { name: "spacing/3",   cssVar: "--spacing-3",     value: "12px",  px: 12 },
  { name: "spacing/3.5", cssVar: "--spacing-35",    value: "14px",  px: 14 },
  { name: "spacing/4",   cssVar: "--spacing-4",     value: "16px",  px: 16 },
  { name: "spacing/5",   cssVar: "--spacing-5",     value: "20px",  px: 20 },
  { name: "spacing/6",   cssVar: "--spacing-6",     value: "24px",  px: 24 },
  { name: "spacing/7",   cssVar: "--spacing-7",     value: "28px",  px: 28 },
  { name: "spacing/8",   cssVar: "--spacing-8",     value: "32px",  px: 32 },
  { name: "spacing/9",   cssVar: "--spacing-9",     value: "36px",  px: 36 },
  { name: "spacing/10",  cssVar: "--spacing-10",    value: "40px",  px: 40 },
  { name: "spacing/11",  cssVar: "--spacing-11",    value: "44px",  px: 44 },
  { name: "spacing/12",  cssVar: "--spacing-12",    value: "48px",  px: 48 },
  { name: "spacing/14",  cssVar: "--spacing-14",    value: "56px",  px: 56 },
  { name: "spacing/16",  cssVar: "--spacing-16",    value: "64px",  px: 64 },
  { name: "spacing/20",  cssVar: "--spacing-20",    value: "80px",  px: 80 },
  { name: "spacing/24",  cssVar: "--spacing-24",    value: "96px",  px: 96 },
  { name: "spacing/28",  cssVar: "--spacing-28",    value: "112px", px: 112 },
  { name: "spacing/32",  cssVar: "--spacing-32",    value: "128px", px: 128 },
  { name: "spacing/36",  cssVar: "--spacing-36",    value: "144px", px: 144 },
  { name: "spacing/40",  cssVar: "--spacing-40",    value: "160px", px: 160 },
  { name: "spacing/48",  cssVar: "--spacing-48",    value: "192px", px: 192 },
  { name: "spacing/56",  cssVar: "--spacing-56",    value: "224px", px: 224 },
  { name: "spacing/64",  cssVar: "--spacing-64",    value: "256px", px: 256 },
  { name: "spacing/72",  cssVar: "--spacing-72",    value: "288px", px: 288 },
  { name: "spacing/80",  cssVar: "--spacing-80",    value: "320px", px: 320 },
  { name: "spacing/96",  cssVar: "--spacing-96",    value: "384px", px: 384 },
];

// ── Radius ────────────────────────────────────────────────────────────────
const radiusTokens = [
  { name: "radius/none",    cssVar: "--radius-none",    value: "0px",    px: 0 },
  { name: "radius/sm",      cssVar: "--radius-sm",      value: "2px",    px: 2 },
  { name: "radius/default", cssVar: "--radius-default", value: "4px",    px: 4 },
  { name: "radius/md",      cssVar: "--radius-md",      value: "6px",    px: 6 },
  { name: "radius/lg",      cssVar: "--radius-lg",      value: "8px",    px: 8 },
  { name: "radius/xl",      cssVar: "--radius-xl",      value: "12px",   px: 12 },
  { name: "radius/2xl",     cssVar: "--radius-2xl",     value: "16px",   px: 16 },
  { name: "radius/3xl",     cssVar: "--radius-3xl",     value: "24px",   px: 24 },
  { name: "radius/full",    cssVar: "--radius-full",    value: "9999px", px: 9999 },
  { name: "radius/input",   cssVar: "--radius-input",   value: "8px",    px: 8 },
  { name: "radius/card",    cssVar: "--radius-card",    value: "12px",   px: 12 },
  { name: "radius/button",  cssVar: "--radius-button",  value: "8px",    px: 8    },
  { name: "radius/pill",    cssVar: "--radius-pill",    value: "9999px", px: 9999 },
];

// ── Layout semantic tokens ────────────────────────────────────────────────
const layoutTokens = [
  { name: "space/page-x",           value: "64px",  alias: "spacing/16" },
  { name: "space/page-y",           value: "64px",  alias: "spacing/16" },
  { name: "space/section",          value: "48px",  alias: "spacing/12" },
  { name: "space/element",          value: "32px",  alias: "spacing/8" },
  { name: "space/inline",           value: "16px",  alias: "spacing/4" },
  { name: "space/nav-x",            value: "64px",  alias: "spacing/16" },
  { name: "space/nav-y",            value: "24px",  alias: "spacing/6" },
  { name: "space/card-padding",     value: "24px",  alias: "spacing/6" },
  { name: "space/card-padding-sm",  value: "16px",  alias: "spacing/4" },
  { name: "space/card-padding-lg",  value: "32px",  alias: "spacing/8" },
  { name: "space/card-gap",         value: "16px",  alias: "spacing/4" },
  { name: "space/card-gap-sm",      value: "12px",  alias: "spacing/3" },
  { name: "space/button-padding-x", value: "12px",  alias: "spacing/3" },
  { name: "space/button-padding-y", value: "8px",   alias: "spacing/2" },
  { name: "space/button-gap",       value: "8px",   alias: "spacing/2" },
  { name: "space/input-padding-x",  value: "16px",  alias: "spacing/4" },
  { name: "space/input-padding-y",  value: "12px",  alias: "spacing/3" },
  { name: "space/form-gap",         value: "20px",  alias: "spacing/5" },
  { name: "space/label-gap",        value: "6px",   alias: "spacing/1.5" },
  { name: "space/stack-xs",         value: "4px",   alias: "spacing/1" },
  { name: "space/stack-sm",         value: "8px",   alias: "spacing/2" },
  { name: "space/stack-md",         value: "16px",  alias: "spacing/4" },
  { name: "space/stack-lg",         value: "24px",  alias: "spacing/6" },
  { name: "space/stack-xl",         value: "32px",  alias: "spacing/8" },
  { name: "space/stack-2xl",        value: "48px",  alias: "spacing/12" },
  { name: "space/modal-padding",    value: "32px",  alias: "spacing/8" },
  { name: "space/modal-gap",        value: "24px",  alias: "spacing/6" },
  { name: "space/grid-gap",         value: "24px",  alias: "spacing/6" },
  { name: "space/grid-gap-sm",      value: "16px",  alias: "spacing/4" },
  { name: "space/grid-gap-lg",      value: "32px",  alias: "spacing/8" },
  { name: "text/label",             value: "10px",  alias: "font-size/xs" },
  { name: "text/body",              value: "14px",  alias: "font-size/sm" },
  { name: "text/body-lg",           value: "18px",  alias: "font-size/lg" },
  { name: "text/heading",           value: "116px", alias: "font-size/9xl" },
];

// ── Components ────────────────────────────────────────────────────────────

function ColorCard({ token }: { token: ColorToken }) {
  const checkerStyle = {
    backgroundImage: "linear-gradient(45deg,#bbb 25%,transparent 25%,transparent 75%,#bbb 75%,#bbb),linear-gradient(45deg,#bbb 25%,transparent 25%,transparent 75%,#bbb 75%,#bbb)",
    backgroundSize: "10px 10px",
    backgroundPosition: "0 0, 5px 5px",
    backgroundColor: "#e8e8e8",
  };

  return (
    <div className="rounded-card border border-stroke overflow-hidden flex flex-col">
      <div className="h-16 w-full shrink-0 relative" style={token.alphaBg ? checkerStyle : {}}>
        <div className="absolute inset-0" style={{ background: token.value }} />
      </div>
      <div className="p-2.5 space-y-1 bg-surface dark:bg-surface-2">
        <CopyRow value={token.name} />
        <CopyRow value={token.cssVar} accent={true} />
        {token.tailwind && <CopyRow value={token.tailwind} />}
        {token.dark && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="font-sans text-[10px] text-ink-muted/60">dark:</span>
            <span className="font-sans text-[10px] text-ink-muted">{token.dark}</span>
          </div>
        )}
        <div
          className="font-sans text-[10px] text-ink-muted/70 truncate"
          title={token.value}
        >
          {token.value}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-ink mb-6">{children}</h2>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-ink-muted mb-3">{children}</p>
  );
}

function ColorGrid({ tokens }: { tokens: ColorToken[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {tokens.map((token) => (
        <ColorCard key={token.cssVar} token={token} />
      ))}
    </div>
  );
}

export default function TokensPage() {
  return (
    <div>
      <div className="mb-10">
        <h1
          className="text-[32px] font-[420] leading-[1.4] tracking-[-0.03em] text-ink mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tokens
        </h1>
        <p className="text-ink-muted text-[13px]">
          All design tokens from Figma variables - primitives, semantics, spacing, radius, and typography.
        </p>
      </div>

      {/* Semantic Colors */}
      <section className="mb-12">
        <SectionHeading>Semantic colors</SectionHeading>
        <div className="space-y-8">
          {semanticGroups.map(({ group, tokens }) => (
            <div key={group}>
              <GroupLabel>{group}</GroupLabel>
              <ColorGrid tokens={tokens} />
            </div>
          ))}
        </div>
      </section>

      {/* Primitive Palettes */}
      <section className="mb-12">
        <SectionHeading>Primitive palettes</SectionHeading>
        <div className="space-y-8">
          {primitiveGroups.map(({ group, tokens }) => (
            <div key={group}>
              <GroupLabel>{group}</GroupLabel>
              <ColorGrid tokens={tokens} />
            </div>
          ))}
        </div>
      </section>

      {/* Alpha Tokens */}
      <section className="mb-12">
        <SectionHeading>Alpha tokens</SectionHeading>
        <div className="space-y-8">
          {alphaGroups.map(({ group, tokens }) => (
            <div key={group}>
              <GroupLabel>{group}</GroupLabel>
              <ColorGrid tokens={tokens} />
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <SectionHeading>Typography styles</SectionHeading>
        <div className="space-y-3">
          {typographyTokens.map((t) => (
            <div key={t.name} className="rounded-card border border-stroke overflow-hidden">
              <div className="bg-surface-2 border-b border-stroke px-4 py-3 flex items-start gap-4 flex-wrap">
                <div className="flex items-center gap-1 group">
                  <span className="font-sans text-[11px] font-medium text-ink">{t.name}</span>
                  <CopyButton value={t.name} className="opacity-0 group-hover:opacity-100" />
                </div>
                {t.specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-1 group">
                    <span className="font-sans text-[11px] text-ink-muted">
                      <span className="text-ink-muted/50">{s.label}: </span>
                      {s.value}
                    </span>
                    <CopyButton value={s.value} className="opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
              <div className="px-6 py-6 bg-surface">
                <p style={t.style as React.CSSProperties} className="text-ink">
                  {t.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font Sizes */}
      <section className="mb-12">
        <SectionHeading>Font sizes</SectionHeading>
        <div className="space-y-2">
          {fontSizeTokens.map(({ name, cssVar, value, px }) => (
            <div key={name} className="rounded-card border border-stroke overflow-hidden flex items-stretch">
              <div className="w-32 shrink-0 bg-surface-2 border-r border-stroke flex items-center justify-center p-3 overflow-hidden">
                <span
                  className="text-ink font-medium leading-none truncate"
                  style={{ fontSize: `${Math.min(px, 36)}px` }}
                >
                  Aa
                </span>
              </div>
              <div className="flex-1 p-3 bg-surface grid grid-cols-3 gap-x-4 items-center">
                <CopyRow value={name} />
                <CopyRow value={cssVar} accent={true} />
                <span className="font-sans text-[11px] text-ink-muted">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-12">
        <SectionHeading>Spacing</SectionHeading>
        <div className="space-y-1.5">
          {spacingTokens.map(({ name, cssVar, value, px }) => (
            <div key={name} className="rounded-lg border border-stroke overflow-hidden flex items-stretch">
              <div className="w-32 shrink-0 bg-surface-2 border-r border-stroke flex items-center px-3 py-2.5">
                <div
                  className="bg-bronze-400 rounded-sm shrink-0"
                  style={{ width: `${Math.min(px * 0.5, 96)}px`, height: "8px" }}
                />
              </div>
              <div className="flex-1 p-2.5 bg-surface grid grid-cols-3 gap-x-4 items-center">
                <CopyRow value={name} />
                <CopyRow value={cssVar} accent={true} />
                <span className="font-sans text-[11px] text-ink-muted">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Radius */}
      <section className="mb-12">
        <SectionHeading>Radius</SectionHeading>
        <div className="space-y-1.5">
          {radiusTokens.map(({ name, cssVar, value, px }) => (
            <div key={name} className="rounded-lg border border-stroke overflow-hidden flex items-stretch">
              <div className="w-32 shrink-0 bg-surface-2 border-r border-stroke flex items-center justify-center p-3">
                <div
                  className="w-8 h-8 border-2 border-bronze-400 bg-bronze-100 shrink-0"
                  style={{ borderRadius: `${Math.min(px, 16)}px` }}
                />
              </div>
              <div className="flex-1 p-2.5 bg-surface grid grid-cols-3 gap-x-4 items-center">
                <CopyRow value={name} />
                <CopyRow value={cssVar} accent={true} />
                <span className="font-sans text-[11px] text-ink-muted">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Layout Semantic Tokens */}
      <section>
        <SectionHeading>Layout tokens</SectionHeading>
        <div className="rounded-card border border-stroke overflow-hidden divide-y divide-stroke">
          {layoutTokens.map(({ name, value, alias }) => (
            <div key={name} className="flex items-center px-4 py-2.5 bg-surface hover:bg-surface-2 transition-colors group">
              <div className="flex-1 grid grid-cols-3 gap-x-4 items-center">
                <CopyRow value={name} />
                <span className="font-sans text-[11px] text-bronze-500">{value}</span>
                <span className="font-sans text-[11px] text-ink-muted/60">{alias}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
