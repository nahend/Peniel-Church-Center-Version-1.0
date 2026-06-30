import { GlassCard } from "@peniel/ui";

export default function WatchLive() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Watch Live</p>
        <h1 className="text-4xl font-semibold text-white">Watch Sunday worship from anywhere.</h1>
        <p className="max-w-3xl text-slate-300">Stream worship services live in English and Amharic, and access sermon archives for the whole family.</p>
      </div>
      <GlassCard className="mt-10 p-8">
        <h2 className="text-2xl font-semibold text-white">Live service stream</h2>
        <p className="mt-4 text-slate-300">The YouTube stream and online schedule are managed from the Church Center website module.</p>
      </GlassCard>
    </main>
  );
}
