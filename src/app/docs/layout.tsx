import { Sidebar } from "@/components/docs/sidebar";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { BondLogo } from "@/components/docs/logo";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-stroke bg-surface dark:bg-surface-2 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <BondLogo className="text-ink" />
          <span className="text-xs text-ink-muted border border-stroke rounded px-1.5 py-0.5">
            UI kit
          </span>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex pt-14">
        <aside className="fixed left-0 top-14 bottom-0 w-60 overflow-y-auto bg-surface dark:bg-surface-2">
          <Sidebar />
        </aside>

        <main className="ml-60 flex-1 min-h-[calc(100vh-3.5rem)]">
          <div className="max-w-5xl mx-auto px-10 py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
