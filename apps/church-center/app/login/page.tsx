"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GlassCard, Input, Button } from "@peniel/ui";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const [status, setStatus] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (response.ok) {
      const redirectTo = new URL(window.location.href).searchParams.get("redirectTo") || "/dashboard";
      window.location.href = redirectTo;
    } else {
      const data = await response.json();
      setStatus(data?.error || "Unable to sign in. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <GlassCard className="w-full max-w-xl p-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Church Center Access</p>
          <h1 className="text-4xl font-semibold text-white">Sign in to Peniel Church Center</h1>
          <p className="text-slate-400">Secure administrative access for church staff and leadership teams.</p>
        </div>
        <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-slate-200">Email</label>
            <Input type="email" {...register("email")} placeholder="admin@penielchurchcenter.org" />
            {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200">Password</label>
            <Input type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in"}</Button>
          {status ? <p className="text-sm text-rose-300">{status}</p> : null}
        </form>
      </GlassCard>
    </main>
  );
}
