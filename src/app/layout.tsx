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

const SITE_URL = "https://midpoint-finder-gamma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MidPoint — Find the Geographic Midpoint Between Friends",
    template: "%s | MidPoint",
  },
  description:
    "Create a shareable link, have friends share their location, and instantly find the geographic midpoint between everyone. Find the perfect meeting spot for lunch, hangouts, or weekend trips — no login required!",
  keywords: [
    "midpoint finder",
    "geographic midpoint",
    "meeting point calculator",
    "find middle point",
    "meetup location",
    "halfway point",
    "central meeting spot",
    "location midpoint",
    "group meeting point",
    "fair meeting location",
    "midpoint between two locations",
    "midpoint calculator",
    "maps",
    "location sharing",
  ],
  authors: [{ name: "MidPoint" }],
  creator: "MidPoint",
  publisher: "MidPoint",
  applicationName: "MidPoint",
  category: "Utilities",

  // Open Graph — for Facebook, LinkedIn, WhatsApp, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MidPoint",
    title: "MidPoint — Find the Geographic Midpoint Between Friends",
    description:
      "Create a shareable link, have friends share their location, and instantly find the geographic midpoint between everyone. Perfect for finding fair meeting spots!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MidPoint — Find the midpoint between friends on a map",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "MidPoint — Find the Midpoint Between Friends",
    description:
      "Share a link with friends, everyone shares their location, and instantly see the geographic midpoint on a live map.",
    images: ["/og-image.png"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Verification — add your Google Search Console verification code here
  // verification: {
  //   google: "your-google-verification-code",
  // },

  // Alternates / Canonical
  alternates: {
    canonical: SITE_URL,
  },
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
              href="https://github.com/aliysf/midpoint-finder"
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
