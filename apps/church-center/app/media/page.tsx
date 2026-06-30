"use client";
import { useEffect, useState } from "react";
import { GlassCard, Button } from "@peniel/ui";
import type { MediaAsset } from "@peniel/types";

export default function MediaPage() {
  const [media, setMedia] = useState<MediaAsset[]>([]);

  useEffect(() => {
    fetch("/api/media").then((res) => res.json()).then((data) => setMedia(data.items ?? []));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Media</h1>
          <p className="mt-2 text-slate-400">Upload and manage images, videos, and documents used across the public site.</p>
        </div>
        <Button type="button">Upload Asset</Button>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {media.length ? media.map((asset) => (
          <GlassCard key={asset.id} className="p-6">
            <h2 className="text-2xl font-semibold text-white">{asset.title}</h2>
            <p className="mt-3 text-slate-300">Type: {asset.type}</p>
            <p className="mt-2 text-sm text-slate-400">{asset.description}</p>
          </GlassCard>
        )) : <GlassCard><p className="text-slate-300">No media assets have been uploaded yet.</p></GlassCard>}
      </div>
    </main>
  );
}
