"use client";

import { useState } from "react";
import { RiUser3Line, RiLockLine, RiNotificationLine, RiGlobalLine } from "@remixicon/react";
import { SettingsLayout, SettingsSectionCard, SettingsRow } from "@/components/ui/settings-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sections = [
  { id: "profile", label: "Profile", icon: <RiUser3Line size={14} /> },
  { id: "security", label: "Security", icon: <RiLockLine size={14} /> },
  { id: "notifications", label: "Notifications", icon: <RiNotificationLine size={14} /> },
  { id: "integrations", label: "Integrations", icon: <RiGlobalLine size={14} /> },
];

export function SettingsLayoutDemo() {
  const [active, setActive] = useState("profile");
  return (
    <SettingsLayout sections={sections} activeSection={active} onSectionChange={setActive}>
      {active === "profile" && (
        <SettingsSectionCard
          title="Profile"
          description="Update your personal information."
          footer={<><Button variant="outline">Cancel</Button><Button>Save changes</Button></>}
        >
          <SettingsRow label="Full name" description="Shown on your public profile">
            <Input placeholder="Jane Smith" className="w-full sm:w-48" />
          </SettingsRow>
          <SettingsRow label="Email" description="Used for login and notifications">
            <Input placeholder="jane@company.com" className="w-full sm:w-48" />
          </SettingsRow>
        </SettingsSectionCard>
      )}
      {active === "security" && (
        <SettingsSectionCard title="Security" description="Manage your password and 2FA." footer={<Button>Save changes</Button>}>
          <SettingsRow label="Current password">
            <Input type="password" placeholder="••••••••" className="w-full sm:w-48" />
          </SettingsRow>
          <SettingsRow label="New password">
            <Input type="password" placeholder="••••••••" className="w-full sm:w-48" />
          </SettingsRow>
        </SettingsSectionCard>
      )}
      {active === "notifications" && (
        <SettingsSectionCard title="Notifications" description="Choose what you're notified about.">
          <SettingsRow label="Email notifications" description="Receive updates via email">
            <span className="text-[12px] text-ink-muted">Enabled</span>
          </SettingsRow>
        </SettingsSectionCard>
      )}
      {active === "integrations" && (
        <SettingsSectionCard title="Integrations" description="Connect third-party tools.">
          <SettingsRow label="Slack" description="Send notifications to Slack">
            <Button variant="outline" size="sm">Connect</Button>
          </SettingsRow>
        </SettingsSectionCard>
      )}
    </SettingsLayout>
  );
}
