"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logger } from "@/lib/logger";

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">
      {children}
    </button>
  );
}

function OutlineGoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full px-6 py-3 font-semibold text-[color:var(--gold-end)] border border-[color:var(--gold-end)] transition-all duration-200 hover:bg-[color:rgba(245,199,109,0.08)]">
      {children}
    </button>
  );
}

function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const loggedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (!loggedRef.current) {
              logger.debug("Home.FadeInOnScroll", "section-visible");
              loggedRef.current = true;
            }
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [navSolid, setNavSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[--foreground]">
      

      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-28 md:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <FadeInOnScroll>
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] px-3 py-1 text-xs font-semibold text-black">
                  Operating Since 2019
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                  Save MORE on moving costs. Let’s help you MOVE.
                </h1>
                <p className="max-w-xl text-zinc-300">
                  Affordable, fast and reliable deliveries and moving services across Port Harcourt & Warri.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/book/pickup" className="rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book a Pickup</Link>
                  <Link href="/contact" className="rounded-full px-6 py-3 font-semibold text-[color:var(--gold-end)] border border-[color:var(--gold-end)] transition-all duration-200 hover:bg-[color:rgba(245,199,109,0.08)]">Contact Us</Link>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <HeroCrossfade />
            </FadeInOnScroll>
          </div>
        </section>

        <section className="py-20">
          <FadeInOnScroll>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Why Customers Trust Us</h2>
              <p className="text-zinc-400">Serving since 2019, dependable, affordable, and fast.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Trusted Since 2019","Fast & Reliable Riders","Affordable Moving Costs","Friendly Customer Support"].map((title) => (
                <div key={title} className="rounded-2xl bg-[#0A0A0A] p-6 border border-zinc-800 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] transition-all duration-200">
                  <div className="w-10 h-10 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                  <div className="font-semibold mb-2">{title}</div>
                  <div className="text-sm text-zinc-400">Premium service with attention to detail and reliability you can count on.</div>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className="text-center text-2xl md:text-3xl font-bold">What We Help You With</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Errand Services","Dispatch Delivery","Moving & Relocation"].map((title) => (
                <div key={title} className="rounded-xl bg-black/80 border border-zinc-800 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[color:var(--gold-end)]">
                  <div className="h-px w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                  <div className="font-semibold mb-2">{title}</div>
                  <div className="text-sm text-zinc-400">Tailored, timely, and secure, done the premium way.</div>
                  <a href="#" className="mt-4 inline-block text-sm text-[color:var(--gold-end)] underline underline-offset-4">Book Now</a>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-20 bg-[#0A0A0A] rounded-2xl">
          <FadeInOnScroll>
            <div className="px-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">What Our Customers Say</h2>
                <p className="text-zinc-400">Real experiences from 2019 to date.</p>
              </div>
              <Link href="/testimonials" className="hidden sm:inline-block rounded-full px-5 py-2 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_20px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_30px_rgba(245,199,109,0.35)]">See more</Link>
            </div>
            <div className="mt-8 overflow-x-auto snap-x snap-mandatory flex gap-6 px-6">
              {[
                { name: "Chinedu", text: "Swift pickup and very professional.", location: "Port Harcourt" },
                { name: "Amaka", text: "Affordable and stress-free moving.", location: "Warri" },
                { name: "Timi", text: "Reliable riders, great communication.", location: "Port Harcourt" },
              ].map((t, i) => (
                <div key={i} className="snap-start min-w-[280px] sm:min-w-[320px] rounded-xl p-5 bg-black/80 border border-zinc-800 shadow-[inset_0_0_30px_rgba(245,199,109,0.08)]">
                  <div className="flex items-center gap-1 text-[color:var(--gold-end)] mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <div className="text-sm text-zinc-300 mb-3">{t.text}</div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.location}</div>
                </div>
              ))}
            </div>
            <div className="px-6 sm:hidden mt-6">
              <Link href="/testimonials" className="inline-block rounded-full px-5 py-2 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_20px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_30px_rgba(245,199,109,0.35)]">See more</Link>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]">
              <div className="p-8 md:p-12 text-black">
                <div className="text-2xl md:text-3xl font-extrabold">Ready to move something today?</div>
                <div className="mt-2 text-sm md:text-base">Book a pickup in minutes. We’ll handle the stress.</div>
                <button className="mt-6 rounded-full bg-black text-[color:var(--gold-end)] border border-[color:var(--gold-end)] px-6 py-3 font-semibold relative overflow-hidden">
                  <span className="relative z-10">Book a Pickup</span>
                  <span className="absolute inset-0 shimmer" />
                </button>
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
                  <span className="font-semibold">TribesByWendy Errands</span>
                </div>
                <div className="text-zinc-400">Think logistics, Think us.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold mb-3">Contact</div>
                  <div className="text-sm text-zinc-300">+234 807 871 2534</div>
                  <div className="text-sm text-zinc-300">0803 842 9173</div>
                  <div className="text-sm text-zinc-300">Instagram: @Tribesbywendyerrands</div>
                </div>
                <div>
                  <div className="font-semibold mb-3">Locations</div>
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

function HeroCrossfade() {
  const [showAlt, setShowAlt] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const id = setInterval(() => setShowAlt((s) => !s), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[color:rgba(212,167,56,0.4)]/50 hover:shadow-[0_0_40px_rgba(212,167,56,0.25)] transition-all duration-200 w-full md:w-[420px] md:h-[420px]">
      <Image
        src="/hero.jpg"
        alt="TribesByWendy moving and delivery"
        width={1200}
        height={900}
        className={`w-full h-full object-cover transition-opacity duration-[1000ms] ${showAlt ? 'opacity-0' : 'opacity-100'}`}
      />
      <Image
        src="/images/wendy3.jpg"
        alt="TribesByWendy premium logistics visual"
        width={1200}
        height={900}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ${showAlt ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
