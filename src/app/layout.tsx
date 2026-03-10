import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MidPoint — Find the Middle Ground",
  description:
    "Create a shareable link, have friends share their location, and instantly find the geographic midpoint between everyone. Perfect for meetups!",
  keywords: ["midpoint", "location", "meetup", "geographic center", "maps"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet CSS — required for the map component */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, shadcn/ui & Leaflet ·{" "}
            <a
              href="https://github.com"
              className="underline hover:text-foreground transition-colors"
            >
              View Source
            </a>
          </p>
        </footer>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
