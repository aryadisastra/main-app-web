"use client";
import { ReactNode, useEffect, useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  return { msg, show: (m: string) => setMsg(m), clear: () => setMsg(null) };
}

export function Toast({ open, children, onClose }: { open: boolean; children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full bg-slate-900 text-white px-4 py-2 shadow-lg text-sm">{children}</div>
    </div>
  );
}
