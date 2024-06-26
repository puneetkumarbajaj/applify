import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applify",
  description: "Ultimate music player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <Script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js" strategy="beforeInteractive"></Script>
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
