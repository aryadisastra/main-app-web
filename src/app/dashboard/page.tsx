"use client";

import { useEffect, useState } from "react";
import { logisticsApi } from "@/lib/api";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { RequireAuth } from "@/app/components/guards";

type Shipment = {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  receiver_name: string;
  receiver_address: string;
  item_description: string;
  status: "Created" | "Shipped" | "InTransit" | "Delivered" | "Cancelled";
};

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    sender_name: "",
    sender_address: "",
    receiver_name: "",
    receiver_address: "",
    item_description: "",
  });
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const res = await logisticsApi.listShipments();
    if (res.result) setShipments(res.data as Shipment[]);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await logisticsApi.createShipment(form);
    if (!res.result) return setMsg(res.message || "Gagal membuat shipment");
    setForm({ sender_name:"", sender_address:"", receiver_name:"", receiver_address:"", item_description:"" });
    setMsg("Shipment dibuat ✅");
    load();
  }

  return (
    <RequireAuth>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold">Create Shipment</h2>
          </div>
          <div className="card-body">
            <form onSubmit={create} className="grid gap-3 md:grid-cols-2">
              <Input label="Sender Name" value={form.sender_name} onChange={e=>setForm({...form, sender_name:e.target.value})}/>
              <Input label="Sender Address" value={form.sender_address} onChange={e=>setForm({...form, sender_address:e.target.value})}/>
              <Input label="Receiver Name" value={form.receiver_name} onChange={e=>setForm({...form, receiver_name:e.target.value})}/>
              <Input label="Receiver Address" value={form.receiver_address} onChange={e=>setForm({...form, receiver_address:e.target.value})}/>
              <Input className="md:col-span-2" label="Item Description" value={form.item_description} onChange={e=>setForm({...form, item_description:e.target.value})}/>
              {msg && <p className="text-sm text-blue-600 md:col-span-2">{msg}</p>}
              <Button type="submit" className="md:col-span-2">Create</Button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h2 className="font-semibold">My Shipments</h2></div>
          <div className="card-body">
            {loading ? <p>Loading...</p> : shipments.length === 0 ? (
              <p className="text-sm text-muted-fg">Belum ada data.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-slate-500">
                  <tr>
                    <th className="py-2">Tracking</th>
                    <th>Item</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map(s => (
                    <tr key={s.id} className="border-t">
                      <td className="py-2">{s.tracking_number}</td>
                      <td>{s.item_description}</td>
                      <td>{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
