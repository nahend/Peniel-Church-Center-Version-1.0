import { GlassCard, Pill, Shell, StatCard } from "@peniel/ui/index";

const metrics = [
  { label: "Pending Members", value: "12", detail: "Phone registrations awaiting approval" },
  { label: "Purchase Requests", value: "4", detail: "Currently in workflow review" },
  { label: "Budget Requests", value: "2", detail: "Treasury and chairman queues" },
  { label: "Program Requests", value: "3", detail: "Pastoral review required" },
  { label: "Notifications", value: "18", detail: "Email and in-app messages" },
  { label: "Website Analytics", value: "1.8k", detail: "Visits this month" },
];

export default function Dashboard() {
  return (
    <Shell>
      <Pill>Super Admin Console</Pill>
      <h1 className="mt-6 text-5xl font-semibold">Church Center Dashboard</h1>
      <p className="mt-4 max-w-2xl text-slate-300">Operational command center for people, workflows, giving, media, languages, users, audit logs, and website publishing.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">{metrics.map((metric) => <StatCard key={metric.label} {...metric} />)}</div>
      <GlassCard className="mt-8"><h2 className="text-2xl font-semibold">Recent Activity</h2><p className="mt-3 text-slate-300">Audit-backed timeline for approvals, imports, invitations, publishing, and settings changes.</p></GlassCard>
    </Shell>
  );
}
