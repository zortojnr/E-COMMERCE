"use client";
import Link from "next/link";

function BusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16v6H4v-6zM4 11l2-6h12l2 6M7 17h.01M17 17h.01M6 9h12" />
    </svg>
  );
}

type PriceRow =
  | { label: string; price: string }
  | { label: string; price: string; note: string; showBus?: boolean };

const rows: PriceRow[] = [
  { label: "Within Port Harcourt", price: "₦5,000" },
  { label: "Eleme", price: "₦8,000" },
  { label: "Onne", price: "₦9,000" },
  { label: "Elele", price: "₦15,000" },
  { label: "Monthly subscription", price: "Starts from a minimum of 50 deliveries" },
  {
    label: "Interstate delivery",
    price: "",
    showBus: true,
    note:
      "Interstate delivery can be arranged through third party providers at an additional cost, including park charges and handling where applicable.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="pt-6 md:pt-10">
          <div className="text-center">
            <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight px-1">
              Pricing
            </h1>
            <p className="mt-4 text-[color:var(--brand-text-muted)] max-w-3xl mx-auto px-1">
              Transparent pricing for common routes. If you need a custom quote, please contact us.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-none border border-[color:var(--brand-border)] bg-[rgba(20,20,20,0.6)] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-[color:var(--brand-border)]">
                <div className="text-lg font-semibold">Rates</div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">
                  Prices below are guide rates and may change based on distance, item type, and urgency.
                </div>
              </div>
              <div className="divide-y divide-[color:var(--brand-border)]">
                {rows.map((r) => (
                  <div key={r.label} className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="font-semibold flex items-center gap-2 min-w-0">
                        {"showBus" in r && r.showBus ? (
                          <BusIcon className="w-5 h-5 shrink-0 text-[color:var(--gold-end)]" />
                        ) : null}
                        <span>{r.label}</span>
                      </div>
                      <div className="text-[color:var(--gold-end)] font-semibold sm:text-right">
                        {r.price ? r.price : "\u00a0"}
                      </div>
                    </div>
                    {"note" in r && r.note ? (
                      <div className="mt-2 text-sm text-[color:var(--brand-text-muted)]">{r.note}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-none border border-[color:var(--brand-border)] bg-[rgba(20,20,20,0.6)] p-5 sm:p-6">
              <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
              <div className="text-lg font-semibold">Important notice</div>
              <p className="mt-2 text-sm text-[color:var(--brand-text-muted)] leading-relaxed">
                Please note: we prohibit calling drivers directly to request a service. All deliveries must be
                completed through the company&apos;s official communication channels.
              </p>
              <div className="mt-6 rounded-none border border-[color:var(--brand-border)] bg-black/40 p-4">
                <div className="text-sm font-semibold">Need a quote?</div>
                <div className="mt-1 text-sm text-[color:var(--brand-text-muted)]">
                  Message us with your pickup and drop off locations, item details, and preferred time.
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="text-center rounded-xl px-5 py-3 min-h-11 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_var(--brand-glow)]"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/services"
                    prefetch={false}
                    className="text-center rounded-xl px-5 py-3 min-h-11 border border-[color:var(--gold-end)] text-[color:var(--gold-end)]"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="rounded-none border border-[color:var(--brand-border)] bg-[color:var(--brand-bg-2)] p-6">
            <div className="text-xl font-bold">Monthly subscriptions</div>
            <p className="mt-2 text-sm text-[color:var(--brand-text-muted)] leading-relaxed">
              Monthly subscriptions start from a minimum of 50 deliveries. We can tailor pickup schedules and
              reporting for businesses with recurring delivery needs.
            </p>
            <div className="mt-4">
              <Link prefetch={false} href="/contact" className="underline text-[color:var(--gold-end)]">
                Contact us to set up a subscription
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

