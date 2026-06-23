import { notFound } from "next/navigation";
import { getEntry, registry } from "@/registry";
import { highlight } from "@/lib/highlight";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { TableOfContents } from "@/components/docs/table-of-contents";

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) notFound();

  const highlightedExamples = await Promise.all(
    entry.examples.map(async (ex) => ({
      ...ex,
      highlightedCode: await highlight(ex.code),
    }))
  );

  const sections = [
    { id: "examples", label: "Examples" },
    ...(entry.props.length > 0 ? [{ id: "props", label: "Props" }] : []),
  ];

  return (
    <div className="relative">
      <div className="fixed right-8 top-24 w-44 hidden xl:block">
        <TableOfContents sections={sections} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-8">
          <h1 className="text-[32px] font-[420] leading-[1.4] tracking-[-0.03em] text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {entry.name}
          </h1>
          <p className="text-ink-muted text-[13px]">{entry.description}</p>
        </div>

        <section id="examples" className="mb-10">
          <h2 className="text-sm font-semibold text-ink mb-4">Examples</h2>
          <div className="space-y-4">
            {highlightedExamples.map((ex) => (
              <ComponentPreview
                key={ex.label}
                label={ex.label}
                component={ex.component}
                highlightedCode={ex.highlightedCode}
                rawCode={ex.code}
              />
            ))}
          </div>
        </section>

        {entry.props.length > 0 && (
          <section id="props">
            <h2 className="text-sm font-semibold text-ink mb-4">Props</h2>
            <PropsTable props={entry.props} />
          </section>
        )}
      </div>
    </div>
  );
}
