import { GlassCard } from "@peniel/ui";

const ministries = [
  { title: "Adult Ministry", description: "Teaching, fellowship, and practical support for church adults." },
  { title: "Young Adult Ministry", description: "Leadership development, worship, and service for emerging adults." },
  { title: "Children Ministry", description: "Engaging children in faith, Bible stories, and joyful worship." }
];

export default function Ministries() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Ministries</p>
        <h1 className="text-4xl font-semibold text-white">Serve your family and our church through focused ministries.</h1>
        <p className="max-w-3xl text-slate-300">Peniel Church supports every age with programs for adults, young adults, and children ministry teams.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {ministries.map((item) => (
          <GlassCard key={item.title} className="p-8">
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-slate-300">{item.description}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}
