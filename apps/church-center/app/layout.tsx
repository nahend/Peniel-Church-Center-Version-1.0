import "./globals.css";
import type { Metadata } from "next";
import DashboardShell from "./components/dashboard-shell";

export const metadata: Metadata = {
  title: "Peniel Church Center",
  description: "Secure church administration dashboard for Peniel Ethiopian Evangelical Church.",
  metadataBase: new URL("https://admin.penielchurchcenter.org"),
  openGraph: {
    title: "Peniel Church Center Admin",
    description: "Secure church administration dashboard for Peniel Ethiopian Evangelical Church.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
