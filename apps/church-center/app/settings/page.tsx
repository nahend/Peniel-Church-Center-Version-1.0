"use client";
import { useEffect, useState } from "react";
import { GlassCard, Button, Input, Textarea } from "@peniel/ui";

export default function SettingsPage() {
  const [settings, setSettings] = useState({ churchName: "Peniel Ethiopian Evangelical Church", primaryColor: "#06b6d4", secondaryColor: "#818cf8", footerText: "Peniel Church Center" });

  useEffect(() => {
    fetch("/api/website").then((res) => res.json()).then((data) => setSettings(data));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Settings</h1>
          <p className="mt-2 text-slate-400">Configure church details, theme, navigation, and social links.</p>
        </div>
        <Button type="button">Save Changes</Button>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-6">
          <label className="text-sm font-medium text-slate-200">Church Name</label>
          <Input value={settings.churchName} readOnly />
        </GlassCard>
        <GlassCard className="p-6">
          <label className="text-sm font-medium text-slate-200">Primary Color</label>
          <Input value={settings.primaryColor} readOnly />
        </GlassCard>
        <GlassCard className="p-6">
          <label className="text-sm font-medium text-slate-200">Secondary Color</label>
          <Input value={settings.secondaryColor} readOnly />
        </GlassCard>
        <GlassCard className="p-6">
          <label className="text-sm font-medium text-slate-200">Footer Text</label>
          <Textarea value={settings.footerText} readOnly />
        </GlassCard>
      </div>
    </main>
  );
}
