"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, GlassCard, Input, Textarea } from "@peniel/ui";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10)
});

type FormValues = z.infer<typeof schema>;

export default function BecomeMember() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus(null);
    const response = await fetch("/api/member-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (response.ok) {
      setStatus("Your registration request has been submitted. A pastor will contact you soon.");
    } else {
      const data = await response.json();
      setStatus(data?.error || "Unable to submit registration. Please try again.");
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Become a Member</p>
        <h1 className="text-4xl font-semibold text-white">Start your membership journey with Peniel Church.</h1>
        <p className="max-w-3xl text-slate-300">Complete the form below and our leadership team will follow up with membership approval and next steps.</p>
      </div>
      <GlassCard className="mt-10 p-8">
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
            <Input {...register("fullName")} placeholder="John Doe" />
            {errors.fullName && <p className="mt-2 text-sm text-rose-400">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
            <Input {...register("email")} placeholder="john@example.com" />
            {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Phone</label>
            <Input {...register("phone")} placeholder="+11234567890" />
            {errors.phone && <p className="mt-2 text-sm text-rose-400">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Message</label>
            <Textarea {...register("message")} placeholder="Tell us about your family and your interest in membership." />
            {errors.message && <p className="mt-2 text-sm text-rose-400">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Registration"}</Button>
          {status ? <p className="text-sm text-slate-200">{status}</p> : null}
        </form>
      </GlassCard>
    </main>
  );
}
