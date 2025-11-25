"use client";
import Image from "next/image";
import Link from "next/link";
import { Poppins, DM_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import CarouselCard from "@/components/CarouselCard";

const poppins = Poppins({ subsets: ["latin"], weight: ["700","800"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

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
  const isProd = process.env.NODE_ENV === "production";
  const allImages = ["/images/wendy1.jpg","/images/wendy 2.jpg","/images/wendy3.jpg","/images/wendy5.jpg","/images/wendy6.jpg","/images/wendy 7.jpg"];
  const [covPH, setCovPH] = useState("/images/wendy1.jpg");

  return (
    <div className={`${dmSans.variable} ${poppins.variable} min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32 text-center">
          <FadeInOnScroll>
            <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
            <h1 className={`${poppins.className} mt-4 text-4xl md:text-5xl font-extrabold`}>Services tailored to your everyday movement.</h1>
            <p className="mt-4 text-[color:var(--brand-text-muted)]">Errands. Dispatch. We handle it with professionalism and speed.</p>
          </FadeInOnScroll>
        </section>

        <section className="py-10">
          <FadeInOnScroll>
            <div className="rounded-xl p-4 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center" role="list" aria-label="Certified partners">
                <div role="listitem" className="flex items-center justify-center h-16">
                  <Image src="/images/logos/gig.png" alt="GIG Logistics" width={140} height={40} unoptimized={!isProd} onError={(e) => { (e.currentTarget as any).style.display = 'none'; }} />
                  <span className="sr-only">GIG Logistics</span>
                </div>
                <div role="listitem" className="flex items-center justify-center h-16">
                  <Image src="/images/logos/fedex.png" alt="FedEx" width={120} height={40} unoptimized={!isProd} onError={(e) => { (e.currentTarget as any).style.display = 'none'; }} />
                  <span className="sr-only">FedEx</span>
                </div>
                <div role="listitem" className="flex items-center justify-center h-16">
                  <Image src="/images/logos/dhl.png" alt="DHL" width={120} height={40} unoptimized={!isProd} onError={(e) => { (e.currentTarget as any).style.display = 'none'; }} />
                  <span className="sr-only">DHL</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-[color:var(--brand-text-muted)]">GIG Logistics, FedEx, and DHL are trademarks of their respective owners; used with attribution.</div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold text-center`}>What we help you with</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow)] hover:scale-[1.02]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                <div className="flex items-center gap-2 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`${poppins.className} font-semibold`}>Errand Services</div></div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">Simplifying your everyday tasks with fast and dependable errands.</div>
                <div className="absolute top-4 right-4 w-24 h-16 rounded-md overflow-hidden border border-[color:var(--brand-border)]">
                  <CarouselCard images={allImages} intervalMs={5000} aspect="wide" showControls={false} className="!w-full !h-full" />
                </div>
              </div>
              <div className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow)] hover:scale-[1.02]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                <div className="flex items-center gap-2 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`${poppins.className} font-semibold`}>Dispatch Delivery</div></div>
                <div className="text-sm text-[color:var(--brand-text-muted)]">Secure and efficient parcel movement for individuals and businesses.</div>
                <div className="absolute top-4 right-4 w-24 h-16 rounded-md overflow-hidden border border-[color:var(--brand-border)]">
                  <CarouselCard images={allImages} intervalMs={5000} aspect="wide" showControls={false} className="!w-full !h-full" />
                </div>
              </div>
              <div className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)] hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow)] hover:scale-[1.02]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                <div className="flex items-center gap-2 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`${poppins.className} font-semibold`}>Interstate Logistics via Certified Partners</div></div>
                <ul className="mt-2 space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  {[
                    "Nationwide pickup and delivery corridors",
                    "Service level agreements: Standard (48–72h), Express (24–48h)",
                    "Special handling: fragile, insured consignments, document handling",
                    "Proof of delivery available upon request",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3"><span className="inline-block w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`${poppins.className} text-xl font-bold`}>Errand Services</div></div>
                <div className="text-zinc-300 mb-2">Perfect for professionals, families & students.</div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {[
                    "Market & grocery shopping",
                    "Office & bank errands",
                    "Document and parcel pickups",
                    "Store-to-home deliveries",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{b}</li>
                  ))}
                </ul>
              </div>
              <CarouselCard images={allImages} intervalMs={5000} aspect="square" />
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <CarouselCard images={allImages} intervalMs={5000} aspect="square" />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-2 mb-3"><span className="inline-block w-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><div className={`${poppins.className} text-xl font-bold`}>Dispatch Delivery</div></div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Same-day Delivery","Secure Handling","Quick Response"].map((tag) => (
                    <span key={tag} className="text-xs rounded-full px-3 py-1 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] text-black font-semibold">{tag}</span>
                  ))}
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {[
                    "Same-day dispatch",
                    "Riders trained for secure handling",
                    "Real-time communication",
                    "Business & personal deliveries",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Interstate Service Coverage</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className={`${poppins.className} font-semibold mb-3`}>Operational States/Regions</div>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  {["Rivers","Lagos","Abuja","Ogun","Kano"].map((s) => (
                    <li key={s} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className={`${poppins.className} font-semibold mb-3`}>Service Level Agreements</div>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  {["Standard: 48–72 hours","Express: 24–48 hours","On-time target: ≥ 98%"].map((s) => (
                    <li key={s} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
                <div className={`${poppins.className} font-semibold mb-3`}>Special Handling Capabilities</div>
                <ul className="space-y-2 text-sm text-[color:var(--brand-text-muted)]">
                  {["Fragile items","Secure parcels","Insured consignments","Document handling"].map((s) => (
                    <li key={s} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[color:var(--brand-bg-2)] border border-[color:var(--brand-border)]">
              <div className="p-8 md:p-12">
                <div className={`${poppins.className} text-2xl md:text-3xl font-extrabold`}>Ready to book a service?</div>
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
