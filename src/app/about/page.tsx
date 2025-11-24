"use client";
import Image from "next/image";
import { Poppins, DM_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { logger } from "@/lib/logger";

const poppins = Poppins({ subsets: ["latin"], weight: ["700","800"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

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
  const [imgSrc, setImgSrc] = useState("/wendy2.jpg");
  return (
    <div className={`${dmSans.variable} ${poppins.variable} min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32 text-center">
          <FadeInOnScroll>
            <h1 className={`${poppins.className} text-4xl md:text-5xl font-extrabold`}>Your Trusted Errands & Logistics Partner Since 2019</h1>
            <p className="mt-4 text-zinc-300">Delivering reliability, speed and stress-free logistics from Port Harcourt to Warri.</p>
            <div className="mx-auto mt-6 h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <FadeInOnScroll>
              <div className="space-y-5">
                <p className="text-zinc-300">TribesByWendy Errands was founded with one mission, to make movement and errands simple, reliable, and stress-free.</p>
                <p className="text-zinc-300">Since 2019, we have supported individuals, families, students and businesses with fast errands, dispatch delivery, and full relocation services.</p>
                <p className="text-zinc-300">From same-day deliveries to complete home and office moves, we are committed to handling every request with professionalism, care and trust.</p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="rounded-xl overflow-hidden bg-[#0B0B0B] border border-[color:rgba(212,167,56,0.40)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(245,199,109,0.25)] w-full md:w-[420px] md:h-[420px]">
                <Image src={imgSrc} alt="TribesByWendy founder and brand" width={1200} height={900} className="w-full h-full object-cover" onError={() => { logger.warn("AboutPage", "image-fallback", { tried: imgSrc, fallback: "/hero.jpg" }); setImgSrc("/hero.jpg"); }} />
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Mission", text: "To simplify movement and logistics by offering fast, affordable and reliable errand & delivery services." },
                { title: "Vision", text: "To become the most trusted personal and business logistics partner across Nigeria." },
              ].map((card) => (
                <div key={card.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)]">
                  <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                  <div className={`${poppins.className} font-bold mb-2`}>{card.title}</div>
                  <div className="text-zinc-300">{card.text}</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Our Core Values</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Reliability", text: "Delivering consistently since 2019." },
                { title: "Speed", text: "Your errands handled quickly and efficiently." },
                { title: "Affordability", text: "Cost-effective logistics without the stress." },
                { title: "Professionalism", text: "Friendly, trained and responsible team." },
                { title: "Trust", text: "Every delivery treated with priority and care." },
              ].map((v) => (
                <div key={v.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 transition-all duration-200 hover:border-[color:var(--gold-end)] hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                  <div className={`${poppins.className} font-semibold mb-2`}>{v.title}</div>
                  <div className="text-sm text-zinc-300">{v.text}</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Our Journey</h2>
            <div className="mt-8 relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
              <div className="space-y-8 pl-10">
                {[
                  { year: "2019", text: "Started operations in Port Harcourt." },
                  { year: "2020", text: "Expanded into full relocation support." },
                  { year: "2021", text: "Opened Warri/Jeddo branch." },
                  { year: "Today", text: "Continuing to serve customers with excellence." },
                ].map((t) => (
                  <div key={t.year} className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                    <div>
                      <div className={`${poppins.className} font-semibold`}>{t.year}</div>
                      <div className="text-zinc-300">{t.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Since 2019 — Highlights</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { k: "15k+", v: "pickups completed" },
                { k: "1.2k+", v: "relocations handled" },
                { k: "98%", v: "satisfaction rating" },
                { k: "2", v: "cities served" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                  <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                  <div className={`${poppins.className} text-2xl font-extrabold`}>{s.k}</div>
                  <div className="text-zinc-300">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-zinc-500">Cities: Port Harcourt & Warri</div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>How We Work</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: 1, t: "Book a Pickup", d: "Tell us what you need moved or delivered." },
                { n: 2, t: "We Collect & Deliver", d: "A trained rider handles your request with care." },
                { n: 3, t: "You Relax", d: "Track progress and receive your items on time." },
              ].map((step) => (
                <div key={step.n} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:scale-[1.02]">
                  <div className="w-8 h-8 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] text-black flex items-center justify-center font-bold mb-4">{step.n}</div>
                  <div className={`${poppins.className} font-semibold mb-1`}>{step.t}</div>
                  <div className="text-sm text-zinc-300">{step.d}</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Service Areas</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
                <div className={`${poppins.className} font-semibold mb-3`}>Port Harcourt</div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {[
                    "Alakahia",
                    "Choba",
                    "GRA Phase 2/3",
                    "Rumuokoro",
                    "Ada George",
                  ].map((a) => (
                    <li key={a} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
                <div className={`${poppins.className} font-semibold mb-3`}>Warri / Jeddo</div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {[
                    "Jeddo",
                    "PTI Road",
                    "Effurun",
                    "Udu",
                  ].map((a) => (
                    <li key={a} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Services At a Glance</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Errand Services", text: "Everyday tasks handled efficiently and securely." },
                { title: "Dispatch Delivery", text: "Fast city-wide deliveries with trained riders." },
                { title: "Moving & Relocation", text: "Home and office moves with complete care." },
              ].map((s) => (
                <div key={s.title} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:scale-[1.02]">
                  <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                  <div className={`${poppins.className} font-semibold mb-2`}>{s.title}</div>
                  <div className="text-sm text-zinc-300">{s.text}</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>FAQs</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "How fast are same-day pickups?", a: "Typically 1–3 hours depending on location." },
                { q: "Do you handle fragile items?", a: "Yes, riders are trained; items are packaged carefully." },
                { q: "Can you move a full apartment?", a: "Yes, full relocation services are available." },
                { q: "Operating hours?", a: "Mon–Sat, 8am–6pm; urgent pickups by request." },
              ].map((f) => (
                <div key={f.q} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
                  <div className={`${poppins.className} font-semibold mb-2`}>{f.q}</div>
                  <div className="text-sm text-zinc-300">{f.a}</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
              <div className="p-8 md:p-12">
                <div className={`${poppins.className} text-2xl md:text-3xl font-extrabold`}>Ready for stress-free errands and deliveries?</div>
                <button className="mt-6 rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book an Errand</button>
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
                  <span className={`${poppins.className} font-semibold`}>TribesByWendy Errands</span>
                </div>
                <div className="text-zinc-400">Think logistics, Think us.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className={`${poppins.className} font-semibold mb-3`}>Contact</div>
                  <div className="text-sm text-zinc-300">+234 807 871 2534</div>
                  <div className="text-sm text-zinc-300">0803 842 9173</div>
                  <div className="text-sm text-zinc-300">Instagram: @Tribesbywendyerrands</div>
                </div>
                <div>
                  <div className={`${poppins.className} font-semibold mb-3`}>Locations</div>
                  <div className="text-sm text-zinc-300">Head Office: No. 6, Mission Road, Alakahia, Port Harcourt</div>
                  <div className="text-sm text-zinc-300">Branch Office: Plot 28, DDPA Housing Estate, Jeddo, Warri</div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-xs text-zinc-500">© 2019 TribesByWendy Errands. All rights reserved.</div>
          </FadeInOnScroll>
        </footer>
      </main>
    </div>
  );
}
