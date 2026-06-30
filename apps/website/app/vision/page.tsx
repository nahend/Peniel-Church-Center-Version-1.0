import { GlassCard } from "@peniel/ui";

export default function Vision() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Vision</p>
        <h1 className="text-4xl font-semibold text-white">A thriving bilingual church rooted in family, worship, and outreach.</h1>
        <p className="max-w-3xl text-slate-300">Peniel Church envisions a community where church members walk together in faith, serve one another, and share God’s love in both Amharic and English.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold text-white">Connected families</h2>
          <p className="mt-4 text-slate-300">Strengthening families through ministries, discipleship programs, and worship for all ages.</p>
        </GlassCard>
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold text-white">Growing influence</h2>
          <p className="mt-4 text-slate-300">Building a church that connects culturally and spiritually across the Ethiopian diaspora.</p>
        </GlassCard>
      </div>
    </main>
  );
}
