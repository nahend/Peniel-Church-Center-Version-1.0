"use client";
import { useEffect, useState } from "react";
import { Button, GlassCard } from "@peniel/ui";
import type { ChurchRequest } from "@peniel/types";

export default function RequestsPage() {
  const [requests, setRequests] = useState<ChurchRequest[]>([]);

  useEffect(() => {
    fetch("/api/requests").then((res) => res.json()).then((data) => setRequests(data.items ?? []));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Requests</h1>
          <p className="mt-2 text-slate-400">Track purchase, budget, and program approvals with configurable workflows.</p>
        </div>
        <Button type="button">Create Request</Button>
      </div>
      <div className="mt-8 grid gap-4">
        {requests.length ? requests.map((request) => (
          <GlassCard key={request.id} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">{request.type}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{request.title}</h2>
              </div>
              <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{request.status}</span>
            </div>
            <p className="mt-4 text-slate-300">Amount: {request.amount ?? "N/A"}</p>
            <p className="mt-2 text-sm text-slate-400">Current step: {request.currentStep + 1}</p>
          </GlassCard>
        )) : <GlassCard><p className="text-slate-300">No requests created yet.</p></GlassCard>}
      </div>
    </main>
  );
}
