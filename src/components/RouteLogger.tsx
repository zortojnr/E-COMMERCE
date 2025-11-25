"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logger } from "@/lib/logger";

export default function RouteLogger() {
  const pathname = usePathname();
  useEffect(() => {
    logger.info("RouteLogger", "route-change", { path: pathname });
  }, [pathname]);
  useEffect(() => {
    const origError = console.error;
    const origWarn = console.warn;
    console.error = (...args: any[]) => {
      const s = args.map((a) => (typeof a === "string" ? a : "")).join(" ");
      if (s.includes("net::ERR_ABORTED") || s.includes("?_rsc=") || s.includes("ide_webview_request_time")) return;
      origError(...args);
    };
    console.warn = (...args: any[]) => {
      const s = args.map((a) => (typeof a === "string" ? a : "")).join(" ");
      if (s.includes("net::ERR_ABORTED") || s.includes("?_rsc=") || s.includes("ide_webview_request_time")) return;
      origWarn(...args);
    };
    return () => {
      console.error = origError;
      console.warn = origWarn;
    };
  }, []);
  return null;
}
