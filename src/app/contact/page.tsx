"use client";
import { motion } from "framer-motion";
import Image from "next/image";


const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const EMAIL = "tbwerrandsandlogisticsltd@gmail.com";

export default function ContactPage() {
  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="pt-6 md:pt-10">
          <div className="max-w-3xl">
            <div className="relative overflow-hidden rounded-none border border-zinc-800 bg-[rgba(20,20,20,0.6)]">
              <Image
                src="/6.jpg"
                alt="Customer support and logistics coordination"
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/55 to-black/25" />
              <div className="relative p-6 sm:p-8">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="space-y-4 sm:space-y-6">
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight`}>Get in Touch With Us</h1>
                  <div className="h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
                  <p className="max-w-xl text-zinc-200">Reliable support for errands and dispatch, available in Port Harcourt.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-black border border-[color:var(--gold-end)] grid place-items-center">
                  <svg aria-hidden className="w-4 h-4 text-[color:var(--gold-end)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.47 3.27a2 2 0 0 1-.57 1.82l-2.2 2.2a16 16 0 0 0 7.07 7.07l2.2-2.2a2 2 0 0 1 1.82-.57l3.27.47A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className={`font-semibold`}>Phone / WhatsApp</div>
              </div>
              <div className="space-y-2 text-zinc-300">
                <a href="tel:08157116337" className="block underline underline-offset-4">Call: 08157116337</a>
                <a href="tel:08038429173" className="block underline underline-offset-4">Call: 08038429173</a>
                <a href="https://wa.me/2348078712534" target="_blank" rel="noopener noreferrer" className="block underline underline-offset-4">WhatsApp: 08078712534</a>
              </div>
            </motion.div>
            <motion.a variants={item} href="https://instagram.com/Tribesbywendyerrands" target="_blank" rel="noopener noreferrer" className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-black border border-[color:var(--gold-end)] grid place-items-center">
                  <svg aria-hidden className="w-4 h-4 text-[color:var(--gold-end)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                  </svg>
                </div>
                <div className={`font-semibold`}>Follow Us on Instagram</div>
              </div>
              <div className="text-zinc-300">@Tribesbywendyerrands</div>
            </motion.a>
            <motion.div variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-black border border-[color:var(--gold-end)] grid place-items-center">
                  <svg aria-hidden className="w-4 h-4 text-[color:var(--gold-end)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className={`font-semibold`}>Email</div>
              </div>
              <div className="space-y-2 text-zinc-300">
                <a href={`mailto:${EMAIL}`} className="block underline underline-offset-4 break-all">{EMAIL}</a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)]">
            <div className={`text-xl font-bold mb-2`}>Service policy</div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Please note: we prohibit calling drivers directly to request a service. All deliveries must be completed through the company&apos;s official communication channels.
            </p>
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
            <div className={`text-xl font-bold mb-4`}>Our guarantees</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
              <div className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><span><strong className="text-white">Reliability.</strong> Consistent service you can trust.</span></div>
              <div className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><span><strong className="text-white">Speed.</strong> Fast response and rapid deliveries.</span></div>
              <div className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><span><strong className="text-white">Accountability.</strong> Transparent communication at every step.</span></div>
              <div className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" /><span><strong className="text-white">Safety.</strong> Your items handled with care and professionalism.</span></div>
            </div>
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className={`text-xl font-bold mb-4`}>Send a Message</div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-base text-white" placeholder="Name" />
              <input className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-base text-white" placeholder="Email" type="email" />
              <input className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-base text-white" placeholder="Phone" />
              <textarea className="md:col-span-2 rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-base text-white" placeholder="Message" rows={4} />
              <button type="button" className="md:col-span-2 rounded-xl px-6 py-3 min-h-11 w-full sm:w-auto justify-self-stretch sm:justify-self-start text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Send Message</button>
            </form>
          </motion.div>
        </section>

        <section className="my-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
            <div className="p-8 md:p-12">
              <div className={`text-2xl md:text-3xl font-extrabold`}>Need urgent assistance?</div>
              <div className="mt-2 text-sm md:text-base text-zinc-300">We respond fast on WhatsApp, message us anytime.</div>
              <a href="https://wa.me/2348078712534" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Chat on WhatsApp</a>
            </div>
          </motion.div>
        </section>

        <footer className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-[linear-gradient(135deg,var(--gold-start),var(--gold-end))]" aria-hidden />
                  <span className={`font-semibold`}>TribesByWendy Errands</span>
                </div>
                <div className="text-zinc-400">Think logistics, Think us.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className={`font-semibold mb-3`}>Contact</div>
                  <div className="text-sm text-zinc-300">08157116337</div>
                  <div className="text-sm text-zinc-300">08038429173</div>
                  <a href={`mailto:${EMAIL}`} className="text-sm text-zinc-300 underline underline-offset-4 block break-all">{EMAIL}</a>
                  <div className={`font-semibold mt-3 mb-1`}>Follow Us on Instagram</div>
                  <div className="text-sm text-zinc-300">@Tribesbywendyerrands</div>
                </div>
                <div>
                  <div className={`font-semibold mb-3`}>Locations</div>
                  <div className="text-sm text-zinc-300">Head Office: No. 6, Mission Road, Alakahia, Port Harcourt</div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-xs text-zinc-500">© 2023 TribesByWendy Errands. All rights reserved.</div>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
