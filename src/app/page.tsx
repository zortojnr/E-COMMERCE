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
  return <div className="text-3xl sm:text-4xl font-bold text-[color:var(--brand-text)] tabular-nums">{val}{suffix}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--brand-bg)] text-[color:var(--brand-text)]">
      {/* Hero Section with Faded Background */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-20 overflow-hidden">
        <Image
          src="/1.jpg"
          alt="Tribes By Wendy Errands Limited service showcase"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0B0B0B] to-[#111] opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,167,56,0.1),transparent_50%)]"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-16 min-h-[50vh] sm:min-h-[60vh]">
            {/* Left Side - Content */}
            <FadeIn>
              <div className="space-y-6 sm:space-y-8 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center max-w-[95vw] bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full">
                  <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full mr-2 animate-pulse shrink-0"></span>
                  Company profile
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] sm:leading-tight text-[color:var(--brand-text)] px-1">
                  Reliable logistics,
                  <span className="block text-transparent bg-clip-text bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]">
                    delivered with purpose
                  </span>
                </h1>
                <p className="text-base sm:text-xl text-[color:var(--brand-text-muted)] max-w-2xl mx-auto px-1 font-medium sm:font-normal">
                  Port Harcourt&apos;s trusted partner for fast, professional, and dependable delivery.
                </p>
                <p className="text-sm sm:text-base text-[color:var(--brand-text-muted)] max-w-2xl mx-auto px-1">
                  End to end logistics for businesses and individuals, with clear communication and accountable teams.
                </p>
                <div className="text-sm sm:text-base text-[color:var(--brand-text-muted)]">
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
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6">
                  <div className="bg-black/70 backdrop-blur rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                    <CountUp end={99} suffix="%" />
                    <div className="text-[10px] sm:text-xs text-[color:var(--brand-text-muted)] mt-1 leading-tight">On time delivery rate</div>
                  </div>
                  <div className="bg-black/70 backdrop-blur rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                    <CountUp end={120} suffix="+" />
                    <div className="text-[10px] sm:text-xs text-[color:var(--brand-text-muted)] mt-1 leading-tight">Multiple service routes</div>
                  </div>
                  <div className="bg-black/70 backdrop-blur rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                    <CountUp end={500} suffix="+" />
                    <div className="text-[10px] sm:text-xs text-[color:var(--brand-text-muted)] mt-1 leading-tight">Growing happy customers</div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Highlight Service Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-[color:var(--brand-bg-2)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[color:var(--brand-text)] mb-3 sm:mb-4">
                Our Core Services
              </h2>
              <p className="text-base sm:text-lg text-[color:var(--brand-text-muted)] max-w-2xl mx-auto px-1">
                Specialized logistics solutions designed to meet your delivery needs with precision and care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1 */}
              <div className="group relative bg-gradient-to-br from-[#111] to-[#0B0B0B] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-500 hover:shadow-[0_20px_60px_var(--brand-glow)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,199,109,0.1),transparent_70%)] rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[color:var(--brand-text)] mb-4">Errand Logistics</h3>
                  <p className="text-[color:var(--brand-text-muted)] mb-6 leading-relaxed">
                    Everyday runs handled with speed and care. From document delivery to package pickup, we handle your daily logistics needs efficiently.
                  </p>
                  <ul className="space-y-3 text-sm text-[color:var(--brand-text-muted)]">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Same day delivery service
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Document & package handling
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Clear communication from request to delivery
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
              <div className="group relative bg-gradient-to-br from-[#111] to-[#0B0B0B] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-500 hover:shadow-[0_20px_60px_var(--brand-glow)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,199,109,0.1),transparent_70%)] rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[color:var(--brand-text)] mb-4">Dispatch Delivery</h3>
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
                      Secure packaging and handling
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[color:var(--gold-end)] rounded-full"></span>
                      Scheduled pickup and delivery windows
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

      {/* Services Overview Section (3 cards) */}
      <section className="py-12 sm:py-16 md:py-20 bg-[color:var(--brand-bg-2)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[color:var(--brand-text)] mb-3 sm:mb-4">
                Complete Logistics Solutions
              </h2>
              <p className="text-base sm:text-lg text-[color:var(--brand-text-muted)] max-w-2xl mx-auto px-1">
                From Port Harcourt errands to same-day dispatch, we provide dependable local solutions tailored to your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Service 1 */}
              <div className="group bg-gradient-to-b from-[#111] to-[#0B0B0B] rounded-2xl p-5 sm:p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow)]">
                <div className="w-12 h-12 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[color:var(--brand-text)] mb-4">Reliable Service</h3>
                <p className="text-[color:var(--brand-text-muted)] mb-6">
                  Consistent, dependable logistics with professional handling and clear updates at pickup and delivery.
                </p>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>99% on time delivery rate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Professional handling protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Plain-language updates when your job moves</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 2 */}
              <div className="group bg-gradient-to-b from-[#111] to-[#0B0B0B] rounded-2xl p-5 sm:p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow)]">
                <div className="w-12 h-12 bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[color:var(--brand-text)] mb-4">Affordable Pricing</h3>
                <p className="text-[color:var(--brand-text-muted)] mb-6">
                  Competitive rates with transparent pricing and no hidden fees for all logistics services.
                </p>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Transparent, upfront pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>No hidden fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Volume discounts available</span>
                  </li>
                </ul>
              </div>
              
              {/* Service 3 */}
              <div className="group bg-gradient-to-b from-[#111] to-[#0B0B0B] rounded-2xl p-5 sm:p-8 border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-300 hover:shadow-[0_10px_40px_var(--brand-glow)]">
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
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Port Harcourt area specialists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Familiar neighborhoods and reliable local riders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-[color:var(--gold-end)] rounded-full shrink-0"></span>
                    <span>Local network partnerships</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-none border border-[color:var(--brand-border)] bg-[color:var(--brand-bg-2)]">
              <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src="/8.jpg"
                  alt="Logistics and dispatch service"
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[color:var(--brand-text)] mb-4 sm:mb-6 px-1">
              Ready to Streamline Your Logistics?
            </h2>
            <p className="text-base sm:text-xl text-[color:var(--brand-text-muted)] mb-6 sm:mb-8 max-w-2xl mx-auto px-1">
              Request a delivery in minutes. We will handle the route and coordination while you focus on growing your business.
            </p>
            <p className="text-sm sm:text-base text-[color:var(--brand-text-muted)]">
              For pricing and delivery requests, please use our official channels on the{" "}
              <Link prefetch={false} href="/contact" className="text-[color:var(--gold-end)] underline underline-offset-4 hover:opacity-90">
                contact page
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[color:var(--brand-bg-2)] border-t border-[color:var(--brand-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <Image src="/logo.jpg" alt="Tribes By Wendy Errands Limited logo" width={48} height={48} className="rounded shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold text-lg sm:text-xl text-white truncate">Tribes By Wendy Errands Limited</div>
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
                  <li><Link href="/services" className="hover:text-[color:var(--gold-end)] transition-colors">Errand logistics</Link></li>
                  <li><Link href="/services" className="hover:text-[color:var(--gold-end)] transition-colors">Dispatch delivery</Link></li>
                  <li><Link href="/pricing" className="hover:text-[color:var(--gold-end)] transition-colors">Pricing</Link></li>
                  <li><Link href="/contact" className="hover:text-[color:var(--gold-end)] transition-colors">Get in touch</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  <li>08157116337</li>
                  <li>08038429173</li>
                  <li><span className="font-semibold text-white">Follow Us on Instagram</span><br />@Tribesbywendyerrands</li>
                  <li>No. 6, Mission Road, Alakahia</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[color:var(--brand-border)] mt-12 pt-8 text-center space-y-3">
              <p className="text-xs sm:text-sm text-[color:var(--brand-text-muted)] max-w-2xl mx-auto px-2">
                Please arrange all deliveries through our official channels. We do not authorize customers to contact drivers directly for service requests.
              </p>
              <p className="text-sm text-[color:var(--brand-text-muted)]">
                © 2023 Tribes By Wendy Errands Limited. All rights reserved.
              </p>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
