"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null; // kalau di halaman "/"

  let href = "";
  return (
    <nav className="text-sm text-slate-600 mb-4">
      <Link href="/" className="hover:underline">Home</Link>
      {parts.map((part, idx) => {
        href += `/${part}`;
        const label = part
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        const isLast = idx === parts.length - 1;

        return (
          <span key={href}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
