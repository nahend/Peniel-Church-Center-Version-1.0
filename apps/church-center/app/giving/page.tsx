import { GlassCard, Shell } from "@peniel/ui/index";

export default function Page() {
  return (
    <Shell>
      <h1 className="text-4xl font-semibold">Giving</h1>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <GlassCard><h2 className="text-2xl font-medium">Operations</h2><p className="mt-3 text-slate-300">Role-secured tools for managing giving, validation, workflow transitions, and audit history.</p></GlassCard>
        <GlassCard><h2 className="text-2xl font-medium">Controls</h2><p className="mt-3 text-slate-300">Production controls for filtering, exporting, publishing, enabling, disabling, reordering, and permission-aware updates.</p></GlassCard>
      </div>
    </Shell>
  );
}
