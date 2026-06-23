"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/registry";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const categories = getCategories();

  return (
    <nav className="px-4 py-6 space-y-6">
      <div>
        <Link
          href="/docs"
          className={cn(
            "block px-3 py-1.5 rounded-input text-[13px] font-medium transition-colors",
            pathname === "/docs"
              ? "bg-ink text-ink-inverse"
              : "text-ink-muted hover:text-ink hover:bg-surface-2"
          )}
        >
          Overview
        </Link>
        <Link
          href="/docs/tokens"
          className={cn(
            "block px-3 py-1.5 rounded-input text-[13px] font-medium transition-colors",
            pathname === "/docs/tokens"
              ? "bg-ink text-ink-inverse"
              : "text-ink-muted hover:text-ink hover:bg-surface-2"
          )}
        >
          Tokens
        </Link>
        <Link
          href="/docs/easing"
          className={cn(
            "block px-3 py-1.5 rounded-input text-[13px] font-medium transition-colors",
            pathname === "/docs/easing"
              ? "bg-ink text-ink-inverse"
              : "text-ink-muted hover:text-ink hover:bg-surface-2"
          )}
        >
          Easing
        </Link>
      </div>

      {Object.entries(categories).map(([category, entries]) => (
        <div key={category}>
          <p className="px-3 mb-1 text-[11px] font-semibold text-ink-muted">
            {category}
          </p>
          <ul className="space-y-0.5">
            {entries.map((entry) => {
              const href = `/docs/${entry.slug}`;
              const active = pathname === href;
              return (
                <li key={entry.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "block px-3 py-1.5 rounded-input text-[13px] transition-colors",
                      active
                        ? "bg-ink text-ink-inverse font-medium"
                        : "text-ink-muted hover:text-ink hover:bg-surface-2"
                    )}
                  >
                    {entry.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
