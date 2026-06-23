"use client";

import { useState } from "react";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code";

interface ComponentPreviewProps {
  label: string;
  component: React.ReactNode;
  highlightedCode: string;
  rawCode: string;
}

export function ComponentPreview({
  label,
  component,
  highlightedCode,
  rawCode,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-card border border-stroke dark:bg-surface-2">
      <div className="flex items-center justify-between border-b border-stroke bg-surface-2 dark:bg-surface px-4 rounded-t-card">
        <span className="text-[13px] font-medium text-ink-muted py-2.5">{label}</span>
        <div className="flex items-center gap-1">
          {(["preview", "code"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-2 text-[13px] font-medium rounded transition-colors capitalize cursor-pointer",
                tab === t ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
          <div className="w-px h-4 bg-stroke mx-1" />
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-ink-muted hover:text-ink transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <RiCheckLine size={14} className="text-bronze-500" />
            ) : (
              <RiFileCopyLine size={14} />
            )}
          </button>
        </div>
      </div>

      {tab === "preview" ? (
        <div className="flex min-h-32 items-center justify-center p-10 bg-surface dark:bg-surface-2 rounded-b-card">
          {component}
        </div>
      ) : (
        <div
          className="rounded-b-card overflow-hidden [&>pre]:m-0 [&>pre]:rounded-none [&>pre]:p-5 [&>pre]:text-sm [&>pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
    </div>
  );
}
