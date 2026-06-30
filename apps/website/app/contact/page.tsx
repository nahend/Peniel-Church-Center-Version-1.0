import { GlassCard, Input, Textarea } from "@peniel/ui";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Contact</p>
        <h1 className="text-4xl font-semibold text-white">Reach the Peniel Church family.</h1>
        <p className="max-w-3xl text-slate-300">Questions about service times, giving, membership, or ministry? Send us a message and our team will be in touch.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <GlassCard className="p-8">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Office</p>
              <p className="mt-3 text-slate-300">123 Peniel Road, Community Village, State</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Email</p>
              <p className="mt-3 text-slate-300">info@penielchurchcenter.org</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Phone</p>
              <p className="mt-3 text-slate-300">+1 555 123 4567</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-8">
          <form className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
              <Input placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Message</label>
              <Textarea placeholder="Share your question or prayer request." />
            </div>
            <button type="button" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Send Message</button>
          </form>
        </GlassCard>
      </div>
      <div className="mt-10 text-sm text-slate-400">
        <p>Prefer a direct conversation? <Link href="/become-member" className="text-cyan-300 hover:text-cyan-200">Start membership registration</Link> and our pastors will follow up.</p>
      </div>
    </main>
  );
}
