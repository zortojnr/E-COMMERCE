import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import RouteLogger from "@/components/RouteLogger";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TribesByWendy Errands — Premium Logistics",
  description: "Affordable, fast and reliable errands and dispatch services in Port Harcourt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Navbar />
        <RouteLogger />
        {children}
      </body>
    </html>
  );
}
