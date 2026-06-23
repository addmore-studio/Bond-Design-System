"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function ConfirmDialogDemo({ variant = "destructive" }: { variant?: "destructive" | "warning" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant === "destructive" ? "destructive" : "warning"} onClick={() => setOpen(true)}>
        {variant === "destructive" ? "Delete project" : "Archive project"}
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title={variant === "destructive" ? "Delete project?" : "Archive project?"}
        description={variant === "destructive"
          ? "This will permanently delete the project and all its data. This action cannot be undone."
          : "Archived projects are hidden from your workspace but can be restored later."}
        confirmLabel={variant === "destructive" ? "Delete project" : "Archive"}
        variant={variant}
      />
    </>
  );
}
