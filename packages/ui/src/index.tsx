import type { ReactNode } from "react";
export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur ${className}`}>{children}</section>; }
export function Pill({ children }: { children: ReactNode }) { return <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">{children}</span>; }
