"use client";
import { useEffect, useState } from "react";

export default function FirstLaunchAlert() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const acknowledged = typeof window !== "undefined" && localStorage.getItem("tbw_alert_ack") === "1";
      if (!acknowledged) setShow(true);
    } catch {}
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Security notice">
      <div className="absolute inset-0 bg-black/60 backdrop-blur" />
      <div className="relative w-[min(92vw,36rem)] max-h-[min(90dvh,36rem)] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-800 bg-[#0B0B0B] p-5 sm:p-6 text-white shadow-[0_10px_40px_rgba(245,199,109,0.18)]">
        <div className="h-1 w-20 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
        <div className="text-lg font-bold mb-2">Stay Vigilant</div>
        <p className="text-sm text-zinc-300 mb-3">
          Do not contact drivers directly.
        </p>
        <p className="text-sm text-zinc-300 mb-4">
          All communications should be handled through the official platform to ensure safety and security.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              try { localStorage.setItem("tbw_alert_ack", "1"); } catch {}
              setShow(false);
            }}
            className="rounded-full px-6 py-2 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] hover:opacity-95"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

