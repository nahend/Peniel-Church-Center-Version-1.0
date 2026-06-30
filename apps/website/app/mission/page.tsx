import { GlassCard } from "@peniel/ui";

export default function Mission() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Mission</p>
        <h1 className="text-4xl font-semibold text-white">Living faith through grace, service, and unity.</h1>
        <p className="max-w-3xl text-slate-300">Our mission is to help every member grow in faith, participate in ministry, and serve the community with love and humility. We invest in worship, discipleship, and outreach for families of all backgrounds.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          ["Worship", "Deep praise and teaching for both Amharic and English congregations."],
          ["Care", "Support for families, prayer groups, and pastoral counseling."],
          ["Outreach", "Practical service through community projects and mission efforts."]
        ].map(([title, description]) => (
          <GlassCard key={title} className="p-8">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <p className="mt-4 text-slate-300">{description}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}
