import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import MetricsNavbar from "./components/MetricsNavbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

export const metadata: Metadata = {
  title: "Optimism Dashboard",
  description: "Detailed dashboard for the Optimism blockchain"
};

// Default Root Layout for working with styles
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
        <Navbar />
        <MetricsNavbar />
        {children}
        <Analytics mode="production" />
        <Footer />
      </body>
    </html>
  );
}