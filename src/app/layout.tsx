import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import MusicPicker from "@/components/music/MusicPicker";
import { AudioProvider } from "@/context/AudioPlayerContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blue rose",
  description: "a website made for you :)",

  verification: {
    google: "XBG_c3LHbOjLevBs2UoVQjyaiizbF940si1KFCXlGqg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-center items-center bg-background font-sans text-foreground`}
      >
        <AudioProvider>
          <MusicPicker />
          {children}
        </AudioProvider>
        <Toaster position="top-center" duration={5000} />
        <Analytics />
      </body>
    </html>
  );
}
