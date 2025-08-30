"use client";

import { useEffect, useState } from "react";
import { logisticsApi } from "@/lib/api";
import Button from "@/app/components/ui/Button";
import { RequireAdmin } from "@/app/components/guards";

type Shipment = {
  id: string;
  tracking_number: string;
  item_description: string;
  status: "Created" | "Shipped" | "InTransit" | "Delivered" | "Cancelled";
};

const STATUSES = ["Shipped","InTransit","Delivered","Cancelled"] as const;

export default function AdminPage() {
  const [ships, setShips] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await logisticsApi.listShipments();
    if (res.result) setShips(res.data as Shipment[]);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function update(tracking: string, status: typeof STATUSES[number]) {
    const r = await logisticsApi.updateStatus(tracking, status);
    if (!r.result) return alert(r.message);
    load();
  }

  return (
    <RequireAdmin>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        {loading ? <p>Loading...</p> : (
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="py-2">Tracking</th>
                <th>Item</th>
                <th>Status</th>
                <th className="w-1 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ships.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">{s.tracking_number}</td>
                  <td>{s.item_description}</td>
                  <td>{s.status}</td>
                  <td className="flex flex-wrap gap-2 py-2">
                    {STATUSES.map(st => (
                      <Button key={st} onClick={() => update(s.tracking_number, st)}>{st}</Button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RequireAdmin>
  );
}
