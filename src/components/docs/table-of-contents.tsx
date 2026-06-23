"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

export function TableOfContents({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav className="sticky top-24 space-y-1">
      <p className="text-[11px] font-semibold text-ink-muted mb-3">On this page</p>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "block text-[13px] py-0.5 transition-colors",
            active === id ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
