import Link from "next/link";
import { getCategories } from "@/registry";

export default function DocsPage() {
  const categories = getCategories();
  const total = Object.values(categories).flat().length;

  return (
    <div>
      <div className="mb-10">
        <h1
          className="text-[24px] sm:text-[32px] font-[420] leading-[1.4] tracking-[-0.03em] text-ink mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Bond UI Kit
        </h1>
        <p className="text-ink-muted text-[13px] leading-relaxed max-w-xl">
          A collection of {total} hand-crafted components built with React,
          TypeScript, and Tailwind CSS. Copy the source directly into your
          project, no package required.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(categories).map(([category, entries]) => (
          <div key={category}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/docs/${entry.slug}`}
                  className="group rounded-card border border-stroke p-4 hover:border-stroke-strong transition-colors bg-surface"
                >
                  <p className="font-medium text-ink text-sm mb-1">
                    {entry.name}
                  </p>
                  <p className="text-[13px] text-ink-muted leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
