import { RiAddCircleLine, RiCheckLine, RiDeleteBinLine, RiEditLine, RiErrorWarningLine, RiSearchLine, RiSortAsc, RiFlagLine, RiSparklingLine, RiInboxLine, RiCheckboxLine, RiSparkling2Line, RiSettings3Line, RiMapLine, RiGiftLine, RiMoreLine, RiMagicLine, RiNotificationLine, RiMailLine, RiLockLine, RiUser3Line, RiPhoneLine, RiGlobalLine, RiFileTextLine, RiInformationLine, RiAlertLine, RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiBarChartLine, RiGroupLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Tabs } from "@/components/ui/tabs";
import { Search } from "@/components/ui/search";
import { NavItem } from "@/components/ui/nav-item";
import { Sidebar, SidebarCta } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Menu } from "@/components/ui/menu";
import { Tooltip } from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import { Badge, CountBadge, Kbd } from "@/components/ui/badge";
import { Toast } from "@/components/ui/toast";
import { Modal } from "@/components/ui/modal";
import { Alert } from "@/components/ui/alert";
import { AlertExamples } from "@/components/docs/alert-examples";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress, Spinner } from "@/components/ui/progress";
import { Sheet } from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/empty-state";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { BondLogo, BondMark, BondPill } from "@/components/docs/logo";
import { PaginationDemo } from "@/components/docs/pagination-demo";
import { StatCard } from "@/components/ui/stat-card";
import { SettingsLayoutDemo } from "@/components/docs/settings-layout-demo";

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "A → Z", value: "alpha-asc" },
  { label: "Z → A", value: "alpha-desc" },
  { label: "Priority", value: "priority" },
  { label: "Last modified", value: "modified" },
];

const sortFieldOptions = [
  { label: "Priority", value: "priority" },
  { label: "Importance", value: "importance" },
  { label: "Date created", value: "date" },
  { label: "Last modified", value: "modified" },
  { label: "Alphabetical", value: "alpha" },
];

const orderOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const tagOptions = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Product", value: "product" },
  { label: "Research", value: "research" },
  { label: "Sales", value: "sales" },
  { label: "Support", value: "support" },
  { label: "Operations", value: "operations" },
];

function MegaphoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 17C9 17 16 18 19 21H20C20.5523 21 21 20.5523 21 20V13.937C21.8626 13.715 22.5 12.9319 22.5 12C22.5 11.0681 21.8626 10.285 21 10.063V4C21 3.44772 20.5523 3 20 3H19C16 6 9 7 9 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H6L7 22H9V17ZM11 8.6612C11.6833 8.5146 12.5275 8.31193 13.4393 8.04373C15.1175 7.55014 17.25 6.77262 19 5.57458V18.4254C17.25 17.2274 15.1175 16.4499 13.4393 15.9563C12.5275 15.6881 11.6833 15.4854 11 15.3388V8.6612ZM5 9H9V15H5V9Z" />
    </svg>
  );
}

export type PropDef = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};

export type ComponentExample = {
  label: string;
  component: React.ReactNode;
  code: string;
};

export type ComponentEntry = {
  slug: string;
  name: string;
  description: string;
  category: string;
  props: PropDef[];
  examples: ComponentExample[];
};

export const registry: ComponentEntry[] = [
  {
    slug: "button",
    name: "Button",
    description:
      "Triggers an action or event, such as submitting a form or navigating to a page.",
    category: "Components",
    props: [
      {
        name: "variant",
        type: '"primary" | "outline" | "ghost" | "destructive" | "glass" | "success" | "warning" | "magic"',
        default: '"primary"',
        description: "Controls the visual style of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Controls the size of the button.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Prevents interaction and dims the button.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional Tailwind classes to merge onto the button.",
      },
      {
        name: "onClick",
        type: "React.MouseEventHandler<HTMLButtonElement>",
        description: "Callback fired when the button is clicked.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <Button>
            <RiAddCircleLine size={16} />
            Add todo
          </Button>
        ),
        code: `<Button>
  <RiAddCircleLine size={16} />
  Add todo
</Button>`,
      },
      {
        label: "Variants",
        component: (
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              <RiAddCircleLine size={16} />
              Primary
            </Button>
            <Button variant="outline">
              <RiEditLine size={16} />
              Outline
            </Button>
            <Button variant="ghost">
              <RiSearchLine size={16} />
              Ghost
            </Button>
            <Button variant="destructive">
              <RiDeleteBinLine size={16} />
              Destructive
            </Button>
            <Button variant="success">
              <RiCheckLine size={16} />
              Success
            </Button>
            <Button variant="warning">
              <RiErrorWarningLine size={16} />
              Warning
            </Button>
          </div>
        ),
        code: `<Button variant="primary">
  <RiAddCircleLine size={16} />
  Primary
</Button>
<Button variant="outline">
  <RiEditLine size={16} />
  Outline
</Button>
<Button variant="ghost">
  <RiSearchLine size={16} />
  Ghost
</Button>
<Button variant="destructive">
  <RiDeleteBinLine size={16} />
  Destructive
</Button>
<Button variant="success">
  <RiCheckLine size={16} />
  Success
</Button>
<Button variant="warning">
  <RiErrorWarningLine size={16} />
  Warning
</Button>`,
      },
      {
        label: "Sizes",
        component: (
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      },
      {
        label: "Disabled",
        component: <Button disabled>Disabled</Button>,
        code: `<Button disabled>Disabled</Button>`,
      },
      {
        label: "Magic",
        component: (
          <Button variant="magic">
            <RiSparklingLine size={16} />
            Clean up{" "}
            <span className="opacity-50">5</span>
          </Button>
        ),
        code: `<Button variant="magic">
  <RiSparklingLine size={16} />
  Clean up <span className="opacity-50">5</span>
</Button>`,
      },
    ],
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    description:
      "A filter-style select trigger. Ghost when empty, bronze when a value is active. Supports search and multi-select.",
    category: "Components",
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Placeholder text shown when nothing is selected.",
      },
      {
        name: "options",
        type: "DropdownOption[]",
        required: true,
        description: "Array of { label, value, icon? } objects.",
      },
      {
        name: "value",
        type: "string | string[]",
        description: "Controlled selected value. Use string[] when multiple is true.",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        description: "Uncontrolled initial selected value.",
      },
      {
        name: "onChange",
        type: "(value: string | string[] | undefined) => void",
        description: "Called when selection changes. Receives undefined when cleared.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: "Optional icon shown inside the trigger.",
      },
      {
        name: "searchable",
        type: "boolean",
        default: "false",
        description: "Adds a search input inside the menu to filter options by label.",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        description: "Enables checkbox-style multi-select. Value becomes string[].",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Prevents interaction and dims the trigger.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: <Dropdown label="Sort" options={sortOptions} icon={<RiSortAsc size={14} />} />,
        code: `<Dropdown
  label="Sort"
  options={sortOptions}
  icon={<RiSortAsc size={14} />}
/>`,
      },
      {
        label: "Active selection",
        component: <Dropdown label="Sort" options={sortOptions} defaultValue="newest" icon={<RiSortAsc size={14} />} />,
        code: `<Dropdown
  label="Sort"
  options={sortOptions}
  defaultValue="newest"
  icon={<RiSortAsc size={14} />}
/>`,
      },
      {
        label: "Disabled",
        component: <Dropdown label="Sort" options={sortOptions} icon={<RiSortAsc size={14} />} disabled />,
        code: `<Dropdown label="Sort" options={sortOptions} icon={<RiSortAsc size={14} />} disabled />`,
      },
      {
        label: "Sort with direction",
        component: (
          <Dropdown
            label="Sort"
            icon={<RiSortAsc size={14} />}
            groups={[
              {
                key: "field",
                title: "Sort by",
                options: sortFieldOptions,
                defaultValue: "priority",
              },
              {
                key: "order",
                title: "Order",
                options: orderOptions,
                defaultValue: "desc",
              },
            ]}
          />
        ),
        code: `<Dropdown
  label="Sort"
  icon={<RiSortAsc size={14} />}
  groups={[
    {
      key: "field",
      title: "Sort by",
      options: [
        { label: "Priority", value: "priority" },
        { label: "Importance", value: "importance" },
        { label: "Date created", value: "date" },
        { label: "Last modified", value: "modified" },
      ],
      defaultValue: "priority",
    },
    {
      key: "order",
      title: "Order",
      options: [
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" },
      ],
      defaultValue: "desc",
    },
  ]}
/>`,
      },
      {
        label: "Searchable",
        component: (
          <Dropdown
            label="Tag"
            options={tagOptions}
            icon={<RiFlagLine size={14} />}
            searchable
          />
        ),
        code: `<Dropdown
  label="Tag"
  options={tagOptions}
  icon={<RiFlagLine size={14} />}
  searchable
/>`,
      },
      {
        label: "Multi-select",
        component: (
          <Dropdown
            label="Tags"
            options={tagOptions}
            icon={<RiFlagLine size={14} />}
            multiple
          />
        ),
        code: `<Dropdown
  label="Tags"
  options={tagOptions}
  icon={<RiFlagLine size={14} />}
  multiple
/>`,
      },
      {
        label: "Multi-select + search",
        component: (
          <Dropdown
            label="Tags"
            options={tagOptions}
            icon={<RiFlagLine size={14} />}
            multiple
            searchable
          />
        ),
        code: `<Dropdown
  label="Tags"
  options={tagOptions}
  icon={<RiFlagLine size={14} />}
  multiple
  searchable
/>`,
      },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Horizontal tab navigation. Active tab has a filled background; inactive tabs are dimmed.",
    category: "Components",
    props: [
      {
        name: "tabs",
        type: "TabItem[]",
        required: true,
        description: "Array of { label, value, count? } objects.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled active tab value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Uncontrolled initial active value. Defaults to first tab.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Called when the active tab changes.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <Tabs
            tabs={[
              { label: "Active", value: "active", count: "+50" },
              { label: "Monitoring", value: "monitoring", count: 7 },
              { label: "Snoozed", value: "snoozed", count: 12 },
              { label: "History", value: "history", count: 4 },
            ]}
          />
        ),
        code: `<Tabs
  tabs={[
    { label: "Active", value: "active", count: "+50" },
    { label: "Monitoring", value: "monitoring", count: 7 },
    { label: "Snoozed", value: "snoozed", count: 12 },
    { label: "History", value: "history", count: 4 },
  ]}
/>`,
      },
      {
        label: "Without counts",
        component: (
          <Tabs
            tabs={[
              { label: "Overview", value: "overview" },
              { label: "Activity", value: "activity" },
              { label: "Settings", value: "settings" },
            ]}
          />
        ),
        code: `<Tabs
  tabs={[
    { label: "Overview", value: "overview" },
    { label: "Activity", value: "activity" },
    { label: "Settings", value: "settings" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "search",
    name: "Search",
    description: "An expandable search input. Collapsed to an icon button, expands on click to reveal the input field.",
    category: "Components",
    props: [
      {
        name: "placeholder",
        type: "string",
        default: '"Search..."',
        description: "Input placeholder text.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled input value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Uncontrolled initial value.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Called on every keystroke.",
      },
      {
        name: "defaultExpanded",
        type: "boolean",
        default: "false",
        description: "Start in expanded state.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: <Search />,
        code: `<Search />`,
      },
      {
        label: "Expanded",
        component: <Search defaultExpanded />,
        code: `<Search defaultExpanded />`,
      },
      {
        label: "With value",
        component: <Search defaultExpanded defaultValue="invoices" />,
        code: `<Search defaultExpanded defaultValue="invoices" />`,
      },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "A pill-shaped label badge with optional leading icon. Use for status, assignee, tags, and contextual metadata. Also exports CountBadge for small count indicators in nav/menu items, and Kbd for keyboard shortcut key chips.",
    category: "Components",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "The badge label text.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: "Optional icon shown at the leading edge.",
      },
      {
        name: "variant",
        type: '"bronze" | "neutral" | "success" | "warning" | "danger"',
        default: '"bronze"',
        description: "Color variant.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="flex items-center gap-2 flex-wrap">
            <Badge>Delegated</Badge>
            <Badge icon={<RiUser3Line size={11} />}>Assigned to you</Badge>
            <Badge icon={<RiFlagLine size={11} />}>High priority</Badge>
          </div>
        ),
        code: `<Badge>Delegated</Badge>
<Badge icon={<RiUser3Line size={11} />}>Assigned to you</Badge>
<Badge icon={<RiFlagLine size={11} />}>High priority</Badge>`,
      },
      {
        label: "Variants",
        component: (
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="bronze">Bronze</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        ),
        code: `<Badge variant="bronze">Bronze</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>`,
      },
      {
        label: "Count badges",
        component: (
          <div className="flex items-center gap-2">
            <CountBadge>4</CountBadge>
            <CountBadge>14</CountBadge>
            <CountBadge>+50</CountBadge>
            <CountBadge variant="highlight">3</CountBadge>
            <CountBadge variant="highlight">New</CountBadge>
          </div>
        ),
        code: `<CountBadge>14</CountBadge>
<CountBadge variant="highlight">3</CountBadge>`,
      },
      {
        label: "Kbd shortcuts",
        component: (
          <div className="flex items-center gap-3">
            <Kbd shortcut="⌘K" />
            <Kbd shortcut="⌘⇧P" />
            <Kbd shortcut="⌘E" />
            <Kbd shortcut="⌫" />
          </div>
        ),
        code: `<Kbd shortcut="⌘K" />
<Kbd shortcut="⌘⇧P" />`,
      },
    ],
  },
  {
    slug: "nav-item",
    name: "Nav Item",
    description: "A single sidebar navigation link with optional icon, count badge, and active/highlight states.",
    category: "Components",
    props: [
      {
        name: "icon",
        type: "React.ReactNode",
        required: true,
        description: "Icon element shown at the leading edge (16–18px recommended).",
      },
      {
        name: "label",
        type: "string",
        required: true,
        description: "Navigation label text.",
      },
      {
        name: "active",
        type: "boolean",
        default: "false",
        description: "Highlights the item as the currently active route.",
      },
      {
        name: "count",
        type: "number | string",
        description: "Badge shown at the trailing edge (e.g. 14 or \"+50\").",
      },
      {
        name: "highlight",
        type: "boolean",
        default: "false",
        description: "Renders the label and count badge in brand bronze.",
      },
      {
        name: "shortcut",
        type: "string",
        description: 'Keyboard shortcut shown at the trailing edge (e.g. "⌘K"). Each character is rendered as a key chip.',
      },
      {
        name: "collapsed",
        type: "boolean",
        default: "false",
        description: "Icon-only mode — hides label, count, and shortcut. Used in the collapsed sidebar.",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Called when the item is clicked.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="w-[200px] flex flex-col gap-0.5 bg-surface-2 rounded-card p-2">
            <NavItem icon={<RiMagicLine size={16} />} label="Talk with Bond" />
            <NavItem icon={<RiSearchLine size={16} />} label="Search" />
            <NavItem icon={<RiInboxLine size={16} />} label="Inbox" count={14} />
            <NavItem icon={<RiCheckboxLine size={16} />} label="Todos" count="+50" active />
          </div>
        ),
        code: `<NavItem icon={<RiMagicLine size={16} />} label="Talk with Bond" />
<NavItem icon={<RiSearchLine size={16} />} label="Search" />
<NavItem icon={<RiInboxLine size={16} />} label="Inbox" count={14} />
<NavItem icon={<RiCheckboxLine size={16} />} label="Todos" count="+50" active />`,
      },
      {
        label: "Bottom section",
        component: (
          <div className="w-[200px] flex flex-col gap-0.5 bg-surface-2 rounded-card p-2">
            <NavItem icon={<MegaphoneIcon size={16} />} label="What's new" count={2} highlight />
            <NavItem icon={<RiMapLine size={16} />} label="Roadmap" />
            <NavItem icon={<RiGiftLine size={16} />} label="Referral" />
            <NavItem icon={<RiSettings3Line size={16} />} label="Settings" />
            <NavItem icon={<RiMoreLine size={16} />} label="More" />
          </div>
        ),
        code: `<NavItem icon={<RiMagicLine size={16} />} label="What's new" count={2} highlight />
<NavItem icon={<RiMapLine size={16} />} label="Roadmap" />
<NavItem icon={<RiGiftLine size={16} />} label="Referral" />
<NavItem icon={<RiSettings3Line size={16} />} label="Settings" />
<NavItem icon={<RiMoreLine size={16} />} label="More" />`,
      },
      {
        label: "States",
        component: (
          <div className="w-[200px] flex flex-col gap-0.5 bg-surface-2 rounded-card p-2">
            <NavItem icon={<RiInboxLine size={16} />} label="Default" />
            <NavItem icon={<RiInboxLine size={16} />} label="Active" active />
            <NavItem icon={<RiInboxLine size={16} />} label="With count" count={7} />
            <NavItem icon={<RiInboxLine size={16} />} label="Highlighted" count={2} highlight />
            <NavItem icon={<RiSearchLine size={16} />} label="With shortcut" shortcut="⌘K" />
          </div>
        ),
        code: `<NavItem icon={<RiInboxLine size={16} />} label="Default" />
<NavItem icon={<RiInboxLine size={16} />} label="Active" active />
<NavItem icon={<RiInboxLine size={16} />} label="With count" count={7} />
<NavItem icon={<RiInboxLine size={16} />} label="Highlighted" count={2} highlight />
<NavItem icon={<RiSearchLine size={16} />} label="With shortcut" shortcut="⌘K" />`,
      },
      {
        label: "Collapsed",
        component: (
          <div className="flex flex-col gap-0.5 bg-surface-2 rounded-card p-2 w-fit">
            <NavItem icon={<RiInboxLine size={20} />} label="Inbox" collapsed />
            <NavItem icon={<RiCheckboxLine size={20} />} label="Todos" collapsed active />
            <NavItem icon={<MegaphoneIcon size={20} />} label="What's new" count={2} highlight collapsed />
            <NavItem icon={<RiSettings3Line size={20} />} label="Settings" collapsed />
          </div>
        ),
        code: `<NavItem icon={<RiInboxLine size={20} />} label="Inbox" collapsed />
<NavItem icon={<RiCheckboxLine size={20} />} label="Todos" collapsed active />
<NavItem icon={<MegaphoneIcon size={20} />} label="What's new" count={2} highlight collapsed />
<NavItem icon={<RiSettings3Line size={20} />} label="Settings" collapsed />`,
      },
    ],
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    description: "App sidebar with top navigation, optional CTA card, and a bottom utility section.",
    category: "Sections",
    props: [
      {
        name: "logo",
        type: "React.ReactNode",
        description: "Logo or wordmark shown at the top.",
      },
      {
        name: "topItems",
        type: "SidebarNavItem[]",
        description: "Primary navigation items shown at the top.",
      },
      {
        name: "bottomItems",
        type: "SidebarNavItem[]",
        description: "Utility navigation items shown at the bottom.",
      },
      {
        name: "cta",
        type: "React.ReactNode",
        description: "Optional promotional card between top and bottom items.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="flex gap-3 h-[880px]">
            <div className="w-[220px] rounded-lg overflow-hidden shrink-0">
              <Sidebar
                logo={<BondLogo className="text-ink" />}
                topItems={[
                  { icon: <RiMagicLine size={16} />, label: "Talk with Bond" },
                  { icon: <RiSearchLine size={16} />, label: "Search" },
                  { icon: <RiInboxLine size={16} />, label: "Inbox", count: 14 },
                  { icon: <RiCheckboxLine size={16} />, label: "Todos", count: "+50", active: true },
                ]}
                cta={
                  <SidebarCta
                    title={<>New:<br />todo lists<br />reimagined.</>}
                    action={<span className="text-[13px] text-ink underline cursor-pointer">Try now</span>}
                  />
                }
                bottomItems={[
                  { icon: <MegaphoneIcon size={16} />, label: "What's new", count: 2, highlight: true },
                  { icon: <RiMapLine size={16} />, label: "Roadmap" },
                  { icon: <RiGiftLine size={16} />, label: "Referral" },
                  { icon: <RiSettings3Line size={16} />, label: "Settings" },
                ]}
                more={[
                  { label: "Changelog", value: "changelog", icon: <MegaphoneIcon size={14} /> },
                  { label: "Documentation", value: "docs", icon: <RiFileTextLine size={14} /> },
                  { type: "separator" },
                  { label: "Log out", value: "logout", destructive: true },
                ]}
              />
            </div>
            <div className="rounded-lg shrink-0 w-fit overflow-visible">
              <Sidebar
                collapsed
                logo={<BondPill className="text-ink" />}
                topItems={[
                  { icon: <RiMagicLine size={20} />, label: "Talk with Bond" },
                  { icon: <RiSearchLine size={20} />, label: "Search" },
                  { icon: <RiInboxLine size={20} />, label: "Inbox", count: 14 },
                  { icon: <RiCheckboxLine size={20} />, label: "Todos", count: "+50", active: true },
                ]}
                bottomItems={[
                  { icon: <MegaphoneIcon size={20} />, label: "What's new", count: 2, highlight: true },
                  { icon: <RiMapLine size={20} />, label: "Roadmap" },
                  { icon: <RiGiftLine size={20} />, label: "Referral" },
                  { icon: <RiSettings3Line size={20} />, label: "Settings" },
                ]}
                more={[
                  { label: "Changelog", value: "changelog", icon: <MegaphoneIcon size={14} /> },
                  { label: "Documentation", value: "docs", icon: <RiFileTextLine size={14} /> },
                  { type: "separator" },
                  { label: "Log out", value: "logout", destructive: true },
                ]}
              />
            </div>
          </div>
        ),
        code: `{/* Expanded */}
<Sidebar
  logo={<BondLogo />}
  topItems={[
    { icon: <RiMagicLine size={16} />, label: "Talk with Bond" },
    { icon: <RiSearchLine size={16} />, label: "Search" },
    { icon: <RiInboxLine size={16} />, label: "Inbox", count: 14 },
    { icon: <RiCheckboxLine size={16} />, label: "Todos", count: "+50", active: true },
  ]}
  cta={
    <SidebarCta
      title="New: todo lists reimagined."
      action={<a href="#">Try now</a>}
    />
  }
  bottomItems={[
    { icon: <MegaphoneIcon size={16} />, label: "What's new", count: 2, highlight: true },
    { icon: <RiMapLine size={16} />, label: "Roadmap" },
    { icon: <RiGiftLine size={16} />, label: "Referral" },
    { icon: <RiSettings3Line size={16} />, label: "Settings" },
    { icon: <RiMoreLine size={16} />, label: "More" },
  ]}
/>

{/* Collapsed */}
<Sidebar
  collapsed
  topItems={[
    { icon: <RiMagicLine size={20} />, label: "Talk with Bond" },
    { icon: <RiSearchLine size={20} />, label: "Search" },
    { icon: <RiInboxLine size={20} />, label: "Inbox", count: 14 },
    { icon: <RiCheckboxLine size={20} />, label: "Todos", count: "+50", active: true },
  ]}
  bottomItems={[
    { icon: <MegaphoneIcon size={20} />, label: "What's new", count: 2, highlight: true },
    { icon: <RiMapLine size={20} />, label: "Roadmap" },
    { icon: <RiGiftLine size={20} />, label: "Referral" },
    { icon: <RiSettings3Line size={20} />, label: "Settings" },
    { icon: <RiMoreLine size={20} />, label: "More" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "A surface container with optional title, description, and footer. Use as a building block for content sections.",
    category: "Components",
    props: [
      {
        name: "title",
        type: "string",
        description: "Heading shown in the card header.",
      },
      {
        name: "description",
        type: "string",
        description: "Supporting text shown below the title.",
      },
      {
        name: "footer",
        type: "React.ReactNode",
        description: "Content rendered in the card footer (subtle surface-2 bg).",
      },
      {
        name: "padding",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Controls inner padding for header, body, and footer.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Main body content.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <Card title="Invoice overdue" description="Payment for March has not been received.">
            <p className="text-[13px] text-ink-muted">Due date: March 31, 2026</p>
          </Card>
        ),
        code: `<Card title="Invoice overdue" description="Payment for March has not been received.">
  <p className="text-[13px] text-ink-muted">Due date: March 31, 2026</p>
</Card>`,
      },
      {
        label: "With footer",
        component: (
          <Card
            title="Team plan"
            description="You are on the Team plan. Next billing date is July 1, 2026."
            footer={
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Manage plan</Button>
                <Button size="sm">Upgrade</Button>
              </div>
            }
          >
            <p className="text-[13px] text-ink-muted">5 seats used of 10</p>
          </Card>
        ),
        code: `<Card
  title="Team plan"
  description="You are on the Team plan. Next billing date is July 1, 2026."
  footer={
    <div className="flex gap-2">
      <Button size="sm" variant="outline">Manage plan</Button>
      <Button size="sm">Upgrade</Button>
    </div>
  }
>
  <p className="text-[13px] text-ink-muted">5 seats used of 10</p>
</Card>`,
      },
      {
        label: "Content only",
        component: (
          <Card>
            <p className="text-[13px] text-ink">A plain card with no header or footer.</p>
          </Card>
        ),
        code: `<Card>
  <p className="text-[13px] text-ink">A plain card with no header or footer.</p>
</Card>`,
      },
      {
        label: "Padding sizes",
        component: (
          <div className="flex flex-col gap-3 w-[280px]">
            <Card padding="sm" title="Small padding" />
            <Card padding="md" title="Medium padding" />
            <Card padding="lg" title="Large padding" />
          </div>
        ),
        code: `<Card padding="sm" title="Small padding" />
<Card padding="md" title="Medium padding" />
<Card padding="lg" title="Large padding" />`,
      },
    ],
  },
  {
    slug: "input",
    name: "Input",
    description: "A versatile input field supporting text, email, password (with show/hide toggle), number (with +/− stepper), phone, URL, textarea, and more. Supports labels, icons, prefix/suffix decorations, helper text, and error state.",
    category: "Components",
    props: [
      {
        name: "label",
        type: "string",
        description: "Label shown above the field.",
      },
      {
        name: "type",
        type: '"text" | "email" | "password" | "number" | "search" | "url" | "tel" | "textarea"',
        default: '"text"',
        description: 'Input type. "password" gets a show/hide toggle, "number" gets +/− stepper buttons, "textarea" renders a multi-line field.',
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text shown when empty.",
      },
      {
        name: "rows",
        type: "number",
        default: "3",
        description: "Number of visible rows (textarea only).",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Uncontrolled initial value.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Called on every change.",
      },
      {
        name: "leadingIcon",
        type: "React.ReactNode",
        description: "Icon shown at the leading edge.",
      },
      {
        name: "trailingIcon",
        type: "React.ReactNode",
        description: "Icon shown at the trailing edge (hidden when type is password or number).",
      },
      {
        name: "prefix",
        type: "string",
        description: 'Inline text rendered before the input value (e.g. "$", "+1").',
      },
      {
        name: "suffix",
        type: "string",
        description: 'Inline text rendered after the input value (e.g. "%", "px", ".com").',
      },
      {
        name: "min",
        type: "number",
        description: "Minimum value (number inputs only).",
      },
      {
        name: "max",
        type: "number",
        description: "Maximum value (number inputs only).",
      },
      {
        name: "step",
        type: "number",
        default: "1",
        description: "Increment step for the +/− stepper (number inputs only).",
      },
      {
        name: "helperText",
        type: "string",
        description: "Muted helper text shown below the field.",
      },
      {
        name: "error",
        type: "string",
        description: "Error message shown in red below the field. Replaces helperText.",
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        description: "Makes the field non-editable while keeping it visible.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Prevents interaction and dims the field.",
      },
    ],
    examples: [
      {
        label: "Text",
        component: (
          <div className="w-[280px]">
            <Input label="Full name" placeholder="Jane Smith" leadingIcon={<RiUser3Line size={14} />} />
          </div>
        ),
        code: `<Input label="Full name" placeholder="Jane Smith" leadingIcon={<RiUser3Line size={14} />} />`,
      },
      {
        label: "Email",
        component: (
          <div className="w-[280px]">
            <Input label="Email" type="email" placeholder="you@example.com" leadingIcon={<RiMailLine size={14} />} />
          </div>
        ),
        code: `<Input label="Email" type="email" placeholder="you@example.com" leadingIcon={<RiMailLine size={14} />} />`,
      },
      {
        label: "Password",
        component: (
          <div className="w-[280px]">
            <Input label="Password" type="password" placeholder="Enter password" leadingIcon={<RiLockLine size={14} />} helperText="At least 8 characters." />
          </div>
        ),
        code: `<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  leadingIcon={<RiLockLine size={14} />}
  helperText="At least 8 characters."
/>`,
      },
      {
        label: "Number",
        component: (
          <div className="w-[280px]">
            <Input label="Quantity" type="number" defaultValue="1" min={0} max={99} helperText="Max 99 items." />
          </div>
        ),
        code: `<Input
  label="Quantity"
  type="number"
  defaultValue="1"
  min={0}
  max={99}
  helperText="Max 99 items."
/>`,
      },
      {
        label: "Phone",
        component: (
          <div className="w-[280px]">
            <PhoneInput label="Phone" />
          </div>
        ),
        code: `<PhoneInput label="Phone" />`,
      },
      {
        label: "URL",
        component: (
          <div className="w-[280px]">
            <Input label="Website" type="url" placeholder="yoursite.com" leadingIcon={<RiGlobalLine size={14} />} suffix=".com" />
          </div>
        ),
        code: `<Input
  label="Website"
  type="url"
  placeholder="yoursite.com"
  leadingIcon={<RiGlobalLine size={14} />}
  suffix=".com"
/>`,
      },
      {
        label: "Currency",
        component: (
          <div className="w-[280px]">
            <Input label="Amount" type="number" placeholder="0.00" prefix="$" step={0.01} min={0} />
          </div>
        ),
        code: `<Input
  label="Amount"
  type="number"
  placeholder="0.00"
  prefix="$"
  step={0.01}
  min={0}
/>`,
      },
      {
        label: "Percentage",
        component: (
          <div className="w-[280px]">
            <Input label="Discount" type="number" defaultValue="10" min={0} max={100} suffix="%" />
          </div>
        ),
        code: `<Input
  label="Discount"
  type="number"
  defaultValue="10"
  min={0}
  max={100}
  suffix="%"
/>`,
      },
      {
        label: "Textarea",
        component: (
          <div className="w-[280px]">
            <Input label="Notes" type="textarea" placeholder="Add a note..." rows={4} leadingIcon={<RiFileTextLine size={14} />} />
          </div>
        ),
        code: `<Input
  label="Notes"
  type="textarea"
  placeholder="Add a note..."
  rows={4}
  leadingIcon={<RiFileTextLine size={14} />}
/>`,
      },
      {
        label: "Read-only",
        component: (
          <div className="w-[280px]">
            <Input label="API key" defaultValue="sk-••••••••••••••••••••" leadingIcon={<RiLockLine size={14} />} readOnly helperText="Generated automatically. Cannot be changed." />
          </div>
        ),
        code: `<Input
  label="API key"
  defaultValue="sk-••••••••••••••••••••"
  leadingIcon={<RiLockLine size={14} />}
  readOnly
  helperText="Generated automatically. Cannot be changed."
/>`,
      },
      {
        label: "Error state",
        component: (
          <div className="w-[280px]">
            <Input label="Email" type="email" defaultValue="not-an-email" leadingIcon={<RiMailLine size={14} />} error="Please enter a valid email address." />
          </div>
        ),
        code: `<Input
  label="Email"
  type="email"
  defaultValue="not-an-email"
  leadingIcon={<RiMailLine size={14} />}
  error="Please enter a valid email address."
/>`,
      },
      {
        label: "Disabled",
        component: (
          <div className="w-[280px]">
            <Input label="Email" type="email" defaultValue="locked@example.com" leadingIcon={<RiMailLine size={14} />} disabled />
          </div>
        ),
        code: `<Input
  label="Email"
  type="email"
  defaultValue="locked@example.com"
  leadingIcon={<RiMailLine size={14} />}
  disabled
/>`,
      },
      {
        label: "Phone",
        component: (
          <div className="w-[280px]">
            <PhoneInput label="Phone" />
          </div>
        ),
        code: `<PhoneInput label="Phone" />`,
      },
      {
        label: "Phone — custom country",
        component: (
          <div className="w-[280px]">
            <PhoneInput label="Phone" defaultCountry="GB" />
          </div>
        ),
        code: `<PhoneInput label="Phone" defaultCountry="GB" />`,
      },
    ],
  },
  {
    slug: "menu",
    name: "Menu",
    description: "A floating popup menu triggered by any element. Use for contextual actions, overflow menus, and the sidebar More button.",
    category: "Components",
    props: [
      {
        name: "trigger",
        type: "React.ReactNode",
        required: true,
        description: "The element that opens the menu on click.",
      },
      {
        name: "items",
        type: "MenuDef[]",
        required: true,
        description: "Array of items, separators, and headings.",
      },
      {
        name: "onSelect",
        type: "(value: string) => void",
        description: "Called when an item is selected.",
      },
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        default: '"bottom"',
        description: "Which side of the trigger the menu opens on.",
      },
      {
        name: "align",
        type: '"start" | "end" | "center"',
        default: '"start"',
        description: "Alignment along the cross axis.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <Menu
            trigger={<Button variant="outline">Options</Button>}
            items={[
              { label: "Edit", value: "edit", icon: <RiEditLine size={14} />, shortcut: "⌘E" },
              { label: "Duplicate", value: "duplicate", icon: <RiFileTextLine size={14} />, shortcut: "⌘D" },
              { type: "separator" },
              { label: "Delete", value: "delete", icon: <RiDeleteBinLine size={14} />, destructive: true, shortcut: "⌫" },
            ]}
          />
        ),
        code: `<Menu
  trigger={<Button variant="outline">Options</Button>}
  items={[
    { label: "Edit", value: "edit", icon: <RiEditLine size={14} />, shortcut: "⌘E" },
    { label: "Duplicate", value: "duplicate", icon: <RiFileTextLine size={14} />, shortcut: "⌘D" },
    { type: "separator" },
    { label: "Delete", value: "delete", icon: <RiDeleteBinLine size={14} />, destructive: true, shortcut: "⌫" },
  ]}
/>`,
      },
      {
        label: "With badges",
        component: (
          <Menu
            trigger={<Button variant="outline">More</Button>}
            items={[
              { label: "Inbox", value: "inbox", icon: <RiInboxLine size={14} />, count: 14 },
              { label: "What's new", value: "new", icon: <RiNotificationLine size={14} />, count: 3, highlight: true },
              { type: "separator" },
              { label: "Settings", value: "settings", icon: <RiSettings3Line size={14} /> },
            ]}
          />
        ),
        code: `<Menu
  trigger={<Button variant="outline">More</Button>}
  items={[
    { label: "Inbox", value: "inbox", icon: <RiInboxLine size={14} />, count: 14 },
    { label: "What's new", value: "new", icon: <RiNotificationLine size={14} />, count: 3, highlight: true },
    { type: "separator" },
    { label: "Settings", value: "settings", icon: <RiSettings3Line size={14} /> },
  ]}
/>`,
      },
      {
        label: "With headings",
        component: (
          <Menu
            trigger={<Button variant="ghost"><RiMoreLine size={16} /></Button>}
            items={[
              { type: "heading", label: "Account" },
              { label: "Profile", value: "profile", icon: <RiUser3Line size={14} /> },
              { label: "Settings", value: "settings", icon: <RiSettings3Line size={14} /> },
              { type: "separator" },
              { label: "Documentation", value: "docs", icon: <RiFileTextLine size={14} /> },
              { type: "separator" },
              { label: "Log out", value: "logout", destructive: true },
            ]}
          />
        ),
        code: `<Menu
  trigger={<Button variant="ghost"><RiMoreLine size={16} /></Button>}
  items={[
    { type: "heading", label: "Account" },
    { label: "Profile", value: "profile", icon: <RiUser3Line size={14} /> },
    { label: "Settings", value: "settings", icon: <RiSettings3Line size={14} /> },
    { type: "separator" },
    { label: "Documentation", value: "docs", icon: <RiFileTextLine size={14} /> },
    { type: "separator" },
    { label: "Log out", value: "logout", destructive: true },
  ]}
/>`,
      },
      {
        label: "Opens upward",
        component: (
          <div className="pt-36">
            <Menu
              side="top"
              trigger={<Button variant="outline">More options</Button>}
              items={[
                { label: "Changelog", value: "changelog", icon: <MegaphoneIcon size={14} /> },
                { label: "Documentation", value: "docs", icon: <RiFileTextLine size={14} /> },
                { type: "separator" },
                { label: "Log out", value: "logout", destructive: true },
              ]}
            />
          </div>
        ),
        code: `<Menu
  side="top"
  trigger={<Button variant="outline">More options</Button>}
  items={[
    { label: "Changelog", value: "changelog" },
    { label: "Documentation", value: "docs" },
    { type: "separator" },
    { label: "Log out", value: "logout", destructive: true },
  ]}
/>`,
      },
      {
        label: "Nav item trigger",
        component: (
          <div className="w-[200px] bg-surface-2 rounded-card p-2 pt-36">
            <Menu
              side="top"
              align="end"
              trigger={<NavItem icon={<RiMoreLine size={16} />} label="More" />}
              items={[
                { label: "Changelog", value: "changelog", icon: <MegaphoneIcon size={14} /> },
                { label: "Documentation", value: "docs", icon: <RiFileTextLine size={14} /> },
                { type: "separator" },
                { label: "Log out", value: "logout", destructive: true },
              ]}
            />
          </div>
        ),
        code: `<Menu
  side="top"
  align="end"
  trigger={<NavItem icon={<RiMoreLine size={16} />} label="More" />}
  items={[
    { label: "Changelog", value: "changelog" },
    { label: "Documentation", value: "docs" },
    { type: "separator" },
    { label: "Log out", value: "logout", destructive: true },
  ]}
/>`,
      },
      {
        label: "With tooltips",
        component: (
          <Menu
            trigger={<Button variant="outline">Options</Button>}
            items={[
              { label: "Edit", value: "edit", icon: <RiEditLine size={14} />, shortcut: "⌘E", tooltip: "Edit this item" },
              { label: "Duplicate", value: "duplicate", icon: <RiFileTextLine size={14} />, shortcut: "⌘D", tooltip: "Create a copy" },
              { type: "separator" },
              { label: "Delete", value: "delete", icon: <RiDeleteBinLine size={14} />, destructive: true, tooltip: "Permanently remove" },
            ]}
          />
        ),
        code: `<Menu
  trigger={<Button variant="outline">Options</Button>}
  items={[
    { label: "Edit", value: "edit", icon: <RiEditLine size={14} />, shortcut: "⌘E", tooltip: "Edit this item" },
    { label: "Duplicate", value: "duplicate", icon: <RiFileTextLine size={14} />, shortcut: "⌘D", tooltip: "Create a copy" },
    { type: "separator" },
    { label: "Delete", value: "delete", icon: <RiDeleteBinLine size={14} />, destructive: true, tooltip: "Permanently remove" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "A dark pill label that appears on hover. Wraps any element and positions itself on the specified side.",
    category: "Components",
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Text shown in the tooltip.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "The element that triggers the tooltip on hover.",
      },
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        default: '"top"',
        description: "Which side the tooltip appears on.",
      },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="flex items-center gap-6 pt-8">
            <Tooltip label="Top tooltip">
              <Button variant="outline">Hover me</Button>
            </Tooltip>
          </div>
        ),
        code: `<Tooltip label="Top tooltip">
  <Button variant="outline">Hover me</Button>
</Tooltip>`,
      },
      {
        label: "Sides",
        component: (
          <div className="flex items-center gap-6 py-8 px-4">
            <Tooltip label="Top" side="top"><Button variant="ghost">Top</Button></Tooltip>
            <Tooltip label="Bottom" side="bottom"><Button variant="ghost">Bottom</Button></Tooltip>
            <Tooltip label="Left" side="left"><Button variant="ghost">Left</Button></Tooltip>
            <Tooltip label="Right" side="right"><Button variant="ghost">Right</Button></Tooltip>
          </div>
        ),
        code: `<Tooltip label="Top" side="top"><Button variant="ghost">Top</Button></Tooltip>
<Tooltip label="Bottom" side="bottom"><Button variant="ghost">Bottom</Button></Tooltip>
<Tooltip label="Left" side="left"><Button variant="ghost">Left</Button></Tooltip>
<Tooltip label="Right" side="right"><Button variant="ghost">Right</Button></Tooltip>`,
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "A circular user avatar with optional company badge. Supports image or initials fallback in multiple sizes.",
    category: "Components",
    props: [
      {
        name: "src",
        type: "string",
        description: "Image URL for the user avatar.",
      },
      {
        name: "alt",
        type: "string",
        description: "Alt text for the avatar image.",
      },
      {
        name: "fallback",
        type: "string",
        description: "Initials shown when no image is provided (e.g. \"JD\"). Falls back to a user icon.",
      },
      {
        name: "companySrc",
        type: "string",
        description: "Company / workspace logo URL shown as a small badge at the bottom-right.",
      },
      {
        name: "companyFallback",
        type: "string",
        description: "Single letter shown in the company badge when no image is provided.",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: "Controls the avatar size.",
      },
    ],
    examples: [
      {
        label: "With image",
        component: (
          <div className="flex items-center gap-3">
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" size="xs" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" size="sm" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" size="md" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" size="lg" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" size="xl" />
          </div>
        ),
        code: `<Avatar src="..." alt="User" size="xs" />
<Avatar src="..." alt="User" size="sm" />
<Avatar src="..." alt="User" size="md" />
<Avatar src="..." alt="User" size="lg" />
<Avatar src="..." alt="User" size="xl" />`,
      },
      {
        label: "Placeholder",
        component: (
          <div className="flex items-center gap-3">
            <Avatar size="xs" />
            <Avatar fallback="JD" size="sm" />
            <Avatar fallback="JD" size="md" />
            <Avatar fallback="AB" size="lg" />
            <Avatar fallback="AB" size="xl" />
          </div>
        ),
        code: `<Avatar size="xs" />
<Avatar fallback="JD" size="sm" />
<Avatar fallback="JD" size="md" />
<Avatar fallback="AB" size="lg" />
<Avatar fallback="AB" size="xl" />`,
      },
      {
        label: "With company badge",
        component: (
          <div className="flex items-center gap-4">
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" companySrc="https://i.pravatar.cc/150?img=2" companyAlt="Company" size="sm" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" companySrc="https://i.pravatar.cc/150?img=2" companyAlt="Company" size="md" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" companySrc="https://i.pravatar.cc/150?img=2" companyAlt="Company" size="lg" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User" companySrc="https://i.pravatar.cc/150?img=2" companyAlt="Company" size="xl" />
          </div>
        ),
        code: `<Avatar src="..." companySrc="..." size="sm" />
<Avatar src="..." companySrc="..." size="md" />
<Avatar src="..." companySrc="..." size="lg" />
<Avatar src="..." companySrc="..." size="xl" />`,
      },
      {
        label: "Placeholder + company badge",
        component: (
          <div className="flex items-center gap-4">
            <Avatar fallback="JD" companyFallback="A" size="sm" />
            <Avatar fallback="JD" companyFallback="A" size="md" />
            <Avatar fallback="JD" companyFallback="A" size="lg" />
            <Avatar fallback="JD" companyFallback="A" size="xl" />
          </div>
        ),
        code: `<Avatar fallback="JD" companyFallback="A" size="sm" />
<Avatar fallback="JD" companyFallback="A" size="md" />
<Avatar fallback="JD" companyFallback="A" size="lg" />
<Avatar fallback="JD" companyFallback="A" size="xl" />`,
      },
    ],
  },
  // ── Toast ──────────────────────────────────────────────────────────────
  {
    slug: "toast",
    name: "Toast",
    description: "Transient notification messages stacked at the bottom-right. Wrap your app in ToastProvider and call useToast() to trigger them programmatically.",
    category: "Components",
    props: [
      { name: "title", type: "string", required: true, description: "Main notification text." },
      { name: "description", type: "string", description: "Optional supporting text." },
      { name: "variant", type: '"default" | "success" | "error" | "warning" | "info"', default: '"default"', description: "Sets the icon and accent color." },
      { name: "duration", type: "number", default: "4000", description: "Auto-dismiss delay in ms." },
    ],
    examples: [
      {
        label: "Variants",
        component: (
          <div className="flex flex-col gap-2 w-[320px]">
            <Toast toast={{ id: "1", title: "Changes saved", variant: "success" }} />
            <Toast toast={{ id: "2", title: "Something went wrong", description: "Please try again.", variant: "error" }} />
            <Toast toast={{ id: "3", title: "Action required", description: "Your session is about to expire.", variant: "warning" }} />
            <Toast toast={{ id: "4", title: "New update available", variant: "info" }} />
            <Toast toast={{ id: "5", title: "Copied to clipboard" }} />
          </div>
        ),
        code: `// Wrap your app:
<ToastProvider>
  <App />
</ToastProvider>

// Inside any component:
const { toast } = useToast();
toast({ title: "Changes saved", variant: "success" });
toast({ title: "Error", description: "Try again.", variant: "error" });`,
      },
    ],
  },
  // ── Modal ──────────────────────────────────────────────────────────────
  {
    slug: "modal",
    name: "Modal",
    description: "A centered overlay dialog with backdrop blur. Supports title, description, scrollable content, and a sticky footer.",
    category: "Components",
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls visibility." },
      { name: "onClose", type: "() => void", required: true, description: "Called when backdrop or Escape is pressed." },
      { name: "title", type: "string", description: "Dialog title." },
      { name: "description", type: "string", description: "Supporting description below the title." },
      { name: "children", type: "React.ReactNode", description: "Dialog body content." },
      { name: "footer", type: "React.ReactNode", description: "Action buttons rendered in a sticky footer." },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Maximum width of the dialog." },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="relative w-full max-w-md mx-auto">
            <div className="rounded-card border border-stroke bg-surface shadow-xl">
              <div className="flex items-start justify-between gap-4 border-b border-stroke px-5 py-4">
                <div>
                  <p className="text-[15px] font-[500] leading-[1.3] tracking-[-0.02em] text-ink">Delete project</p>
                  <p className="mt-1 text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted">This action cannot be undone.</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted">All data associated with this project will be permanently deleted. Are you sure you want to continue?</p>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-stroke bg-surface-2 px-5 py-3 rounded-b-card">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          </div>
        ),
        code: `const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project"
  description="This action cannot be undone."
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </>
  }
>
  <p>All data will be permanently deleted.</p>
</Modal>`,
      },
    ],
  },
  // ── Alert ──────────────────────────────────────────────────────────────
  {
    slug: "alert",
    name: "Alert",
    description: "Inline status banners for info, success, warning, and error states. Optional dismiss button.",
    category: "Components",
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "Sets the color and icon." },
      { name: "title", type: "string", description: "Bold heading text." },
      { name: "description", type: "string", description: "Supporting body text." },
      { name: "onDismiss", type: "() => void", description: "When provided, shows a close button." },
    ],
    examples: [
      {
        label: "Variants",
        component: <AlertExamples />,
        code: `<Alert variant="info" title="New features available" description="Check the changelog." />
<Alert variant="success" title="Payment confirmed" description="Subscription activated." />
<Alert variant="warning" title="Approaching limit" onDismiss={() => dismiss()} />
<Alert variant="danger" title="Authentication failed" onDismiss={() => dismiss()} />`,
      },
    ],
  },
  // ── Skeleton ───────────────────────────────────────────────────────────
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Pulsing loading placeholder shapes. Use rect, text, or circle variants to mirror the content they replace.",
    category: "Components",
    props: [
      { name: "variant", type: '"rect" | "text" | "circle"', default: '"rect"', description: "Shape of the skeleton." },
      { name: "width", type: "string | number", description: "Width (number = px, string = any CSS unit)." },
      { name: "height", type: "string | number", description: "Height (number = px, string = any CSS unit)." },
    ],
    examples: [
      {
        label: "Card skeleton",
        component: (
          <div className="w-[280px] rounded-card border border-stroke bg-surface p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" width={36} height={36} />
              <div className="flex-1 flex flex-col gap-1.5">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </div>
            </div>
            <Skeleton variant="rect" height={80} />
            <div className="flex gap-2">
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="20%" />
            </div>
          </div>
        ),
        code: `<Skeleton variant="circle" width={36} height={36} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="rect" height={80} />`,
      },
    ],
  },
  // ── Progress ───────────────────────────────────────────────────────────
  {
    slug: "progress",
    name: "Progress",
    description: "Linear progress bar and Spinner. The bar accepts a value (0–max) with optional label. Spinner is a lightweight animated icon.",
    category: "Components",
    props: [
      { name: "value", type: "number", required: true, description: "Current progress value." },
      { name: "max", type: "number", default: "100", description: "Maximum value." },
      { name: "variant", type: '"default" | "success" | "warning" | "danger"', default: '"default"', description: "Fill color." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Track height." },
      { name: "showLabel", type: "boolean", description: "Show percentage label at trailing edge." },
    ],
    examples: [
      {
        label: "Progress bar",
        component: (
          <div className="flex flex-col gap-3 w-[280px]">
            <Progress value={60} showLabel />
            <Progress value={80} variant="success" showLabel />
            <Progress value={40} variant="warning" showLabel />
            <Progress value={20} variant="danger" showLabel />
            <Progress value={55} size="sm" />
          </div>
        ),
        code: `<Progress value={60} showLabel />
<Progress value={80} variant="success" showLabel />
<Progress value={40} variant="warning" showLabel />`,
      },
      {
        label: "Spinner",
        component: (
          <div className="flex items-center gap-4">
            <Spinner size={14} className="text-ink-muted" />
            <Spinner size={16} className="text-ink" />
            <Spinner size={20} className="text-bronze-400" />
            <Spinner size={24} className="text-ink-muted" />
          </div>
        ),
        code: `<Spinner size={16} className="text-ink" />
<Spinner size={20} className="text-bronze-400" />`,
      },
    ],
  },
  // ── Sheet ──────────────────────────────────────────────────────────────
  {
    slug: "sheet",
    name: "Sheet",
    description: "A slide-in side panel anchored to the left or right edge. Supports title, description, scrollable body, and sticky footer.",
    category: "Components",
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls visibility." },
      { name: "onClose", type: "() => void", required: true, description: "Called when backdrop or Escape is pressed." },
      { name: "title", type: "string", description: "Panel title." },
      { name: "description", type: "string", description: "Supporting description." },
      { name: "children", type: "React.ReactNode", description: "Panel body content." },
      { name: "footer", type: "React.ReactNode", description: "Sticky footer actions." },
      { name: "side", type: '"right" | "left"', default: '"right"', description: "Which edge the panel slides from." },
      { name: "width", type: "string", default: '"400px"', description: "Panel width." },
    ],
    examples: [
      {
        label: "Preview",
        component: (
          <div className="relative w-full max-w-sm ml-auto">
            <div className="flex flex-col bg-surface border-l border-stroke shadow-xl h-[320px]">
              <div className="flex items-start justify-between gap-4 border-b border-stroke px-5 py-4 shrink-0">
                <div>
                  <p className="text-[15px] font-[500] leading-[1.3] tracking-[-0.02em] text-ink">Edit details</p>
                  <p className="mt-1 text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted">Make changes to this item.</p>
                </div>
              </div>
              <div className="flex-1 px-5 py-4 text-[13px] text-ink-muted">Body content goes here…</div>
              <div className="flex items-center justify-end gap-2 border-t border-stroke bg-surface-2 px-5 py-3">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </div>
            </div>
          </div>
        ),
        code: `const [open, setOpen] = useState(false);

<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Edit details"
  description="Make changes to this item."
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button>Save</Button>
    </>
  }
>
  {/* body */}
</Sheet>`,
      },
    ],
  },
  // ── Accordion ──────────────────────────────────────────────────────────
  {
    slug: "accordion",
    name: "Accordion",
    description: "Collapsible content sections. Supports single-open (default) or multiple-open mode.",
    category: "Components",
    props: [
      { name: "items", type: "AccordionItem[]", required: true, description: "Array of { key, label, content } items." },
      { name: "multiple", type: "boolean", default: "false", description: "When true, multiple items can be open simultaneously." },
      { name: "defaultOpen", type: "string[]", default: "[]", description: "Keys of items open on first render." },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="w-full max-w-md">
            <Accordion
              defaultOpen={["q1"]}
              items={[
                { key: "q1", label: "What is Bond?", content: "Bond is a task and project management platform built for modern teams." },
                { key: "q2", label: "How does billing work?", content: "We offer monthly and annual plans. You can cancel anytime from your account settings." },
                { key: "q3", label: "Can I invite my team?", content: "Yes — invite unlimited teammates on any paid plan. Guests are always free." },
              ]}
            />
          </div>
        ),
        code: `<Accordion
  defaultOpen={["q1"]}
  items={[
    { key: "q1", label: "What is Bond?", content: "Bond is a task management platform." },
    { key: "q2", label: "How does billing work?", content: "Monthly and annual plans available." },
  ]}
/>`,
      },
      {
        label: "Multiple open",
        component: (
          <div className="w-full max-w-md">
            <Accordion
              multiple
              items={[
                { key: "a", label: "Section A", content: "Content for section A." },
                { key: "b", label: "Section B", content: "Content for section B." },
                { key: "c", label: "Section C", content: "Content for section C." },
              ]}
            />
          </div>
        ),
        code: `<Accordion multiple items={items} />`,
      },
    ],
  },
  // ── EmptyState ─────────────────────────────────────────────────────────
  {
    slug: "empty-state",
    name: "Empty State",
    description: "Zero-data placeholder with optional icon, title, description, and a call-to-action.",
    category: "Components",
    props: [
      { name: "title", type: "string", required: true, description: "Primary message." },
      { name: "icon", type: "React.ReactNode", description: "Icon shown above the title in a small rounded container." },
      { name: "description", type: "string", description: "Supporting explanation." },
      { name: "action", type: "React.ReactNode", description: "CTA button or link rendered below the description." },
    ],
    examples: [
      {
        label: "With action",
        component: (
          <div className="rounded-card border border-stroke bg-surface w-full max-w-sm mx-auto">
            <EmptyState
              icon={<RiInboxLine size={18} />}
              title="No messages yet"
              description="When you receive messages they'll appear here."
              action={<Button size="sm">Invite teammates</Button>}
            />
          </div>
        ),
        code: `<EmptyState
  icon={<RiInboxLine size={18} />}
  title="No messages yet"
  description="When you receive messages they'll appear here."
  action={<Button size="sm">Invite teammates</Button>}
/>`,
      },
      {
        label: "Minimal",
        component: (
          <div className="rounded-card border border-stroke bg-surface w-full max-w-sm mx-auto">
            <EmptyState title="Nothing here yet" description="Add your first item to get started." />
          </div>
        ),
        code: `<EmptyState title="Nothing here yet" description="Add your first item to get started." />`,
      },
    ],
  },
  // ── Breadcrumb ─────────────────────────────────────────────────────────
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    description: "Navigational path indicator. The last item is the current page (non-interactive); all preceding items are clickable.",
    category: "Components",
    props: [
      { name: "items", type: "BreadcrumbItem[]", required: true, description: "Array of { label, onClick? } items. Last item is non-interactive." },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <Breadcrumb
            items={[
              { label: "Home" },
              { label: "Projects" },
              { label: "Bond UI" },
              { label: "Components" },
            ]}
          />
        ),
        code: `<Breadcrumb
  items={[
    { label: "Home", onClick: () => router.push("/") },
    { label: "Projects", onClick: () => router.push("/projects") },
    { label: "Bond UI", onClick: () => router.push("/projects/bond") },
    { label: "Components" },
  ]}
/>`,
      },
    ],
  },
  // ── Pagination ─────────────────────────────────────────────────────────
  {
    slug: "pagination",
    name: "Pagination",
    description: "Page navigation with prev/next arrows, numbered pages, and ellipsis for large ranges.",
    category: "Components",
    props: [
      { name: "page", type: "number", required: true, description: "Current active page (1-indexed)." },
      { name: "total", type: "number", required: true, description: "Total number of pages." },
      { name: "onChange", type: "(page: number) => void", required: true, description: "Called when the user navigates to a different page." },
      { name: "siblings", type: "number", default: "1", description: "Number of sibling pages shown on each side of the active page." },
    ],
    examples: [
      {
        label: "Default",
        component: <PaginationDemo initial={5} total={12} />,
        code: `const [page, setPage] = useState(1);
<Pagination page={page} total={12} onChange={setPage} />`,
      },
      {
        label: "Many pages",
        component: <PaginationDemo initial={15} total={50} siblings={2} />,
        code: `<Pagination page={page} total={50} onChange={setPage} siblings={2} />`,
      },
    ],
  },
  // ── StatCard ───────────────────────────────────────────────────────────
  {
    slug: "stat-card",
    name: "Stat Card",
    description: "Metric display card with a large value, label, optional trend indicator, and icon.",
    category: "Sections",
    props: [
      { name: "label", type: "string", required: true, description: "Short metric label." },
      { name: "value", type: "string | number", required: true, description: "The main displayed value." },
      { name: "trend", type: "number", description: "Percentage change. Positive = up (green), negative = down (red)." },
      { name: "trendLabel", type: "string", description: "Label next to the trend (e.g. \"vs last month\")." },
      { name: "icon", type: "React.ReactNode", description: "Icon shown in the top-right corner." },
      { name: "className", type: "string", description: "Additional Tailwind classes." },
    ],
    examples: [
      {
        label: "Default",
        component: (
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            <StatCard label="Total revenue" value="$48,200" trend={12.5} trendLabel="vs last month" icon={<RiBarChartLine size={15} />} />
            <StatCard label="Active users" value="1,284" trend={-3.2} trendLabel="vs last week" icon={<RiGroupLine size={15} />} />
            <StatCard label="New signups" value="342" trend={8} trendLabel="this week" />
            <StatCard label="Churn rate" value="2.1%" trend={-0.4} trendLabel="vs last month" />
          </div>
        ),
        code: `<StatCard
  label="Total revenue"
  value="$48,200"
  trend={12.5}
  trendLabel="vs last month"
  icon={<RiBarChartLine size={15} />}
/>`,
      },
    ],
  },
  // ── SettingsLayout ─────────────────────────────────────────────────────
  {
    slug: "settings-layout",
    name: "Settings Layout",
    description: "Two-column settings page layout with a vertical nav sidebar and a content area. Includes SettingsSectionCard and SettingsRow helpers.",
    category: "Sections",
    props: [
      { name: "sections", type: "SettingsSection[]", required: true, description: "Array of { id, label, icon? } nav items." },
      { name: "activeSection", type: "string", required: true, description: "The id of the currently visible section." },
      { name: "onSectionChange", type: "(id: string) => void", required: true, description: "Called when the user clicks a nav item." },
      { name: "children", type: "React.ReactNode", required: true, description: "Content rendered in the right column." },
    ],
    examples: [
      {
        label: "Default",
        component: <SettingsLayoutDemo />,
        code: `const [active, setActive] = useState("profile");

<SettingsLayout
  sections={[
    { id: "profile", label: "Profile", icon: <RiUser3Line size={14} /> },
    { id: "security", label: "Security", icon: <RiLockLine size={14} /> },
  ]}
  activeSection={active}
  onSectionChange={setActive}
>
  {active === "profile" && (
    <SettingsSectionCard
      title="Profile"
      description="Update your personal information."
      footer={<Button>Save changes</Button>}
    >
      <SettingsRow label="Full name" description="Shown on your public profile">
        <Input placeholder="Jane Smith" />
      </SettingsRow>
    </SettingsSectionCard>
  )}
</SettingsLayout>`,
      },
    ],
  },
];

export function getEntry(slug: string): ComponentEntry | undefined {
  return registry.find((c) => c.slug === slug);
}

export function getCategories(): Record<string, ComponentEntry[]> {
  return registry.reduce<Record<string, ComponentEntry[]>>((acc, entry) => {
    if (!acc[entry.category]) acc[entry.category] = [];
    acc[entry.category].push(entry);
    return acc;
  }, {});
}
