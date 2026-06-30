"use client";
import { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, GlassCard, Input, Select, Textarea } from "@peniel/ui";
import { personSchema } from "@peniel/forms";
import type { Person } from "@peniel/types";

type FormValues = z.infer<typeof personSchema>;

const groups = ["Adult", "Young Adult", "Children Ministry"] as const;
export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [mode, setMode] = useState<"list" | "create">("list");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      fullName: "",
      gender: "female",
      occupation: "",
      phone: "",
      address: "",
      spouse: "",
      children: [],
      group: "Adult",
      ministries: [],
      privateNotes: ""
    }
  });

  useEffect(() => { fetch("/api/people").then((res) => res.json()).then((data) => setPeople(data.items ?? [])); }, []);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const response = await fetch("/api/people", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (response.ok) {
      const newPerson = await response.json();
      setPeople((current) => [newPerson, ...current]);
      reset();
      setMode("list");
    }
  };

  const activePeople = useMemo(() => people.filter((person) => person.status !== "ARCHIVED"), [people]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">People</h1>
          <p className="mt-2 text-slate-400">Manage members, visitors, and pending approvals with streamlined member workflows.</p>
        </div>
        <Button type="button" onClick={() => setMode(mode === "list" ? "create" : "list")}>{mode === "list" ? "Add Member" : "Back to Directory"}</Button>
      </div>
      {mode === "create" ? (
        <GlassCard className="mt-8 p-8">
          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
                <Input {...register("fullName")} placeholder="Alem Tesfaye" />
                {errors.fullName && <p className="mt-2 text-sm text-rose-400">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Phone</label>
                <Input {...register("phone")} placeholder="+15101234567" />
                {errors.phone && <p className="mt-2 text-sm text-rose-400">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Gender</label>
                <Select {...register("gender")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Group</label>
                <Select {...register("group")}>
                  {groups.map((group) => (<option key={group} value={group}>{group}</option>))}
                </Select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Address</label>
              <Textarea {...register("address")} placeholder="Addis Ababa, Ethiopia" />
              {errors.address && <p className="mt-2 text-sm text-rose-400">{errors.address.message}</p>}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Occupation</label>
                <Input {...register("occupation")} placeholder="Business Owner" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Spouse</label>
                <Input {...register("spouse")} placeholder="Selamawit Gebre" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Children</label>
              <Input {...register("children")} placeholder="Martha, Daniel" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Private Notes</label>
              <Textarea {...register("privateNotes")} placeholder="Existing member of youth team." />
            </div>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Member"}</Button>
          </form>
        </GlassCard>
      ) : (
        <div className="mt-8 grid gap-4">
          {activePeople.length ? (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-xl shadow-black/20">
              <table className="w-full min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
                <thead className="bg-slate-950/90 text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Group</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activePeople.map((person) => (
                    <tr key={person.id} className="border-t border-slate-800/70 hover:bg-white/5">
                      <td className="px-6 py-4">{person.fullName}</td>
                      <td className="px-6 py-4">{person.phone}</td>
                      <td className="px-6 py-4">{person.group}</td>
                      <td className="px-6 py-4">{person.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <GlassCard><p className="text-slate-300">No members found. Use Add Member to create your first record.</p></GlassCard>
          )}
        </div>
      )}
    </main>
  );
}
