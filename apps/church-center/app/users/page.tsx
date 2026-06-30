"use client";
import { useEffect, useState } from "react";
import { GlassCard, Button } from "@peniel/ui";
import type { Role } from "@peniel/types";

type UserInfo = { username: string; email?: string; role?: Role; createdAt?: string };

export default function UsersPage() {
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    fetch("/api/users").then((res) => res.json()).then((data) => setUsers(data.users ?? []));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Users</h1>
          <p className="mt-2 text-slate-400">Invite church leaders and manage role-based access for the Church Center.</p>
        </div>
        <Button type="button">Invite User</Button>
      </div>
      <div className="mt-8 grid gap-4">
        {users.length ? users.map((user) => (
          <GlassCard key={user.username} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-white">{user.email ?? user.username}</p>
                <p className="text-sm text-slate-400">{user.role ?? "Role not set"}</p>
              </div>
              <p className="text-sm text-slate-500">Joined {user.createdAt ?? "unknown"}</p>
            </div>
          </GlassCard>
        )) : <GlassCard><p className="text-slate-300">No users have been invited yet.</p></GlassCard>}
      </div>
    </main>
  );
}
