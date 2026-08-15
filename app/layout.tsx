import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maldobrands.vercel.app"),

  title: {
    default: "GZM — Contemporary Fashion, Curated",
    template: "%s — GZM",
  },

  description:
    "GZM is a curated contemporary fashion platform exploring the ideas, styles, and looks shaping what feels relevant now.",

  openGraph: {
    siteName: "GZM",
    type: "website",
    images: [
      {
        url: "/images/logos/gzm%20image.png",
        width: 1200,
        height: 630,
        alt: "GZM — Curated Looks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
