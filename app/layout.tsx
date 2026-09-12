import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

// UI + body face from the Designer contract. Headings use the Helvetica system stack.
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans"
});

export const metadata: Metadata = {
  title: "Planet Brief",
  description: "Weekly World Monitor macro brief — planet situation picture."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${sourceSans.className}`}>{children}</body>
    </html>
  );
}
