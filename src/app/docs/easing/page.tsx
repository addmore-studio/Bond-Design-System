"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

const BOND_EASE = {
  name: "Bond Ease",
  css: "cubic-bezier(0.16, 1, 0.3, 1)",
  gsap: "expo.out",
  duration: 0.7,
  description:
    "The primary motion curve for all Bond UI transitions. Fast initial velocity with a soft, natural settle.",
};

function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-ink-muted hover:text-ink border border-stroke hover:border-stroke-strong transition-colors cursor-pointer",
        className
      )}
      title={`Copy "${value}"`}
    >
      {copied ? (
        <>
          <RiCheckLine size={11} className="text-bronze-500" />
          <span className="text-bronze-500">Copied</span>
        </>
      ) : (
        <>
          <RiFileCopyLine size={11} />
          <span className="truncate max-w-[200px]">{value}</span>
        </>
      )}
    </button>
  );
}

function AnimationPreview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const dot = dotRef.current;
    if (!track || !dot) return;

    const maxX = track.offsetWidth - dot.offsetWidth;

    const tl = gsap
      .timeline({ repeat: -1 })
      .fromTo(dot, { x: 0 }, { x: maxX, ease: BOND_EASE.gsap, duration: BOND_EASE.duration })
      .to({}, { duration: 1.4 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative h-4 flex items-center">
      <div className="absolute inset-x-0 h-px bg-stroke" />
      <div
        ref={dotRef}
        className="absolute w-4 h-4 rounded-full bg-bronze-500 shadow-sm"
      />
    </div>
  );
}

const codeBlocks = [
  {
    label: "CSS",
    language: "css",
    code: `/* Bond Ease */
transition-timing-function: ${BOND_EASE.css};

/* Usage */
.element {
  transition: transform 0.7s ${BOND_EASE.css},
              opacity 0.5s ${BOND_EASE.css};
}`,
    copyValue: BOND_EASE.css,
  },
  {
    label: "GSAP",
    language: "js",
    code: `// Bond Ease
gsap.to(element, {
  y: 0,
  opacity: 1,
  duration: ${BOND_EASE.duration},
  ease: "${BOND_EASE.gsap}",
});`,
    copyValue: BOND_EASE.gsap,
  },
  {
    label: "Tailwind",
    language: "html",
    code: `<!-- Add to globals.css -->
@theme {
  --ease-bond: ${BOND_EASE.css};
}

<!-- Usage -->
<div class="transition-all duration-700 ease-[${BOND_EASE.css}]">
  ...
</div>`,
    copyValue: BOND_EASE.css,
  },
];

export default function EasingPage() {
  const [activeTab, setActiveTab] = useState("CSS");

  const active = codeBlocks.find((b) => b.label === activeTab)!;

  return (
    <div>
      <div className="mb-10">
        <h1
          className="text-[32px] font-[420] leading-[1.4] tracking-[-0.03em] text-ink mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Easing
        </h1>
        <p className="text-ink-muted text-[13px] leading-relaxed max-w-xl">
          Bond uses a single, carefully tuned easing curve across all animations -
          fast out, soft settle.
        </p>
      </div>

      {/* Preview card */}
      <div className="rounded-card border border-stroke overflow-hidden dark:bg-surface-2 mb-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stroke bg-surface-2 dark:bg-surface">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[15px] font-medium text-ink">{BOND_EASE.name}</p>
              <p className="text-[13px] text-ink-muted mt-0.5 max-w-md">
                {BOND_EASE.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <CopyButton value={BOND_EASE.css} />
              <CopyButton value={BOND_EASE.gsap} />
            </div>
          </div>
        </div>

        {/* Animation */}
        <div className="px-6 py-8 bg-surface dark:bg-surface-2">
          <AnimationPreview />
          <div className="flex justify-between mt-3">
            <span className="font-sans text-[10px] text-ink-muted/50">start</span>
            <span className="font-sans text-[10px] text-ink-muted/50">{BOND_EASE.duration}s</span>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="rounded-card border border-stroke overflow-hidden dark:bg-surface-2">
        {/* Tabs */}
        <div className="flex items-center border-b border-stroke bg-surface-2 dark:bg-surface px-4 gap-1">
          {codeBlocks.map((b) => (
            <button
              key={b.label}
              onClick={() => setActiveTab(b.label)}
              className={cn(
                "px-3 py-2.5 text-[13px] font-medium transition-colors cursor-pointer",
                activeTab === b.label ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {b.label}
            </button>
          ))}
          <div className="ml-auto">
            <CopyButton value={active.copyValue} />
          </div>
        </div>

        {/* Code block */}
        <div className="bg-surface dark:bg-surface-2 p-5 overflow-x-auto">
          <pre className="text-[13px] font-sans leading-[1.7] text-ink-muted">
            <code>{active.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
