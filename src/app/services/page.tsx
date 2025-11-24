"use client";
import Image from "next/image";
import { Poppins, DM_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";

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
  const [thumbErrand, setThumbErrand] = useState("/images/wendy2.jpg");
  const [thumbDispatch, setThumbDispatch] = useState("/images/wendy5.jpg");
  const [thumbMove, setThumbMove] = useState("/images/wendy7.jpg");
  const [imgErrand, setImgErrand] = useState("/images/wendy2.jpg");
  const [imgDispatch, setImgDispatch] = useState("/images/wendy5.jpg");
  const [imgMove, setImgMove] = useState("/images/wendy7.jpg");
  const [covPH, setCovPH] = useState("/images/wendy1.jpg");
  const [covWarri, setCovWarri] = useState("/images/wendy6.jpg");

  return (
    <div className={`${dmSans.variable} ${poppins.variable} min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32 text-center">
          <FadeInOnScroll>
            <div className="inline-flex items-center rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] px-3 py-1 text-xs font-semibold text-black">Since 2019</div>
            <h1 className={`${poppins.className} mt-4 text-4xl md:text-5xl font-extrabold`}>Services tailored to your everyday movement.</h1>
            <p className="mt-4 text-zinc-300">Errands. Dispatch. Relocation. We handle it all with professionalism and speed.</p>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold text-center`}>What we help you with</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                <div className={`${poppins.className} font-semibold mb-2`}>Errand Services</div>
                <div className="text-sm text-zinc-300">Simplifying your everyday tasks with fast and dependable errands.</div>
                <div className="absolute top-4 right-4 rounded-md overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                  <Image src={thumbErrand} alt="Errand Services" width={96} height={64} sizes="96px" unoptimized={!isProd} className="object-cover rounded-md" onError={() => setThumbErrand("/hero.jpg")} />
                </div>
              </div>
              <div className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                <div className={`${poppins.className} font-semibold mb-2`}>Dispatch Delivery</div>
                <div className="text-sm text-zinc-300">Secure and efficient parcel movement for individuals and businesses.</div>
                <div className="absolute top-4 right-4 rounded-md overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                  <Image src={thumbDispatch} alt="Dispatch Delivery" width={96} height={64} sizes="96px" unoptimized={!isProd} className="object-cover rounded-md" onError={() => setThumbDispatch("/hero.jpg")} />
                </div>
              </div>
              <div className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                <div className="h-1 w-16 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] mb-4" />
                <div className={`${poppins.className} font-semibold mb-2`}>Moving & Relocation</div>
                <div className="text-sm text-zinc-300">Hassle-free moving for students, families and offices.</div>
                <div className="absolute top-4 right-4 rounded-md overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                  <Image src={thumbMove} alt="Moving & Relocation" width={96} height={64} sizes="96px" unoptimized={!isProd} className="object-cover rounded-md" onError={() => setThumbMove("/hero.jpg")} />
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className={`${poppins.className} text-xl font-bold mb-3`}>Errand Services</div>
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
              <div className="rounded-xl overflow-hidden bg-[#0B0B0B] border border-[color:rgba(212,167,56,0.40)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(245,199,109,0.25)] w-full md:w-[420px] md:h-[420px]">
                <Image src={imgErrand} alt="Errand services image" width={1200} height={900} sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw" unoptimized={!isProd} className="w-full h-full object-cover" onError={() => setImgErrand("/hero.jpg")} />
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 rounded-xl overflow-hidden bg-[#0B0B0B] border border-[color:rgba(212,167,56,0.40)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(245,199,109,0.25)] w-full md:w-[420px] md:h-[420px]">
                <Image src={imgDispatch} alt="Dispatch delivery image" width={1200} height={900} sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw" unoptimized={!isProd} className="w-full h-full object-cover" onError={() => setImgDispatch("/hero.jpg")} />
              </div>
              <div className="order-1 md:order-2">
                <div className={`${poppins.className} text-xl font-bold mb-3`}>Dispatch Delivery</div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className={`${poppins.className} text-xl font-bold mb-3`}>Moving & Relocation</div>
                <div className="text-zinc-300 mb-2">Stress-free moves for homes, offices and students.</div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {[
                    "Hostel/apartment moves",
                    "Packing & loading support",
                    "Transport arrangement",
                    "Business relocation help",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />{b}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden bg-[#0B0B0B] border border-[color:rgba(212,167,56,0.40)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(245,199,109,0.25)] w-full md:w-[420px] md:h-[420px]">
                <Image src={imgMove} alt="Moving & relocation image" width={1200} height={900} sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw" unoptimized={!isProd} className="w-full h-full object-cover" onError={() => setImgMove("/hero.jpg")} />
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="py-16">
          <FadeInOnScroll>
            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold`}>Where we currently serve</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200">
                <div className={`${poppins.className} font-semibold mb-2`}>Port Harcourt</div>
                <div className="text-sm text-zinc-300 mb-4">Head Office: No. 6, Mission Road, Alakahia</div>
                <div className="rounded-md overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                  <Image src={covPH} alt="Port Harcourt office" width={600} height={360} sizes="(min-width: 1024px) 50vw, 100vw" unoptimized={!isProd} className="w-full h-auto object-cover" onError={() => setCovPH("/hero.jpg")} />
                </div>
              </div>
              <div className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200">
                <div className={`${poppins.className} font-semibold mb-2`}>Warri / Jeddo</div>
                <div className="text-sm text-zinc-300 mb-4">Branch Office: Plot 28, DDPA Housing Estate</div>
                <div className="rounded-md overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                  <Image src={covWarri} alt="Warri branch" width={600} height={360} sizes="(min-width: 1024px) 50vw, 100vw" unoptimized={!isProd} className="w-full h-auto object-cover" onError={() => setCovWarri("/hero.jpg")} />
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        <section className="my-20">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
              <div className="p-8 md:p-12">
                <div className={`${poppins.className} text-2xl md:text-3xl font-extrabold`}>Ready to book a service?</div>
                <div className="mt-2 text-sm md:text-base text-zinc-300">Errands, dispatch and moving, handled professionally.</div>
                <a href="/book/pickup" className="mt-6 inline-block rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book a Service Now</a>
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
