import type { Metadata } from "next";
import "@fontsource-variable/estedad/wght.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "پنل مدیریت | زرین پسته باقری",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-cream-100 font-sans antialiased">{children}</body>
    </html>
  );
}
