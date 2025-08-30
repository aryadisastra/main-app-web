"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/lib/auth";

function Gate({ children, check }: { children: ReactNode; check: () => "ok"|"login"|"denied" }) {
  const router = useRouter();
  const [state, setState] = useState<"checking"|"ok">("checking");

  useEffect(() => {
    const verdict = check();
    if (verdict === "ok") setState("ok");
    else if (verdict === "login") router.replace("/login");
    else router.replace("/dashboard"); // denied (non-admin ke dashboard)
  }, [router, check]);

  if (state === "checking") return <div className="p-6 text-sm text-slate-500">Checking session…</div>;
  return <>{children}</>;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  return (
    <Gate
      check={() => (authStore.token ? "ok" : "login")}
    >
      {children}
    </Gate>
  );
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  return (
    <Gate
      check={() => {
        if (!authStore.token) return "login";
        const p = authStore.profile;
        return p?.role_code === "admin" ? "ok" : "denied";
      }}
    >
      {children}
    </Gate>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const logout = () => { authStore.clear(); router.replace("/login"); };
  return <button className="btn btn-muted text-sm" onClick={logout}>Logout</button>;
}
