import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 text-slate-50">{children}</main>;
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}>
      {children}
    </section>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">{children}</span>;
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <GlassCard>
      <p className="text-sm text-slate-400">{label}</p>
      <strong className="mt-3 block text-3xl tracking-tight">{value}</strong>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </GlassCard>
  );
}
