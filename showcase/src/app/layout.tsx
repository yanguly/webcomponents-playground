import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const links = [
  { href: "/", label: "Overview" },
  { href: "/examples", label: "Live Examples" },
];

export const metadata: Metadata = {
  title: "Web Components Showcase",
  description:
    "Next.js showcase that maps every example in the Web Components playground and highlights how components interact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen bg-slate-950 text-slate-100">
          <nav className="sticky top-0 z-50 border-b border-slate-900/80 bg-slate-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">
                Web Components Playground
              </span>
              <div className="flex items-center gap-3 text-sm">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-slate-800/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 transition hover:border-slate-200 hover:text-slate-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="pb-20">{children}</div>
        </div>
      </body>
    </html>
  );
}
