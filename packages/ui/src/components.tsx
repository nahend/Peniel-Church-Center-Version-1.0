import type { ReactNode } from "react";
import { cn } from "@peniel/utils";

interface ShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("glass-panel p-6", className)}>{children}</section>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">{children}</span>;
}

export function Button({ children, className = "", variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";
  const variantClasses = variant === "primary"
    ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
    : variant === "secondary"
      ? "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
      : "text-slate-200 hover:text-white";

  return (
    <button className={cn(base, variantClasses, className)} {...props}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-sm shadow-black/20 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20", props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("w-full min-h-[130px] rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-sm shadow-black/20 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-sm shadow-black/20 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20", props.className)} />;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">{children}</span>;
}

export function SectionHeader({ title, description }: ShellProps) {
  return (
    <div className="mb-6">
      {title ? <h2 className="text-3xl font-semibold tracking-tight text-slate-100">{title}</h2> : null}
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
      <aside className="glass-panel flex min-h-screen flex-col gap-6 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Peniel Church Center</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">Admin Console</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Manage people, requests, giving, media, translations, and settings from one secure portal.</p>
        </div>
        <nav className="mt-8 flex flex-col gap-2 text-sm text-slate-200">
          {[
            ["/dashboard", "Dashboard"],
            ["/people", "People"],
            ["/requests", "Requests"],
            ["/giving", "Giving"],
            ["/media", "Media"],
            ["/languages", "Languages"],
            ["/users", "Users"],
            ["/website", "Website"],
            ["/settings", "Settings"]
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-2xl px-4 py-3 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
