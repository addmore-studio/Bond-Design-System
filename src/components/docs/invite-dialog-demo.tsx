"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InviteDialog } from "@/components/ui/invite-dialog";

export function InviteDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Invite teammate</Button>
      <InviteDialog
        open={open}
        onClose={() => setOpen(false)}
        onInvite={async (email, role) => {
          await new Promise((r) => setTimeout(r, 800));
          console.log("Invited", email, role);
        }}
      />
    </>
  );
}
