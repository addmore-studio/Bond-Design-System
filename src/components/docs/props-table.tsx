import { type PropDef } from "@/registry";
import { cn } from "@/lib/utils";

export function PropsTable({ props }: { props: PropDef[] }) {
  if (props.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-card border border-stroke">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-stroke bg-surface-2">
            <th className="px-4 py-3 text-left font-semibold text-ink w-36">Prop</th>
            <th className="px-4 py-3 text-left font-semibold text-ink">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-ink w-28">Default</th>
            <th className="px-4 py-3 text-left font-semibold text-ink">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-b border-stroke/50 last:border-0",
                i % 2 === 1 && "bg-surface-2/50"
              )}
            >
              <td className="px-4 py-3 font-sanstext-xs text-ink font-medium">
                {prop.name}
                {prop.required && <span className="ml-1 text-brand-red">*</span>}
              </td>
              <td className="px-4 py-3 font-sanstext-xs text-bronze-500">{prop.type}</td>
              <td className="px-4 py-3 font-sanstext-xs text-ink-muted">
                {prop.default ?? "-"}
              </td>
              <td className="px-4 py-3 text-ink-muted">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
