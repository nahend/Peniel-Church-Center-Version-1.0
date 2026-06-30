"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/people", label: "People" },
  { href: "/requests", label: "Requests" },
  { href: "/giving", label: "Giving" },
  { href: "/media", label: "Media" },
  { href: "/languages", label: "Languages" },
  { href: "/website", label: "Website" },
  { href: "/users", label: "Users" },
  { href: "/settings", label: "Settings" }
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hideShell = pathname === "/login";

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-white/10 bg-slate-950/95 px-5 py-6 backdrop-blur lg:border-b-0 lg:border-r lg:w-80 lg:px-6 lg:py-8">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20">PC</div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Peniel Church</p>
              <h1 className="text-xl font-semibold text-white">Admin Center</h1>
            </div>
          </div>

          <nav className="space-y-2 text-sm text-slate-300">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3 transition ${
                    active ? "bg-cyan-400/10 text-cyan-100 shadow-sm shadow-cyan-400/10" : "hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 px-5 py-8 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
