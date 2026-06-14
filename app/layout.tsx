import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/layout/SessionWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://communityfoundation.in"
  ),
  title: {
    default: "Community Base Advancement Foundation — Building Stronger Communities",
    template: "%s | CBAF",
  },
  description:
    "An NGO dedicated to women empowerment, rural education, environmental action, and emergency relief across India.",
  keywords: ["NGO India", "donate India", "women empowerment", "education NGO", "community development"],
  robots: { index: true, follow: true },
  openGraph: {
    type:     "website",
    locale:   "en_IN",
    url:      "https://communityfoundation.in",
    siteName: "Community Base Advancement Foundation",
    images: [
      { url: "/og/home.jpg", width: 1200, height: 630, alt: "CBAF" },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Community Base Advancement Foundation",
    description: "Equipping, connecting, and supporting communities across India.",
    images:      ["/og/home.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="antialiased">
        <SessionWrapper>
          {children}
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
