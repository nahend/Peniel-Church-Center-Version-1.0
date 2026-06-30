import { GlassCard } from "@peniel/ui";
import Link from "next/link";

const methods = [
  { name: "Tithe.ly", details: "Securely give through the church's Tithe.ly account." },
  { name: "Zelle", details: "Send donations to the church's Zelle receiver for fast transfer." },
  { name: "PayPal", details: "Support Peniel Church with PayPal for international gifts." },
  { name: "Venmo", details: "Use Venmo for quick mobile giving to the church." }
];

export default function Give() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Give</p>
        <h1 className="text-4xl font-semibold text-white">Give joyfully and securely to support worship and outreach.</h1>
        <p className="max-w-3xl text-slate-300">Choose the payment method that works best for you, then follow the instructions managed by church leadership.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {methods.map((method) => (
          <GlassCard key={method.name} className="p-8">
            <h2 className="text-2xl font-semibold text-white">{method.name}</h2>
            <p className="mt-4 text-slate-300">{method.details}</p>
          </GlassCard>
        ))}
      </div>
      <div className="mt-10">
        <Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Contact the Giving Team</Link>
      </div>
    </main>
  );
}
