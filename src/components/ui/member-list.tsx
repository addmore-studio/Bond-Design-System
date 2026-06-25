import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

export type MemberRole = "owner" | "admin" | "member" | "viewer";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: MemberRole;
}

export interface MemberListProps {
  members: Member[];
  onRoleChange?: (id: string, role: MemberRole) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

const roleLabels: Record<MemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

const roleColors: Record<MemberRole, string> = {
  owner: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
  admin: "text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400",
  member: "text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400",
  viewer: "text-ink-muted bg-surface-2",
};

export function MemberList({ members, onRoleChange, onRemove, className }: MemberListProps) {
  return (
    <div className={cn("rounded-card border border-stroke bg-surface divide-y divide-stroke overflow-hidden", className)}>
      {members.map((member) => (
        <MemberRow
          key={member.id}
          member={member}
          onRoleChange={onRoleChange ? (role) => onRoleChange(member.id, role) : undefined}
          onRemove={onRemove ? () => onRemove(member.id) : undefined}
        />
      ))}
    </div>
  );
}

interface MemberRowProps {
  member: Member;
  onRoleChange?: (role: MemberRole) => void;
  onRemove?: () => void;
}

function MemberRow({ member, onRoleChange, onRemove }: MemberRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-3 sm:px-4 py-3">
      <Avatar fallback={member.name.slice(0, 2)} src={member.avatarUrl} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-[500] text-ink truncate">{member.name}</p>
        <p className="text-[12px] text-ink-muted truncate">{member.email}</p>
      </div>
      <span className={cn("shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-[500]", roleColors[member.role])}>
        {roleLabels[member.role]}
      </span>
      {onRoleChange && (
        <select
          value={member.role}
          onChange={(e) => onRoleChange(e.target.value as MemberRole)}
          className="shrink-0 rounded-input border border-stroke bg-surface px-2 py-1 text-[12px] text-ink outline-none cursor-pointer hover:bg-surface-2 transition-colors"
        >
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="viewer">Viewer</option>
        </select>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="shrink-0 text-[12px] font-[500] text-ink-muted hover:text-red-500 transition-colors px-1"
        >
          Remove
        </button>
      )}
    </div>
  );
}
