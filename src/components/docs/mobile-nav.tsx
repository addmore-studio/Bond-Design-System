"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { Sidebar } from "@/components/docs/sidebar";

export function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-8 h-8 rounded-input text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <RiMenuLine size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-surface shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 h-14 border-b border-stroke">
              <span className="text-sm font-medium text-ink">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-input text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <RiCloseLine size={18} />
              </button>
            </div>
            <Sidebar />
          </aside>
        </div>
      )}
    </>
  );
}
