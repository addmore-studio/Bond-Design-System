"use client";

import { useEffect, useState } from "react";
import { RiSunLine, RiMoonLine } from "@remixicon/react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.cookie = `theme=${next ? "dark" : "light"}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-8 h-8 rounded-input text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {dark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
    </button>
  );
}
