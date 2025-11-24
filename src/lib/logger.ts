type Level = "debug" | "info" | "warn" | "error";

const isDev = process.env.NODE_ENV !== "production";

function ts() {
  return new Date().toISOString();
}

function out(level: Level, component: string, message: string, ctx?: Record<string, unknown>) {
  const prefix = `[${ts()}] [${level.toUpperCase()}] [${component}] ${message}`;
  const payload = ctx ? ` ${JSON.stringify(ctx)}` : "";
  // Gate less-critical levels in production
  if (!isDev && (level === "debug" || level === "info")) return;
  if (level === "debug") console.debug(prefix + payload);
  else if (level === "info") console.info(prefix + payload);
  else if (level === "warn") console.warn(prefix + payload);
  else console.error(prefix + payload);
}

export const logger = {
  debug(component: string, message: string, ctx?: Record<string, unknown>) {
    out("debug", component, message, ctx);
  },
  info(component: string, message: string, ctx?: Record<string, unknown>) {
    out("info", component, message, ctx);
  },
  warn(component: string, message: string, ctx?: Record<string, unknown>) {
    out("warn", component, message, ctx);
  },
  error(component: string, message: string, ctx?: Record<string, unknown>) {
    out("error", component, message, ctx);
  },
};

