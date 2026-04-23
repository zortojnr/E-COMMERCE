"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem("cookieConsent");
      if (!v) setShow(true);
    } catch {}
  }, []);
  const accept = () => {
    try {
      localStorage.setItem(
        "cookieConsent",
        JSON.stringify({ essential: true, analytics: false, marketing: false })
      );
    } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-7xl bg-[rgba(20,20,20,0.85)] border border-[color:var(--brand-border)] text-[color:var(--brand-text)] p-4 md:p-6 max-h-[45vh] sm:max-h-none overflow-y-auto">
        <div className="md:flex md:items-center md:justify-between gap-4">
          <div className="text-xs sm:text-sm text-[color:var(--brand-text-muted)] min-w-0">
            We use essential cookies so the site works properly. We do not use analytics or marketing cookies.
            {" "}
            <a href="/privacy" className="underline text-[color:var(--gold-end)]">
              Privacy Policy
            </a>
          </div>
          <div className="mt-3 md:mt-0 shrink-0">
            <button
              type="button"
              onClick={accept}
              className="rounded-lg px-3 sm:px-4 py-2 text-sm text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_20px_var(--brand-glow)] min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
