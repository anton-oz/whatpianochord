import { PianoProvider } from "@/context/PianoContext";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PianoKords",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PianoProvider>
        <body className={`${openSans.variable} antialiased`}>{children}</body>
      </PianoProvider>
    </html>
  );
}
