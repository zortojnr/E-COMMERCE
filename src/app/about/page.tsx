"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { logger } from "@/lib/logger";


function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const loggedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { 
        if (e.isIntersecting) {
          setVisible(true);
          if (!loggedRef.current) {
            logger.debug("About.FadeInOnScroll", "section-visible");
            loggedRef.current = true;
          }
        }
      });
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

export default function AboutPage() {
  const [visibleHighlights, setVisibleHighlights] = useState(false);
  function CountUp({ end, duration = 1000, suffix = "", formatK = false }: { end: number; duration?: number; suffix?: string; formatK?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [val, setVal] = useState(0);
    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const v = Math.floor(p * end);
        setVal(v);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [end, duration]);
    const display = formatK && end >= 1000 ? `${(val / 1000).toFixed(val >= 10000 ? 0 : 1)}k${suffix}` : `${val}${suffix}`;
    return <div ref={ref} className={`text-2xl font-extrabold`}>{display}</div>;
  }
  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        {/* Hero Section with Image and Who We Are */}
        <section className="pt-24 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Who We Are */}
            <FadeInOnScroll>
              <div className="space-y-6">
                <h1 className={`text-4xl md:text-5xl font-extrabold`}>Your Trusted Errands & Logistics Partner</h1>
                <div className="h-1 w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                <div className={`text-2xl font-bold text-[color:var(--gold-end)]`}>Who we are</div>
                <p className="text-zinc-300 leading-relaxed">TribesByWendy Errands exists to remove stress from everyday movement. We make errands simple and dependable by combining trained riders, clear communication and a premium approach to service.</p>
                <p className="text-zinc-300 leading-relaxed">We support professionals, families, students and small businesses in Port Harcourt with timely errands and secure dispatch delivery. Every request is handled with care, accountability and a focus on getting it right the first time.</p>
                <p className="text-zinc-300 leading-relaxed">Our standard is consistency: clear updates, on-time pickups, careful handling and fair pricing. Whether it's documents, groceries or store-to-home deliveries, we bring speed and reliability together in a way that lets you focus on what matters.</p>
              </div>
            </FadeInOnScroll>
            
            {/* Right Side - Image */}
            <FadeInOnScroll>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="/hero.jpg"
                  alt="TribesByWendy Logistics Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-semibold">Professional Logistics Services</div>
                  <div className="text-zinc-300 text-sm">Reliable delivery solutions across Port Harcourt</div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="space-y-4 max-w-2xl mx-auto text-center">
              <div className={`text-2xl font-bold`}>Why We Started</div>
              <p className="text-zinc-300 leading-relaxed">Everyday logistics can become a burden: long queues, missed windows, unclear communication and unpredictable pricing. We started TribesByWendy Errands to remove those obstacles with simple booking, fast response and dependable service.</p>
              <p className="text-zinc-300 leading-relaxed">Our purpose is straightforward: make movement easy. We focus on affordability, speed and accountability so individuals and businesses can rely on us for errands and dispatch across Port Harcourt. No complications, just professional service that respects your time.</p>
              <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
            </div>
          </FadeInOnScroll>
        </section>
        

        <section className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Mission", text: "To simplify movement and logistics by offering fast, affordable and reliable errand & delivery services." },
                { title: "Vision", text: "To become the most trusted personal and business logistics partner across Nigeria." },
              ].map((card) => (
                <div key={card.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] backdrop-blur border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                    <div className="flex-1">
                      <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                      <div className={`font-bold mb-2`}>{card.title}</div>
                      <div className="text-zinc-300">{card.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16 relative">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>Our Core Values</h2>
            <div className="mt-8 relative">
              <div className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {[
                    { title: "Reliability", text: "Delivering consistently." },
                    { title: "Affordability", text: "Cost-effective logistics without the stress." },
                    { title: "Trust", text: "Every delivery treated with priority and care." },
                  ].map((v) => (
                    <div key={v.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] backdrop-blur-sm border border-zinc-800 transition-all duration-200 hover:border-[color:var(--gold-end)] hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-2"><span className="w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`font-semibold`}>{v.title}</div></div>
                      <div className="text-sm text-zinc-300">{v.text}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {[
                    { title: "Speed", text: "Your errands handled quickly and efficiently." },
                    { title: "Professionalism", text: "Friendly, trained and responsible team." },
                  ].map((v) => (
                    <div key={v.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] backdrop-blur-sm border border-zinc-800 transition-all duration-200 hover:border-[color:var(--gold-end)] hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-2"><span className="w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`font-semibold`}>{v.title}</div></div>
                      <div className="text-sm text-zinc-300">{v.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>Highlights</h2>
            <div className="mt-8 max-w-6xl mx-auto relative rounded-2xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
              <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {[
                    { end: 15000, label: "pickups completed", formatK: true, suffix: "+" },
                    { end: 98, label: "satisfaction rating", formatK: false, suffix: "%" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] backdrop-blur-sm border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)]">
                      <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                      <CountUp end={s.end} formatK={s.formatK} suffix={s.suffix} />
                      <div className="text-zinc-300">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {[
                    { end: 1, label: "city served", formatK: false, suffix: "" },
                    { end: 1200, label: "repeat orders", formatK: true, suffix: "+" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] backdrop-blur-sm border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)]">
                      <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                      <CountUp end={s.end} formatK={s.formatK} suffix={s.suffix} />
                      <div className="text-zinc-300">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-zinc-500 text-center">City: Port Harcourt</div>
          </FadeInOnScroll>
        </section>

        

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold`}>How We Work</h2>
            <div className="mt-8 relative rounded-2xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
              <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {[
                    { n: 1, t: "Book a Pickup", d: "Tell us what you need moved or delivered." },
                    { n: 2, t: "We Collect & Deliver", d: "A trained rider handles your request with care." },
                  ].map((step) => (
                    <div key={step.n} className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] backdrop-blur-sm border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200">
                      <div className="w-8 h-8 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] text-black flex items-center justify-center font-bold mb-4">{step.n}</div>
                      <div className={`font-semibold mb-1`}>{step.t}</div>
                      <div className="text-sm text-zinc-300">{step.d}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {[
                    { n: 3, t: "You Relax", d: "Track progress and receive your items on time." },
                    { n: 4, t: "Review & Confirmation", d: "We share delivery confirmation and feedback options." },
                  ].map((step) => (
                    <div key={step.n} className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] backdrop-blur-sm border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200">
                      <div className="w-8 h-8 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] text-black flex items-center justify-center font-bold mb-4">{step.n}</div>
                      <div className={`font-semibold mb-1`}>{step.t}</div>
                      <div className="text-sm text-zinc-300">{step.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        



        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold`}>FAQs</h2>
            <div className="mt-8 divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
              {[
                { q: "How fast are same-day pickups?", a: "Typically 1-3 hours depending on location." },
                { q: "Do you handle fragile items?", a: "Yes, riders are trained and items are packaged carefully." },
                { q: "Operating hours?", a: "Mon to Sat, 8am to 6pm; urgent pickups by request." },
                { q: "Which areas do you currently serve?", a: "Port Harcourt city-wide with partner coverage for interstate logistics." },
                { q: "How is pricing calculated?", a: "Transparent ₦ pricing based on distance, item type and urgency." },
                { q: "Can I track progress?", a: "Yes, we provide updates during pickup and delivery." },
                { q: "Can I reschedule?", a: "Yes, contact us as early as possible to adjust your pickup window." },
              ].map((f, i) => (
                <details key={f.q} className="group">
                  <summary className="list-none cursor-pointer px-6 py-4 flex items-center justify-between">
                    <span className={`font-semibold`}>{f.q}</span>
                    <span className="w-6 h-6 rounded-full border border-[color:var(--gold-end)] grid place-items-center text-[color:var(--gold-end)] transition-transform duration-200 group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-zinc-300">{f.a}</div>
                </details>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
              <div className="p-8 md:p-12">
                <div className={`text-2xl md:text-3xl font-extrabold`}>Ready for stress-free errands and deliveries?</div>
                <a href="/book/errand" className="inline-block mt-6 rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book an Errand</a>
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
