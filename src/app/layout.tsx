import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RouteLogger from "@/components/RouteLogger";
import FirstLaunchAlert from "@/components/FirstLaunchAlert";
import "./globals.css";


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
      <body className={`antialiased`}>
        <Navbar />
        <RouteLogger />
        <FirstLaunchAlert />
        {children}
      </body>
    </html>
  );
}
