import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NoiseTexture } from "@/components/background/Background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SatikSoul — Turn emotions into timeless memories.",
  description: "An ultra-premium private digital diary and emotionally-intelligent relationship scrapbook platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${playfairDisplay.variable} ${greatVibes.variable} antialiased`}>
          <NoiseTexture />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
