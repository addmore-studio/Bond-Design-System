"use client";

import { useEffect, useState } from "react";
import { RiCloseLine, RiMailLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type InviteRole = "admin" | "member" | "viewer";

export interface InviteDialogProps {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string, role: InviteRole) => void | Promise<void>;
  loading?: boolean;
}

const roles: { value: InviteRole; label: string; description: string }[] = [
  { value: "admin", label: "Admin", description: "Can manage members and settings" },
  { value: "member", label: "Member", description: "Can view and edit content" },
  { value: "viewer", label: "Viewer", description: "Can view content only" },
];

export function InviteDialog({ open, onClose, onInvite, loading = false }: InviteDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InviteRole>("member");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setEmail("");
    setRole("member");
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  async function handleSubmit() {
    if (!email.trim()) return;
    setSubmitting(true);
    await onInvite(email.trim(), role);
    setSubmitting(false);
    onClose();
  }

  if (!open) return null;

  const busy = submitting || loading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-card border border-stroke bg-surface shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-stroke px-5 py-4">
          <div>
            <p className="text-[15px] font-[500] tracking-[-0.02em] text-ink">Invite teammate</p>
            <p className="mt-0.5 text-[13px] text-ink-muted">Send an invite link via email.</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-input text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors"
          >
            <RiCloseLine size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-[500] text-ink">Email address</label>
            <Input
              placeholder="colleague@company.com"
              value={email}
              onChange={(value) => setEmail(value)}
              leadingIcon={<RiMailLine size={14} />}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-[500] text-ink">Role</label>
            <div className="flex flex-col gap-1">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={cn(
                    "flex items-start gap-3 rounded-input border px-3 py-2.5 text-left transition-colors",
                    role === r.value
                      ? "border-ink bg-surface-2"
                      : "border-stroke hover:bg-surface-2"
                  )}
                >
                  <span className={cn(
                    "mt-0.5 shrink-0 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                    role === r.value ? "border-ink" : "border-stroke"
                  )}>
                    {role === r.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                    )}
                  </span>
                  <span>
                    <span className="block text-[13px] font-[500] text-ink">{r.label}</span>
                    <span className="block text-[11px] text-ink-muted">{r.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-stroke bg-surface-2 px-5 py-3 rounded-b-card">
          <Button variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={busy || !email.trim()}>
            {busy ? "Sending…" : "Send invite"}
          </Button>
        </div>
      </div>
    </div>
  );
}
