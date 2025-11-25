"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setV(true); });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-200 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>{children}</div>;
}

function RouteMotif() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-[280px] md:h-[360px]" aria-hidden="true">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A738" />
          <stop offset="100%" stopColor="#F5C76D" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="400" fill="transparent" />
      <path d="M20 300 C120 260, 160 220, 260 180 S380 120, 380 60" stroke="url(#lg1)" strokeWidth="3" fill="none" opacity="0.9" />
      <path d="M30 330 C130 290, 170 250, 270 210 S390 150, 390 90" stroke="#D4A738" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="260" cy="180" r="4" fill="#F5C76D" />
      <circle cx="380" cy="60" r="4" fill="#D4A738" />
    </svg>
  );
}

function CountUp({ end, duration = 1000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVal(end); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return <div className="text-3xl font-extrabold text-[color:var(--brand-text)]">{val}{suffix}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--brand-bg)] text-[color:var(--brand-text)]">
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-28 md:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <FadeIn>
              <div className="space-y-6">
                <div className="inline-flex items-center bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)] px-3 py-1 text-xs">On‑time Delivery • Secure Handling • Efficient Movement</div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[color:var(--brand-text)]">Premium Logistics. Built for Reliability.</h1>
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                <p className="max-w-xl text-[color:var(--brand-text-muted)]">End‑to‑end logistics services focused on dependable movement, on‑time delivery and professional handling.</p>
                <div className="flex flex-wrap gap-4">
                  <Link prefetch={false} href="/book/pickup" className="rounded-none px-6 py-3 font-semibold text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_8px_30px_var(--brand-glow)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">Book a Pickup</Link>
                  <Link prefetch={false} href="/contact" className="rounded-none px-6 py-3 font-semibold text-[color:var(--gold-end)] border border-[color:var(--gold-end)] transition-all duration-200 hover:bg-[color:rgba(245,199,109,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">Contact Sales</Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="rounded-2xl p-6 bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)]">
                <RouteMotif />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {["On‑time","Tracking","Secure"].map((b) => (
                    <div key={b} className="px-3 py-2 bg-[#111316] border border-[color:var(--brand-border)] text-center text-xs">{b}</div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[{k:99,s:"%",l:"On‑time"},{k:3,s:"m",l:"Pickup lead time"}].map((x) => (
                    <div key={x.l} className="px-3 py-2 bg-[#111316] border border-[color:var(--brand-border)]">
                      <CountUp end={x.k} suffix={x.s} />
                      <div className="text-xs text-[color:var(--brand-text-muted)]">{x.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--brand-text)]">Service Highlights</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "Errand Logistics", d: "Everyday runs handled with speed and care.", href: "/services" },
                { t: "Dispatch Delivery", d: "Fast, secure parcel movement.", href: "/services" },
                { t: "Enterprise Logistics", d: "Tailored solutions for teams.", href: "/contact" },
                { t: "International Forwarding", d: "Global coordination and support.", href: "/contact" },
              ].map((s) => (
                <Link prefetch={false} key={s.t} href={s.href} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_40px_var(--brand-glow)]">
                  <div className="h-px w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                  <div className="font-semibold mb-1">{s.t}</div>
                  <div className="text-sm text-[color:var(--brand-text-muted)]">{s.d}</div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="py-16">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <div className="text-2xl font-bold text-[color:var(--brand-text)]">Logistics that delivers</div>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  {["Route planning & scheduling","Professional handling & safety protocols","Efficient consolidation & distribution","Reliable communication & fulfillment"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{f}</li>
                  ))}
              </ul>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { k: 99, s: "%", l: "On‑time Deliveries" },
                  { k: 120, s: "+", l: "Service Corridors" },
                  { k: 98, s: "%", l: "Satisfaction" },
                  { k: 3, s: "m", l: "Pickup Lead Time" },
                ].map((x) => (
                  <div key={x.l} className="rounded-xl p-4 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)] text-center">
                    <CountUp end={x.k} suffix={x.s} />
                    <div className="mt-1 text-xs text-[color:var(--brand-text-muted)]">{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="py-16">
          <FadeIn>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[color:var(--brand-text)]">Customers trust our efficiency</div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">Read more stories from teams and individuals.</div>
              </div>
              <Link prefetch={false} href="/testimonials" className="w-full sm:w-auto text-center rounded-none min-h-[44px] px-4 py-3 font-semibold text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_20px_var(--brand-glow)] hover:shadow-[0_10px_30px_var(--brand-glow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">See more</Link>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Chinedu", text: "Swift pickup and very professional.", location: "Port Harcourt" },
                { name: "Amaka", text: "Affordable and stress-free delivery.", location: "Port Harcourt" },
                { name: "Timi", text: "Reliable riders, great communication.", location: "Port Harcourt" },
              ].map((t, i) => (
                <div key={i} className="rounded-xl p-5 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                  <div className="flex items-center gap-1 text-[color:var(--gold-end)] mb-3" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} aria-hidden="true">★</span>
                    ))}
                  </div>
                  <div className="text-sm text-[color:var(--brand-text-muted)] mb-3">{t.text}</div>
                  <div className="text-sm font-semibold text-[color:var(--brand-text)]">{t.name}</div>
                  <div className="text-xs text-[color:var(--brand-text-muted)]">{t.location}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="py-16">
          <FadeIn>
            <div className="rounded-2xl p-8 bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)]">
              <div className="text-2xl md:text-3xl font-extrabold text-[color:var(--brand-text)]">Move faster with premium logistics</div>
              <div className="mt-2 text-sm md:text-base text-[color:var(--brand-text-muted)]">Book a pickup in minutes. We’ll handle the route and the stress.</div>
              <Link prefetch={false} href="/book/pickup" className="mt-6 inline-block rounded-none px-6 py-3 font-semibold text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_var(--brand-glow)] hover:shadow-[0_10px_40px_var(--brand-glow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">Book a Pickup</Link>
            </div>
          </FadeIn>
        </section>

        <footer className="py-16">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="font-semibold text-[color:var(--brand-text)]">TribesByWendy Errands</div>
                <div className="text-[color:var(--brand-text-muted)]">THINK LOGISTICS, THINK US</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold mb-3 text-[color:var(--brand-text)]">Contact</div>
                  <div className="text-sm text-[color:var(--brand-text-muted)]">+234 807 871 2534</div>
                  <div className="text-sm text-[color:var(--brand-text-muted)]">0803 842 9173</div>
                  <div className="text-sm text-[color:var(--brand-text-muted)]">Instagram: @Tribesbywendyerrands</div>
                </div>
                <div>
                  <div className="font-semibold mb-3 text-[color:var(--brand-text)]">Head Office</div>
                  <div className="text-sm text-[color:var(--brand-text-muted)]">No. 6, Mission Road, Alakahia, Port Harcourt</div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-xs text-[color:var(--brand-text-muted)]">© 2023 TribesByWendy Errands. All rights reserved.</div>
          </FadeIn>
        </footer>
      </main>
    </div>
  );
}
