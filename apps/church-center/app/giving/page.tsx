"use client";
import { useEffect, useState } from "react";
import { Button, GlassCard, Input, Select, Textarea } from "@peniel/ui";
import type { GivingMethod } from "@peniel/types";

export default function GivingPage() {
  const [methods, setMethods] = useState<GivingMethod[]>([]);

  useEffect(() => {
    fetch("/api/giving").then((res) => res.json()).then((data) => setMethods(data.methods ?? []));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Giving</h1>
          <p className="mt-2 text-slate-400">Configure giving channels, links, and presentation order without code changes.</p>
        </div>
        <Button type="button">Add Method</Button>
      </div>
      <div className="mt-8 grid gap-4">
        {methods.length ? methods.map((method) => (
          <GlassCard key={method.id} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">{method.name}</h2>
              <div className="flex gap-2">
                <Button type="button" variant="secondary">Edit</Button>
                <Button type="button" variant="ghost">Disable</Button>
              </div>
            </div>
            <p className="mt-4 text-slate-300">{method.instructions}</p>
            {method.url ? <p className="mt-3 text-sm text-slate-400">URL: {method.url}</p> : null}
          </GlassCard>
        )) : <GlassCard><p className="text-slate-300">No giving methods configured yet.</p></GlassCard>}
      </div>
    </main>
  );
}
