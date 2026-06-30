import "./globals.css";
export const metadata = { title: "Peniel Church Center", description: "Bilingual church management platform for Peniel Ethiopian Evangelical Church." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
