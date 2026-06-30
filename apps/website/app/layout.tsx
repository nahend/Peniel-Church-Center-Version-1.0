import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peniel Church Center",
  description: "Bilingual church management platform for Peniel Ethiopian Evangelical Church.",
  metadataBase: new URL("https://penielchurchcenter.org"),
  openGraph: {
    title: "Peniel Church Center",
    description: "Bilingual church management platform for Peniel Ethiopian Evangelical Church.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>{children}</body>
    </html>
  );
}
