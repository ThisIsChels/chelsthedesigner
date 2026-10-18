import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clash = localFont({
  variable: "--font-clash",
  src: [
    { path: "../public/fonts/ClashGrotesk/ClashGrotesk-Regular.woff2", weight: "400" },
    { path: "../public/fonts/ClashGrotesk/ClashGrotesk-Medium.woff2", weight: "500" },
    { path: "../public/fonts/ClashGrotesk/ClashGrotesk-Semibold.woff2", weight: "600" },
  ],
});

const tampool = localFont({
  variable: "--font-tampool",
  src: "../public/fonts/Tampool/TAMPOOL.woff2",
  weight: "900",
});

export const metadata: Metadata = {
  title: "Chelsey LaPointe — Designer, Developer, Artist",
  description: "Portfolio, art shop, and notes from Chelsey LaPointe.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${clash.variable} ${tampool.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
