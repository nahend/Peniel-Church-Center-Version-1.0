import { GlassCard, Pill } from "@peniel/ui";

async function getSummary() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/dashboard/summary`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  const summary = await getSummary();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center gap-3">
        <Pill>Admin Dashboard</Pill>
        <h1 className="text-4xl font-semibold text-white">Church Center Overview</h1>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Pending Members", value: summary?.pendingMembers ?? "—" },
          { label: "Purchase Requests", value: summary?.purchaseRequests ?? "—" },
          { label: "Budget Requests", value: summary?.budgetRequests ?? "—" },
          { label: "Program Requests", value: summary?.programRequests ?? "—" },
          { label: "Active Giving Methods", value: summary?.activeGivingMethods ?? "—" },
          { label: "Website Translations", value: summary?.translations ?? "—" }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{metric.label}</p>
            <p className="mt-6 text-4xl font-semibold text-white">{metric.value}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}
