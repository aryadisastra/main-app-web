"use client";

import { useState } from "react";
import { logisticsApi } from "@/lib/api";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { RequireAuth } from "@/app/components/guards";

export default function TrackPage() {
  const [tracking, setTracking] = useState("");
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setRes(null);
    const r = await logisticsApi.track(tracking);
    if (!r.result) return setErr(r.message || "Not found");
    setRes(r.data);
  }

  return (
    <RequireAuth>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Track Shipment</h1>
        <form onSubmit={submit} className="flex gap-2 max-w-md">
          <Input placeholder="Tracking Number" value={tracking} onChange={e=>setTracking(e.target.value)} />
          <Button type="submit">Track</Button>
        </form>
        {err && <p className="text-sm text-red-600">{err}</p>}
        {res && (
          <div className="card">
            <div className="card-body space-y-1">
              <p><b>Tracking:</b> {res.tracking_number}</p>
              <p><b>Item:</b> {res.item_description}</p>
              <p><b>Status:</b> {res.status}</p>
              <p className="text-xs text-muted-fg">From {res.sender_name} → {res.receiver_name}</p>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
