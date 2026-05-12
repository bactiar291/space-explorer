import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Space Explorer",
  title: {
    default: "Space Explorer - Interactive Astronomy Platform",
    template: "%s - Space Explorer",
  },
  description:
    "Interactive solar system platform with scientific planet data, WebGL visualization, NASA APOD, NEO tracker, and mission timeline.",
  keywords: ["space explorer", "solar system", "interactive astronomy", "NASA", "planets"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://space-explorer.vercel.app"),
  openGraph: {
    title: "Space Explorer",
    description: "A professional interactive astronomy platform for the Solar System.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-nav">
          <Link href="/" className="brand" aria-label="Space Explorer home">
            <span className="brand-mark">SE</span>
            <span>
              <strong>Space Explorer</strong>
              <em>Interactive Astronomy Platform</em>
            </span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/">Solar System</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/nasa-feed">NASA Feed</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
