import type { Envelope } from "@/types/api";
import { authStore } from "./auth";

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE!;
const LOGI_BASE = process.env.NEXT_PUBLIC_LOGI_BASE!;

async function request<T>(url: string, options: RequestInit = {}): Promise<Envelope<T>> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  const token = authStore.token;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(url, { ...options, headers, mode: "cors" });
  } catch (e: any) {
    return { result: false, data: {} as any, message: `Network error: ${e?.message || "failed to fetch"}` };
  }

  try {
    return (await res.json()) as Envelope<T>;
  } catch {
    const text = await res.text();
    return { result: false, data: {} as any, message: `Invalid response (${res.status}): ${text.slice(0,120)}` };
  }
}

export const authApi = {
  register(payload: { username: string; email: string; password: string; role_code: "admin" | "user" }) {
    return request(`${AUTH_BASE}/auth/register`, { method: "POST", body: JSON.stringify(payload) });
  },
  login(payload: { identifier: string; password: string }) {
    return request<{ token: string }>(`${AUTH_BASE}/auth/login`, { method: "POST", body: JSON.stringify(payload) });
  },
  me() {
    return request(`${AUTH_BASE}/auth/me`);
  },
};

export const logisticsApi = {
  listShipments() {
    return request(`${LOGI_BASE}/shipments`);
  },
  createShipment(payload: {
    sender_name: string; sender_address: string;
    receiver_name: string; receiver_address: string;
    item_description: string;
  }) {
    return request(`${LOGI_BASE}/shipments`, { method: "POST", body: JSON.stringify(payload) });
  },
  track(trackingNumber: string) {
    return request(`${LOGI_BASE}/shipments/track/${encodeURIComponent(trackingNumber)}`);
  },
  updateStatus(trackingNumber: string, status: "Shipped" | "InTransit" | "Delivered" | "Cancelled") {
    return request(`${LOGI_BASE}/shipments/${encodeURIComponent(trackingNumber)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
