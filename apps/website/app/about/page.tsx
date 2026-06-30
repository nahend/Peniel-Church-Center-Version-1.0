import { GlassCard } from "@peniel/ui";
import Link from "next/link";

export default function About() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">About Peniel Church</p>
        <h1 className="text-4xl font-semibold text-white">A bilingual community grounded in worship, care, and outreach.</h1>
        <p className="max-w-3xl text-slate-300">Peniel Ethiopian Evangelical Church is a bridge between English and Amharic speakers. We honor tradition with contemporary ministry, encouraging spiritual growth, family support, and global mission.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold text-white">Our story</h2>
          <p className="mt-4 text-slate-300">Established as a spiritual home for the Ethiopian diaspora, Peniel Church supports members with Sunday worship, Bible studies, youth ministry, and social outreach.</p>
        </GlassCard>
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold text-white">Our promise</h2>
          <p className="mt-4 text-slate-300">We are committed to authentic worship, strong families, and accessible ministry. Our bilingual Church Center ensures every member can participate, contribute, and connect.</p>
        </GlassCard>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/service-times" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">View Service Times</Link>
        <Link href="/become-member" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">Join the Church</Link>
      </div>
    </main>
  );
}
