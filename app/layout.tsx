import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Manspace",
  title: {
    default: "Manspace - Atlas Astronomi Interaktif",
    template: "%s - Manspace",
  },
  description:
    "Platform astronomi interaktif berbahasa Indonesia dengan visualisasi 3D, data planet ilmiah, feed NASA, dan timeline eksplorasi antariksa.",
  keywords: ["manspace", "tata surya", "astronomi interaktif", "NASA", "planet"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://manspace.vercel.app"),
  openGraph: {
    title: "Manspace",
    description: "Atlas astronomi interaktif untuk menjelajahi tata surya.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header className="site-nav">
          <Link href="/" className="brand" aria-label="Beranda Manspace">
            <span className="brand-mark">MS</span>
            <span>
              <strong>Manspace</strong>
              <em>Atlas Astronomi Interaktif</em>
            </span>
          </Link>
          <nav aria-label="Navigasi utama">
            <Link href="/">Tata Surya</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/nasa-feed">Feed NASA</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
