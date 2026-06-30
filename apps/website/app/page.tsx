import Link from "next/link";
import { GlassCard, Pill } from "@peniel/ui";

const features = [
  {
    title: "Bilingual worship experience",
    description: "English and Amharic pages, service schedules, and ministry updates for every member of the Peniel community."
  },
  {
    title: "Member registration",
    description: "Register visitors and pending members with approval workflows, contact capture, and community follow-up."
  },
  {
    title: "Secure giving",
    description: "Support the church with multiple payment channels, configurable giving methods, and clear donation instructions."
  }
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <section className="grid gap-10 xl:grid-cols-[1.65fr_1fr]">
        <div className="space-y-8">
          <Pill>Peniel Ethiopian Evangelical Church</Pill>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-6xl">A modern bilingual church home for worship, connection, and service.</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">Explore ministries, service times, online giving, and member registration built for English and Amharic speakers.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/become-member" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Become a Member</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
        <div className="grid gap-4">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="p-8">
              <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-4 text-slate-300">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <GlassCard className="p-8">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Church Center</p>
            <h2 className="text-3xl font-semibold text-white">A polished digital home for Peniel church leadership.</h2>
            <p className="text-slate-300">The authenticated admin console manages members, requests, giving methods, media, translations, and website content from one secure portal.</p>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-400">
            <p>• Member approvals and visitor intake.</p>
            <p>• Purchase, budget, and program request workflows.</p>
            <p>• Configurable giving channels with no code updates.</p>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h3 className="text-xl font-semibold text-white">Quick links</h3>
          <div className="mt-6 grid gap-3">
            {[
              ["/about", "About"],
              ["/mission", "Our Mission"],
              ["/service-times", "Service Times"],
              ["/ministries", "Ministries"],
              ["/watch-live", "Watch Live"],
              ["/give", "Give"],
              ["/become-member", "Become Member"],
              ["/contact", "Contact"]
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-3xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">{label}</Link>
            ))}
          </div>
        </GlassCard>
      </section>
    </main>
  );
}
