"use client";
import { useEffect, useState } from "react";
import { GlassCard, Button, Input, Select } from "@peniel/ui";
import type { TranslationRecord } from "@peniel/types";

export default function LanguagesPage() {
  const [translations, setTranslations] = useState<TranslationRecord[]>([]);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    fetch("/api/languages").then((res) => res.json()).then((data) => setTranslations(data.items ?? []));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Languages</h1>
          <p className="mt-2 text-slate-400">Manage translation records and bilingual content for the website.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={locale} onChange={(event) => setLocale(event.target.value)}>
            <option value="en">English</option>
            <option value="am">Amharic</option>
            <option value="ti">Tigrinya</option>
          </Select>
          <Button type="button">Add Translation</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-4">
        {translations.map((record) => (
          <GlassCard key={record.id} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{record.key}</h2>
              <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{record.locale}</span>
            </div>
            <p className="mt-3 text-slate-300">{record.value}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}
