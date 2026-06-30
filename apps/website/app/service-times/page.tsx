import { GlassCard } from "@peniel/ui";

const services = [
  { title: "Sunday Morning Worship", time: "9:30 AM - 11:30 AM", language: "Amharic & English", location: "Main Sanctuary" },
  { title: "Wednesday Prayer", time: "7:00 PM - 8:30 PM", language: "Amharic", location: "Prayer Hall" },
  { title: "Youth Fellowship", time: "5:30 PM - 7:00 PM", language: "English", location: "Youth Center" }
];

export default function ServiceTimes() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Service Times</p>
        <h1 className="text-4xl font-semibold text-white">Join worship and fellowship every week.</h1>
        <p className="max-w-3xl text-slate-300">Find the worship service that fits your family, whether you prefer English, Amharic, or blended praise and teaching.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <GlassCard key={service.title} className="p-8">
            <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
            <p className="mt-4 text-slate-300">{service.time}</p>
            <p className="mt-2 text-slate-300">{service.language}</p>
            <p className="mt-2 text-slate-400">{service.location}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}
