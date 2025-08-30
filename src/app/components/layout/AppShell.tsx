"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { authStore } from "@/lib/auth";
import Breadcrumbs from "./Breadcrumbs";

type NavItem = { href: string; label: string };

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // ambil profil/role dari localStorage (client-side only)
  const profile = typeof window !== "undefined" ? authStore.profile : null;
  const role = profile?.role_code as "admin" | "user" | undefined;

  // nav otomatis sembunyikan Admin utk non-admin
  const nav: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/track", label: "Track" },
      ...(role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
    ],
    [role]
  );

  // tutup drawer ketika route berubah
  useEffect(() => setOpen(false), [pathname]);

  const logout = () => {
    authStore.clear();
    router.replace("/login");
  };

  return (
    <div className="app-shell">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center gap-3 p-4">
          <button
            className="lg:hidden btn btn-muted"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>

          <Link href="/" className="font-semibold">
            Main App
          </Link>

          <div className="ml-auto flex items-center gap-3">
            {profile ? (
              <>
                <span className="text-sm text-slate-600">
                  Hi, <b>{profile.username}</b> ({profile.role_code})
                </span>
                <button onClick={logout} className="btn btn-muted text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm">
                  Login
                </Link>
                <Link href="/register" className="text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* GRID */}
      <div className="app-main">
        {/* SIDEBAR */}
        <aside
          className={clsx(
            "border-r bg-white p-4 lg:static lg:translate-x-0 lg:block",
            "fixed inset-y-0 left-0 w-64 z-40 transition-transform",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="space-y-1">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx("nav-link", active && "nav-link-active")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* CONTENT */}
        <section className="min-h-[calc(100vh-64px)]">
          <div className="container mx-auto p-6">
            <Breadcrumbs />
            {children}
          </div>
        </section>
      </div>

      {/* BACKDROP (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
