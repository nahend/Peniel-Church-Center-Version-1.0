"use client";
import { useEffect, useState } from "react";
import { GlassCard, Button, Textarea, Input } from "@peniel/ui";

export default function WebsitePage() {
  const [settings, setSettings] = useState({ churchName: "Peniel Ethiopian Evangelical Church", theme: "dark", primaryColor: "#06b6d4", secondaryColor: "#818cf8", footerText: "Peniel Church Center", mapUrl: "", youtubeUrl: "", socialLinks: {} });

  useEffect(() => {
    fetch("/api/website").then((res) => res.json()).then((data) => setSettings(data));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Website</h1>
          <p className="mt-2 text-slate-400">Manage the public website content, navigation, and social links.</p>
        </div>
        <Button type="button">Save Settings</Button>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-6">
          <label className="block text-sm font-medium text-slate-200">Church Name</label>
          <Input value={settings.churchName} readOnly />
        </GlassCard>
        <GlassCard className="p-6">
          <label className="block text-sm font-medium text-slate-200">Footer Text</label>
          <Input value={settings.footerText} readOnly />
        </GlassCard>
      </div>
      <GlassCard className="mt-6 p-6">
        <label className="block text-sm font-medium text-slate-200">Map URL</label>
        <Input value={settings.mapUrl} readOnly />
      </GlassCard>
      <GlassCard className="mt-6 p-6">
        <label className="block text-sm font-medium text-slate-200">YouTube URL</label>
        <Input value={settings.youtubeUrl} readOnly />
      </GlassCard>
      <GlassCard className="mt-6 p-6">
        <label className="block text-sm font-medium text-slate-200">Home page announcement</label>
        <Textarea value={settings.footerText} readOnly />
      </GlassCard>
    </main>
  );
}
