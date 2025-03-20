import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events Extractor",
  description: "Extract structured data from any website using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <Link href="/" className="text-lg font-semibold text-[#36322f]">
              Events Extractor
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/mendableai/firecrawl"
              target="_blank"
              className="text-sm text-[#36322f] hover:text-orange-500 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.firecrawl.dev/"
              target="_blank"
              className="text-sm text-[#36322f] hover:text-orange-500 transition-colors"
            >
              Firecrawl
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
