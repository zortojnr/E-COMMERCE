"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {children}
    </div>
  );
}

export default function ServicesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const isProd = process.env.NODE_ENV === "production";
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash) setOpenId(hash);
  }, []);

  const services = [
    {
      id: "errand",
      title: "Errand Services",
      description: "Simplifying everyday tasks with fast, dependable errands for individuals and small businesses.",
      features: ["Quick booking", "Real-time updates", "Secure item handling"],
      icon: "🧾",
    },
    {
      id: "dispatch",
      title: "Dispatch Delivery",
      description: "Secure and efficient parcel movement with trained riders and careful handling.",
      features: ["City-wide coverage", "Verified handoff", "Affordable pricing"],
      icon: "📦",
    },
    {
      id: "same-day",
      title: "Same day delivery",
      description: "Pickup and deliver on the same day with clear communication and timing.",
      features: ["1–3 hour window", "Priority routing", "Status alerts"],
      icon: "⚡",
    },
    {
      id: "door-to-door",
      title: "Door to door delivery",
      description: "Direct pickup and drop-off from your preferred locations across the city.",
      features: ["Flexible scheduling", "Proof of delivery", "Careful handling"],
      icon: "🚚",
    },
    {
      id: "payment-on-delivery",
      title: "Payment on delivery",
      description: "Collect payment at delivery with verification and confirmation for sellers.",
      features: ["Payment verification", "Buyer confirmation", "Secure cash handling"],
      icon: "💳",
    },
    {
      id: "warehousing",
      title: "Warehousing",
      description: "Secure storage and organized inventory handling for short-term needs.",
      features: ["Safe storage", "Item cataloging", "Quick retrieval"],
      icon: "🏬",
    },
  ];

  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32">
          <FadeInOnScroll>
            <div className="text-center">
              <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
              <h1 className={`mt-4 text-4xl md:text-5xl font-extrabold`}>Our Services</h1>
              <p className="mt-4 text-[color:var(--brand-text-muted)]">Errand services and dispatch delivery, presented in clean, professional cards.</p>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-10">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className="text-lg font-semibold mb-2">City-wide Focus</div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">Our core operations are within Port Harcourt for speed and reliability.</div>
              </div>
              <div className="rounded-2xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-3" />
                <div className="text-lg font-semibold mb-2">Interstate Support (Partner Parks)</div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">
                  We only help our customers do interstate deliveries using partner businesses. If you can’t go to the park, we can pick up from your location and waybill on your behalf. Fees include park charges and handling. Confirmation receipts and tracking details are provided for transparency.
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>What We Offer</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {services.map((s) => (
                <div id={s.id} key={s.id} className="rounded-2xl border border-[color:var(--brand-border)] bg-[rgba(20,20,20,0.6)]">
                  <button
                    aria-controls={`${s.id}-panel`}
                    aria-expanded={openId === s.id}
                    onClick={() => setOpenId(openId === s.id ? null : s.id)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl" aria-hidden>{s.icon}</span>
                      <div className="flex-1">
                        <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-3" />
                        <div className="text-xl font-bold">{s.title}</div>
                        <div className="text-sm text-[color:var(--brand-text-muted)]">{s.description}</div>
                      </div>
                      <span className="ml-2 text-[color:var(--gold-end)]">{openId === s.id ? "⌄" : "›"}</span>
                    </div>
                  </button>
                  {openId === s.id && (
                    <div id={`${s.id}-panel`} role="region" aria-label={`${s.title} details`} className="px-6 pb-6">
                      <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-300">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><span>{f}</span></li>
                        ))}
                      </ul>
                      <div className="mt-4 text-xs text-[color:var(--brand-text-muted)]">Professional, subtle animations and responsive layout applied.</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        

        

        

        

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)]">
              <div className="p-8 md:p-12">
                <div className={`text-2xl md:text-3xl font-extrabold`}>Ready to book a service?</div>
                <div className="mt-2 text-sm md:text-base text-[color:var(--brand-text-muted)]">Errands and dispatch, handled professionally.</div>
                <Link prefetch={false} href="/book/pickup" className="mt-6 inline-block rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_var(--brand-glow)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow-hover)]">Book a Service Now</Link>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <footer className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/logo.jpg" alt="TribesByWendy logo" width={40} height={40} className="rounded" />
                  <span className={`font-semibold`}>TribesByWendy Errands</span>
                </div>
                <div className="text-zinc-400">Think logistics, Think us.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className={`font-semibold mb-3`}>Contact</div>
                  <div className="text-sm text-zinc-300">+234 807 871 2534</div>
                  <div className="text-sm text-zinc-300">0803 842 9173</div>
                  <div className="text-sm text-zinc-300">Instagram: @Tribesbywendyerrands</div>
                </div>
                <div>
                  <div className={`font-semibold mb-3`}>Locations</div>
                  <div className="text-sm text-zinc-300">Head Office: No. 6, Mission Road, Alakahia, Port Harcourt</div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-xs text-zinc-500">© 2023 TribesByWendy Errands. All rights reserved.</div>
          </FadeInOnScroll>
        </footer>
      </main>
    </div>
  );
}
