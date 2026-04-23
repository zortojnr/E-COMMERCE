"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    setVisible(false);
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
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash) setOpenId(hash);
  }, []);

  const services = [
    {
      id: "errand",
      title: "Errand logistics",
      description:
        "Let us handle your daily errands so you can focus on what matters most. We take care of document collection, package delivery, and routine tasks across the city with speed and reliability.",
      features: [],
      icon: "🧾",
    },
    {
      id: "dispatch",
      title: "Dispatch delivery",
      description:
        "Speed meets security. Our dispatch service is designed for businesses and individuals who need parcels moved quickly while maintaining careful handling and accountability.",
      features: [
        "Express and scheduled delivery options",
        "Secure packaging and professional handling",
        "Careful handoff at pickup and delivery",
        "Suitable for e commerce, retail, and corporate clients",
      ],
      icon: "📦",
    },
  ];

  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="pt-6 md:pt-10">
          <FadeInOnScroll>
            <div className="text-center">
              <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
              <h1 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight px-1`}>Our Services</h1>
              <p className="mt-4 text-[color:var(--brand-text-muted)] max-w-3xl mx-auto px-1">
                We offer local logistics for individuals and businesses: errands and dispatch across Port Harcourt, with clear communication and dependable handling.
              </p>
            </div>
            <div className="mt-10 sm:mt-12">
              <div className="relative overflow-hidden rounded-none border border-[color:var(--brand-border)] bg-[rgba(20,20,20,0.6)]">
                <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                  <Image
                    src="/3.jpg"
                    alt="Tribes by Wendy Errand Limited services"
                    fill
                    priority
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-10">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="rounded-none p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className="text-lg font-semibold mb-2">City wide focus</div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">Our core operations are within Port Harcourt for speed, consistency, and reliability.</div>
              </div>
              <div className="rounded-none p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-3" />
                <div className="text-lg font-semibold mb-2">Interstate support</div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">
                  Interstate deliveries can be arranged through third party providers at an additional cost. Where helpful, we can collect from your location and coordinate waybills on your behalf, with receipts and paperwork shared for transparency.
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        

        <section className="pb-10">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-none border border-[color:var(--brand-border)] bg-[rgba(20,20,20,0.6)]">
              <div className="relative aspect-[16/9] sm:aspect-[2/1]">
                <Image
                  src="/2.jpg"
                  alt="Logistics service in action"
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>What We Offer</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s) => (
                <div id={s.id} key={s.id} className="rounded-none border border-[color:var(--brand-border)] bg-[rgba(20,20,20,0.6)]">
                  <button
                    type="button"
                    aria-controls={`${s.id}-panel`}
                    aria-expanded={openId === s.id}
                    onClick={() => setOpenId(openId === s.id ? null : s.id)}
                    className="w-full text-left p-4 sm:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0 pt-1" aria-hidden>{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-3" />
                        <div className="text-lg sm:text-xl font-bold break-words">{s.title}</div>
                        <div className="text-sm text-[color:var(--brand-text-muted)] break-words">{s.description}</div>
                      </div>
                      <span className="ml-1 shrink-0 text-lg text-[color:var(--gold-end)] pt-1">{openId === s.id ? "⌄" : "›"}</span>
                    </div>
                  </button>
                  {openId === s.id && (
                    <div id={`${s.id}-panel`} role="region" aria-label={`${s.title} details`} className="px-6 pb-6">
                      {s.features.length > 0 && (
                        <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-300">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><span>{f}</span></li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        

        

        

        

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-none bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)]">
              <Image
                src="/9.jpg"
                alt="Get started with Tribes by Wendy Errand Limited"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/55 to-black/25" />
              <div className="relative z-10 p-8 md:p-12">
                <div className={`text-2xl md:text-3xl font-extrabold`}>Ready to get started?</div>
                <div className="mt-2 text-sm md:text-base text-[color:var(--brand-text-muted)]">Book an errand or contact us for a tailored logistics plan.</div>
                    <div className="mt-6 text-sm text-[color:var(--brand-text-muted)]">
                      View{" "}
                      <Link prefetch={false} href="/pricing" className="text-[color:var(--gold-end)] underline underline-offset-4 hover:opacity-90">
                        pricing
                      </Link>{" "}
                      or{" "}
                      <Link prefetch={false} href="/contact" className="text-[color:var(--gold-end)] underline underline-offset-4 hover:opacity-90">
                        contact us
                      </Link>
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
