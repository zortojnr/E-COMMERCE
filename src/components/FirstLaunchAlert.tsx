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
    <div className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Security notice">
      <div className="absolute inset-0 bg-black/60 backdrop-blur" />
      <div className="relative w-[92%] max-w-xl rounded-2xl border border-zinc-800 bg-[#0B0B0B] p-6 text-white shadow-[0_10px_40px_rgba(245,199,109,0.18)]">
        <div className="h-1 w-20 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
        <div className={`text-lg font-bold mb-2`}>Stay Vigilant</div>
        <p className="text-sm text-zinc-300 mb-3">
          Please beware of fraudulent activities. We will never request passwords, OTPs, or advance payments outside confirmed bookings. Verify rider identity and delivery details before releasing items or funds.
        </p>
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1 mb-4">
          <li>Do not share sensitive codes or private information.</li>
          <li>Confirm pickup and drop-off details via official channels.</li>
          <li>Report suspicious behavior immediately.</li>
        </ul>
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
  );
}

