import "./globals.css";
import AppShell from "@/app/components/layout/AppShell";

export const metadata = {
  title: "Main App",
  description: "Auth + Logistics frontend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
