import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import RouteLogger from "@/components/RouteLogger";
import FirstLaunchAlert from "@/components/FirstLaunchAlert";
import "./globals.css";


export const metadata: Metadata = {
  title: "Tribes By Wendy Errands Limited · Premium Logistics",
  description: "Affordable, fast and reliable errands and dispatch services in Port Harcourt.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/logo.jpg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        <AnnouncementTicker />
        <div
          className="h-[calc(4.5rem+2.25rem)] sm:h-[calc(5rem+2.25rem)]"
          aria-hidden
        />
        <RouteLogger />
        <FirstLaunchAlert />
        {children}
      </body>
    </html>
  );
}
