"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { authStore } from "@/lib/auth";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    const res = await authApi.login(form);
    if (!res.result) { setLoading(false); return setErr(res.message || "Login gagal"); }
    authStore.token = res.data.token;

    const me = await authApi.me();
    if (me.result) authStore.profile = me.data;

    setLoading(false);
    router.replace("/dashboard"); // halaman dashboard akan kita buat di Step 4
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-border shadow-soft p-6">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <Input label="Username atau Email" value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Button type="submit" loading={loading}>Login</Button>
      </form>
    </div>
  );
}