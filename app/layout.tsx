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
            <span className="brand-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.3"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  transform="rotate(-23 12 12)"
                />
                <circle cx="20.6" cy="9" r="1.4" fill="currentColor" />
              </svg>
            </span>
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
