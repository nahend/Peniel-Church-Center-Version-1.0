import { GlassCard, Pill, Shell, StatCard } from "@peniel/ui/index";

const publicPages = ["About", "Our Vision", "Our Mission", "Service Times", "Ministries", "Watch Live", "Give", "Become Member", "Contact"];
const ministries = ["Worship", "Prayer", "Children", "Young Adults", "Care", "Media", "Outreach"];

export default function Home() {
  return (
    <Shell>
      <nav className="flex flex-wrap items-center justify-between gap-4">
        <b className="text-lg">Peniel Ethiopian Evangelical Church</b>
        <div className="flex gap-3 text-sm text-slate-300"><span>English</span><span>አማርኛ</span></div>
      </nav>

      <section className="grid gap-8 py-24 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <Pill>Peniel Church Center v1.0</Pill>
          <h1 className="mt-6 max-w-4xl text-6xl font-semibold tracking-tight">A bilingual digital home for worship, community, and service.</h1>
          <p className="mt-6 max-w-2xl text-xl text-slate-300">A production church platform for members, visitors, giving, live worship, media, ministry teams, and Amharic/English communication.</p>
          <div className="mt-8 flex flex-wrap gap-3">{ministries.map((ministry) => <Pill key={ministry}>{ministry}</Pill>)}</div>
        </div>
        <GlassCard>
          <h2 className="text-2xl font-semibold">Sunday Worship</h2>
          <p className="mt-4 text-slate-300">Join us for prayer, teaching, fellowship, and bilingual ministry for every generation.</p>
          <button className="mt-8 rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950">Become a Member</button>
        </GlassCard>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Languages" value="2" detail="English and Amharic today; Tigrinya ready for future expansion." />
        <StatCard label="Giving" value="6" detail="Dynamic payment methods managed without code changes." />
        <StatCard label="Workflows" value="3" detail="Purchase, budget, and program approvals with configurable steps." />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {publicPages.map((page) => <GlassCard key={page}><h3 className="text-xl font-medium">{page}</h3><p className="mt-2 text-sm text-slate-400">Bilingual content, SEO metadata, and Church Center publishing controls.</p></GlassCard>)}
      </section>
    </Shell>
  );
}
