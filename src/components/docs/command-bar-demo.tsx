"use client";

import { useState } from "react";
import { RiSettings3Line, RiUser3Line, RiFileTextLine, RiSearchLine, RiAddCircleLine, RiLogoutBoxRLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { CommandBar } from "@/components/ui/command-bar";

const groups = [
  {
    label: "Navigation",
    items: [
      { id: "settings", label: "Settings", description: "Manage your account", icon: <RiSettings3Line size={13} />, shortcut: "⌘,", onSelect: () => {} },
      { id: "profile", label: "Profile", description: "Edit your public profile", icon: <RiUser3Line size={13} />, onSelect: () => {} },
      { id: "docs", label: "Documentation", description: "Read the docs", icon: <RiFileTextLine size={13} />, onSelect: () => {} },
    ],
  },
  {
    label: "Actions",
    items: [
      { id: "search", label: "Search everything", icon: <RiSearchLine size={13} />, shortcut: "⌘F", onSelect: () => {} },
      { id: "new", label: "New project", icon: <RiAddCircleLine size={13} />, shortcut: "⌘N", onSelect: () => {} },
      { id: "logout", label: "Log out", icon: <RiLogoutBoxRLine size={13} />, onSelect: () => {} },
    ],
  },
];

export function CommandBarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <RiSearchLine size={14} />
        Open command bar
        <kbd className="ml-1 inline-flex items-center gap-0.5 rounded bg-surface-2 border border-stroke px-1.5 py-0.5 text-[10px] font-[500] text-ink-muted">⌘K</kbd>
      </Button>
      <CommandBar open={open} onClose={() => setOpen(false)} groups={groups} />
    </>
  );
}
