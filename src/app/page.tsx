import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="text-2xl font-semibold">Welcome</h1>
        </div>
        <div className="card-body">
          <p className="text-slate-600">
            Silakan register/login lalu coba buat &amp; lacak shipment.
          </p>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CTA title="Buat Shipment" desc="Input detail pengiriman baru." href="/dashboard" />
        <CTA title="Lacak Pengiriman" desc="Cek status berdasarkan nomor resi." href="/track" />
        <CTA title="Admin Panel" desc="Kelola pengguna, tarif, dan SLA." href="/admin" />
      </section>
    </>
  );
}

function CTA({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="card transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="card-body">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
        <div className="mt-4">
          <span className="btn btn-muted">Buka</span>
        </div>
      </div>
    </Link>
  );
}
