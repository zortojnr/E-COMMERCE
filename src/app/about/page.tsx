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
    return <div ref={ref} className={`text-xl sm:text-2xl font-extrabold tabular-nums`}>{display}</div>;
  }
  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero Section with Image and Who We Are */}
        <section className="pt-6 md:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Who We Are */}
            <FadeInOnScroll>
              <div className="space-y-6">
                <div className="text-xs sm:text-sm uppercase tracking-widest text-[color:var(--brand-text-muted)]">Company profile</div>
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight`}>Reliable logistics, delivered with purpose</h1>
                <p className="text-lg sm:text-xl text-[color:var(--gold-end)] font-semibold">
                  Port Harcourt&apos;s trusted partner for fast, professional, and dependable delivery.
                </p>
                <div className="h-1 w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                <div className={`text-2xl font-bold text-[color:var(--gold-end)]`}>Who we are</div>
                <p className="text-zinc-300 leading-relaxed">
                  Tribes By Wendy Errands Limited is a premium logistics company rooted in Port Harcourt, Nigeria. We were built on a simple belief: that every delivery, no matter how big or small, deserves to be treated with professionalism, care, and urgency.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  From individual errands to business scale dispatch, we provide end to end logistics solutions that keep our clients moving. Our team combines deep local knowledge of Port Harcourt&apos;s routes with a commitment to showing up on time, every time.
                </p>
                <p className="text-zinc-300 leading-relaxed font-medium">
                  We do not just move packages. We move businesses forward.
                </p>
              </div>
            </FadeInOnScroll>
            
            {/* Right Side - Image */}
            <FadeInOnScroll>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="/hero.jpg"
                  alt="Tribes By Wendy Errands Limited Logistics Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-semibold">Operations you can rely on</div>
                  <div className="text-zinc-300 text-sm">Local expertise, accountable teams, clear communication</div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="max-w-3xl rounded-2xl p-8 bg-[rgba(20,20,20,0.6)] border border-zinc-800 mx-auto">
              <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
              <h2 className={`text-2xl font-bold`}>Our mission</h2>
              <p className="mt-3 text-zinc-300 leading-relaxed">
                To provide reliable, affordable, and professional logistics services that empower individuals and businesses across Port Harcourt and beyond, one delivery at a time.
              </p>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16 relative">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>Our core values</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Reliability", text: "We do what we say, when we say it." },
                { title: "Professionalism", text: "Every package is handled with care and accountability." },
                { title: "Speed", text: "Fast delivery without compromising quality." },
                { title: "Transparency", text: "Clear pricing, no surprises, no hidden fees." },
                { title: "Local expertise", text: "We know Port Harcourt, and we use that knowledge to your advantage." },
              ].map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] backdrop-blur-sm border border-zinc-800 transition-all duration-200 hover:border-[color:var(--gold-end)] hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                    <div className="font-semibold">{v.title}</div>
                  </div>
                  <div className="text-sm text-zinc-300">{v.text}</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>At a glance</h2>
            <div className="mt-8 max-w-6xl mx-auto relative rounded-2xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] border border-zinc-800">
                  <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4 mx-auto" />
                  <CountUp end={99} formatK={false} suffix="%" />
                  <div className="text-zinc-300 mt-2 text-sm">On time delivery rate</div>
                </div>
                <div className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] border border-zinc-800">
                  <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4 mx-auto" />
                  <CountUp end={120} formatK={false} suffix="+" />
                  <div className="text-zinc-300 mt-2 text-sm">Service routes</div>
                </div>
                <div className="rounded-xl p-6 bg-[rgba(22,22,22,0.7)] border border-zinc-800">
                  <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4 mx-auto" />
                  <CountUp end={500} formatK={false} suffix="+" />
                  <div className="text-zinc-300 mt-2 text-sm">Growing happy customers</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-zinc-500 text-center">Primary city: Port Harcourt</div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>Why choose Tribes By Wendy Errands Limited?</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Proven reliability", body: "99% on time delivery rate. We take punctuality personally." },
                { title: "Transparent pricing", body: "What we quote is what you pay. No hidden fees." },
                { title: "Local expertise", body: "Deep knowledge of Port Harcourt routes means faster, smarter delivery." },
                { title: "Professional team", body: "Trained staff who handle your items with care and respect." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-colors">
                  <div className="text-lg font-semibold text-[color:var(--gold-end)]">{item.title}</div>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-[rgba(20,20,20,0.6)] p-8 text-center">
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <p className="mt-3 text-zinc-300">Ready to experience logistics done right? We would love to work with you.</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm text-zinc-300">
                <div>
                  <div className="font-semibold text-white mb-1">Phone</div>
                  <div>08157116337</div>
                  <div>08038429173</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Address</div>
                  <div>No. 6, Mission Road, Alakahia, Port Harcourt</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="font-semibold text-white mb-1">Social media</div>
                  <div>@Tribesbywendyerrands</div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold`}>How We Work</h2>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="relative rounded-none p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
                <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {[
                      { n: 1, t: "Request a Delivery", d: "Tell us what you need moved or delivered." },
                      { n: 2, t: "We Collect and Deliver", d: "A trained rider handles your request with care." },
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
                      { n: 3, t: "You Relax", d: "We confirm pickup and delivery so you know when your items arrive." },
                      { n: 4, t: "Review and confirmation", d: "We share delivery confirmation and feedback options." },
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

              <div className="relative overflow-hidden rounded-none border border-zinc-800 bg-[rgba(20,20,20,0.6)]">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]">
                  <Image
                    src="/7.jpg"
                    alt="Delivery and logistics process"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
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
                { q: "How fast are same day pickups?", a: "Typically within 1 to 3 hours, depending on location." },
                { q: "Do you handle fragile items?", a: "Yes, riders are trained and items are packaged carefully." },
                { q: "What are your operating hours?", a: "Monday to Saturday, 8am to 6pm. Urgent requests are available on request." },
                { q: "Which areas do you currently serve?", a: "Port Harcourt city wide, with partner coverage for interstate logistics." },
                { q: "How is pricing calculated?", a: "Transparent pricing based on distance, item type, and urgency." },
                { q: "Will I get updates on my request?", a: "Yes. We share updates during collection and delivery through our official channels." },
                { q: "Can I reschedule?", a: "Yes. Please contact us as early as possible to adjust your collection window." },
              ].map((f, i) => (
                <details key={f.q} className="group">
                  <summary className="list-none cursor-pointer px-4 sm:px-6 py-4 flex items-start sm:items-center justify-between gap-3 text-left">
                    <span className={`font-semibold min-w-0 pr-2`}>{f.q}</span>
                    <span className="w-6 h-6 shrink-0 rounded-full border border-[color:var(--gold-end)] grid place-items-center text-[color:var(--gold-end)] transition-transform duration-200 group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="px-4 sm:px-6 pb-6 text-sm text-zinc-300">{f.a}</div>
                </details>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
              <div className="p-8 md:p-12">
                <div className={`text-2xl md:text-3xl font-extrabold`}>Ready for dependable errands and deliveries?</div>
                <div className="mt-4 text-sm text-zinc-300">
                  See{" "}
                  <a href="/pricing" className="text-[color:var(--gold-end)] underline underline-offset-4 hover:opacity-90">
                    pricing
                  </a>{" "}
                  or{" "}
                  <a href="/contact" className="text-[color:var(--gold-end)] underline underline-offset-4 hover:opacity-90">
                    contact us
                  </a>
                  .
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <footer className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/logo.jpg" alt="Tribes By Wendy Errands Limited logo" width={40} height={40} className="rounded" />
                  <span className={`font-semibold`}>Tribes By Wendy Errands Limited</span>
                </div>
                <div className="text-zinc-400">Think logistics, Think us.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className={`font-semibold mb-3`}>Contact</div>
                  <div className="text-sm text-zinc-300">08157116337</div>
                  <div className="text-sm text-zinc-300">08038429173</div>
                  <div className={`font-semibold mt-3 mb-1`}>Follow Us on Instagram</div>
                  <div className="text-sm text-zinc-300">@Tribesbywendyerrands</div>
                </div>
                <div>
                  <div className={`font-semibold mb-3`}>Locations</div>
                  <div className="text-sm text-zinc-300">Head Office: No. 6, Mission Road, Alakahia, Port Harcourt</div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-xs text-zinc-500">© 2023 Tribes By Wendy Errands Limited. All rights reserved.</div>
          </FadeInOnScroll>
        </footer>
      </main>
    </div>
  );
}
