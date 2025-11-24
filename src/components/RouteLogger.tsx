"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logger } from "@/lib/logger";

export default function RouteLogger() {
  const pathname = usePathname();
  useEffect(() => {
    logger.info("RouteLogger", "route-change", { path: pathname });
  }, [pathname]);
  return null;
}

