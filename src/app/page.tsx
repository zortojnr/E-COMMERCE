"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  return <div ref={ref} className={`transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>{children}</div>;
}

function LogoIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-16 w-full max-w-[160px] bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)] rounded-lg flex items-center justify-center hover:border-[color:var(--gold-end)] transition-colors overflow-hidden">
      <Image src={src} alt={alt} width={160} height={64} className="object-contain" unoptimized />
    </div>
  );
}

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
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
  return <div className="text-4xl font-bold text-[color:var(--brand-text)]">{val}{suffix}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--brand-bg)] text-[color:var(--brand-text)]">
      {/* Hero Section with Faded Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0B0B0B] to-[#111] opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,167,56,0.1),transparent_50%)]"></div>
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 min-h-[60vh]">
            {/* Left Side - Content */}
            <FadeIn>
              <div className="space-y-8 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)] px-4 py-2 text-sm rounded-full">
                  <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full mr-2 animate-pulse"></span>
                  Premium Logistics Solutions
                </div>
                <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-[color:var(--brand-text)]">
                  Reliable Logistics
                  <span className="block text-transparent bg-clip-text bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]">
                    Built for Speed
                  </span>
                </h1>
                <p className="text-xl text-[color:var(--brand-text-muted)] max-w-2xl mx-auto">
                  End-to-end logistics services focused on dependable movement, on-time delivery and professional handling across Port Harcourt and beyond.
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Link prefetch={false} href="/book/pickup" className="rounded-full px-8 py-4 font-semibold text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_8px_30px_var(--brand-glow)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow-hover)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">
                    Book a Pickup
                  </Link>
                  <Link prefetch={false} href="/contact" className="rounded-full px-8 py-4 font-semibold text-[color:var(--gold-end)] border-2 border-[color:var(--gold-end)] transition-all duration-300 hover:bg-[color:rgba(245,199,109,0.1)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">
                    Contact Sales
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                  <div className="bg-black/70 backdrop-blur rounded-xl p-4 text-center">
                    <CountUp end={99} suffix="%" />
                    <div className="text-xs text-[color:var(--brand-text-muted)] mt-1">On-time Delivery</div>
                  </div>
                  <div className="bg-black/70 backdrop-blur rounded-xl p-4 text-center">
                    <CountUp end={120} suffix="+" />
                    <div className="text-xs text-[color:var(--brand-text-muted)] mt-1">Service Routes</div>
                  </div>
                  <div className="hidden md:block bg-black/70 backdrop-blur rounded-xl p-4 text-center">
                    <CountUp end={500} suffix="+" />
                    <div className="text-xs text-[color:var(--brand-text-muted)] mt-1">Happy Customers</div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Highlight Service Cards */}
      <section className="py-20 bg-[color:var(--brand-bg-2)]">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[color:var(--brand-text)] mb-4">
                Our Core Services
              </h2>
              <p className="text-lg text-[color:var(--brand-text-muted)] max-w-2xl mx-auto">
                Specialized logistics solutions designed to meet your delivery needs with precision and care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="group relative bg-gradient-to-br from-[#111] to-[#0B0B0B] rounded-3xl p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-500 hover:shadow-[0_20px_60px_var(--brand-glow)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,199,109,0.1),transparent_70%)] rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[color:var(--brand-text)] mb-4">Errand Logistics</h3>
                  <p className="text-[color:var(--brand-text-muted)] mb-6 leading-relaxed">
                    Everyday runs handled with speed and care. From document delivery to package pickup, we handle your daily logistics needs efficiently.
                  </p>
                  <ul className="space-y-3 text-sm text-[color:var(--brand-text-muted)]">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Same-day delivery service
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Document & package handling
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Real-time tracking updates
                    </li>
                  </ul>
                  <Link href="/services" className="inline-flex items-center gap-2 mt-6 text-[color:var(--gold-end)] hover:text-[color:var(--gold-start)] transition-colors font-semibold">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group relative bg-gradient-to-br from-[#111] to-[#0B0B0B] rounded-3xl p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-500 hover:shadow-[0_20px_60px_var(--brand-glow)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,199,109,0.1),transparent_70%)] rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[color:var(--brand-text)] mb-4">Dispatch Delivery</h3>
                  <p className="text-[color:var(--brand-text-muted)] mb-6 leading-relaxed">
                    Fast, secure parcel movement with professional handling. Specialized delivery solutions for businesses and individuals.
                  </p>
                  <ul className="space-y-3 text-sm text-[color:var(--brand-text-muted)]">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Express delivery options
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Secure packaging & handling
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Signature confirmation
                    </li>
                  </ul>
                  <Link href="/services" className="inline-flex items-center gap-2 mt-6 text-[color:var(--gold-end)] hover:text-[color:var(--gold-start)] transition-colors font-semibold">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Partner/Client Logo Row */}
      <section className="py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h3 className="text-lg font-semibold text-[color:var(--brand-text-muted)] mb-8">
                Trusted by Businesses Across Port Harcourt
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
              {[
                { src: "/1.png", alt: "Partner 1" },
                { src: "/2.jpg", alt: "Partner 2" },
                { src: "/3.png", alt: "Partner 3" },
                { src: "/4.png", alt: "Partner 4" },
              ].map((l, i) => (
                <div key={i} className="flex items-center justify-center">
                  <LogoIcon src={l.src} alt={l.alt} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[color:var(--brand-text-muted)]">
              We only help our customers do interstate deliveries using these businesses. If you can’t go to the park, we can pick up and waybill for you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Overview Section (3 cards) */}
      <section className="py-20 bg-[color:var(--brand-bg-2)]">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[color:var(--brand-text)] mb-4">
                Complete Logistics Solutions
              </h2>
              <p className="text-lg text-[color:var(--brand-text-muted)] max-w-2xl mx-auto">
                From local deliveries to enterprise logistics, we provide comprehensive solutions tailored to your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="group bg-gradient-to-b from-[#111] to-[#0B0B0B] rounded-2xl p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow)]">
                <div className="w-12 h-12 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[color:var(--brand-text)] mb-4">Reliable Service</h3>
                <p className="text-[color:var(--brand-text-muted)] mb-6">
                  Consistent, dependable logistics with professional handling and real-time tracking.
                </p>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li>• 99% on-time delivery rate</li>
                  <li>• Professional handling protocols</li>
                  <li>• Real-time tracking updates</li>
                </ul>
              </div>
              
              {/* Service 2 */}
              <div className="group bg-gradient-to-b from-[#111] to-[#0B0B0B] rounded-2xl p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow)]">
                <div className="w-12 h-12 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-black text-2xl font-extrabold">₦</span>
                </div>
                <h3 className="text-xl font-bold text-[color:var(--brand-text)] mb-4">Affordable Pricing</h3>
                <p className="text-[color:var(--brand-text-muted)] mb-6">
                  Competitive rates with transparent pricing and no hidden fees for all logistics services.
                </p>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li>• Transparent ₦ pricing</li>
                  <li>• No hidden fees</li>
                  <li>• Volume discounts available</li>
                </ul>
              </div>
              
              {/* Service 3 */}
              <div className="group bg-gradient-to-b from-[#111] to-[#0B0B0B] rounded-2xl p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow)]">
                <div className="w-12 h-12 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[color:var(--brand-text)] mb-4">Local Expertise</h3>
                <p className="text-[color:var(--brand-text-muted)] mb-6">
                  Deep knowledge of Port Harcourt routes and logistics network for efficient delivery.
                </p>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li>• Port Harcourt area specialists</li>
                  <li>• Optimized route planning</li>
                  <li>• Local network partnerships</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-extrabold text-[color:var(--brand-text)] mb-6">
              Ready to Streamline Your Logistics?
            </h2>
            <p className="text-xl text-[color:var(--brand-text-muted)] mb-8 max-w-2xl mx-auto">
              Book a pickup in minutes. We'll handle the route and the stress while you focus on growing your business.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link prefetch={false} href="/book/pickup" className="rounded-full px-8 py-4 font-semibold text-black bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_8px_30px_var(--brand-glow)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow-hover)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">
                Book a Pickup
              </Link>
              <Link prefetch={false} href="/contact" className="rounded-full px-8 py-4 font-semibold text-[color:var(--gold-end)] border-2 border-[color:var(--gold-end)] transition-all duration-300 hover:bg-[color:rgba(245,199,109,0.1)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-end)] active:opacity-90">
                Get a Quote
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[color:var(--brand-bg-2)] border-t border-[color:var(--brand-border)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-4">
                  <Image src="/logo.jpg" alt="TribesByWendy logo" width={48} height={48} className="rounded" />
                  <div>
                    <div className="font-bold text-xl text-white">TribesByWendy Errands</div>
                    <div className="text-sm text-[color:var(--brand-text-muted)]">THINK LOGISTICS, THINK US</div>
                  </div>
                </div>
                <p className="text-[color:var(--brand-text-muted)] max-w-md">
                  Premium logistics and errand services in Port Harcourt. Reliable, fast, and professional delivery solutions for individuals and businesses.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li><Link href="/services" className="hover:text-[color:var(--gold-end)] transition-colors">Errand Logistics</Link></li>
                  <li><Link href="/services" className="hover:text-[color:var(--gold-end)] transition-colors">Dispatch Delivery</Link></li>
                  <li><Link href="/services" className="hover:text-[color:var(--gold-end)] transition-colors">Enterprise Logistics</Link></li>
                  <li><Link href="/services" className="hover:text-[color:var(--gold-end)] transition-colors">International Forwarding</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li>+234 807 871 2534</li>
                  <li>0803 842 9173</li>
                  <li>@Tribesbywendyerrands</li>
                  <li>No. 6, Mission Road, Alakahia</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[color:var(--brand-border)] mt-12 pt-8 text-center">
              <p className="text-sm text-[color:var(--brand-text-muted)]">
                © 2024 TribesByWendy Errands. All rights reserved.
              </p>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
