"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "", role_code: "user" as "user" | "admin" | "staff" | "courier"});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    const res = await authApi.register(form);
    setLoading(false);
    if (!res.result) return setErr(res.message || "Register gagal");
    alert("Register berhasil, silakan login");
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-border shadow-soft p-6">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <Input label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Role</span>
          <select
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            value={form.role_code}
            onChange={(e) => setForm({ ...form, role_code: e.target.value as any })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Button type="submit" loading={loading}>Register</Button>
      </form>
    </div>
  );
}