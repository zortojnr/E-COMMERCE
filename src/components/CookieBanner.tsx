"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem("cookieConsent");
      if (!v) setShow(true);
    } catch {}
  }, []);
  const acceptAll = () => {
    try {
      localStorage.setItem(
        "cookieConsent",
        JSON.stringify({ essential: true, analytics: true, marketing: true })
      );
    } catch {}
    setShow(false);
  };
  const savePrefs = () => {
    try {
      localStorage.setItem(
        "cookieConsent",
        JSON.stringify({ essential: true, analytics, marketing })
      );
    } catch {}
    setPrefOpen(false);
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto max-w-7xl bg-[rgba(20,20,20,0.85)] border border-[color:var(--brand-border)] text-[color:var(--brand-text)] p-4 md:p-6">
        <div className="md:flex md:items-center md:justify-between gap-4">
          <div className="text-sm text-[color:var(--brand-text-muted)]">
            We use cookies to improve your experience. See our
            {" "}
            <a href="/privacy" className="underline text-[color:var(--gold-end)]">
              Privacy Policy
            </a>
            {" "}or customize preferences.
          </div>
          <div className="mt-3 md:mt-0 flex gap-3">
            <button
              onClick={() => setPrefOpen(true)}
              className="rounded-none px-4 py-2 text-[color:var(--gold-end)] border border-[color:var(--gold-end)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)]"
            >
              Preferences
            </button>
            <button
              onClick={acceptAll}
              className="rounded-none px-4 py-2 text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_20px_var(--brand-glow)]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
      {prefOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="fixed inset-0 z-50 bg-black/60"
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)] p-6">
              <div className="text-lg font-semibold mb-2">Cookie Preferences</div>
              <div className="text-sm text-[color:var(--brand-text-muted)] mb-4">
                Essential cookies are always on. Choose additional preferences below.
              </div>
              <label className="flex items-center justify-between py-2">
                <span>Analytics</span>
                <input
                  aria-label="Analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between py-2">
                <span>Marketing</span>
                <input
                  aria-label="Marketing"
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
              </label>
              <div className="mt-4 flex gap-3 justify-end">
                <button
                  onClick={() => setPrefOpen(false)}
                  className="rounded-none px-4 py-2 text-[color:var(--gold-end)] border border-[color:var(--gold-end)]"
                >
                  Cancel
                </button>
                <button
                  onClick={savePrefs}
                  className="rounded-none px-4 py-2 text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
