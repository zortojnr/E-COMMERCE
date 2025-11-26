"use client";
import Image from "next/image";
import { motion } from "framer-motion";


const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function ContactPage() {
  const isProd = process.env.NODE_ENV === "production";
  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="space-y-6">
              <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight`}>Get in Touch With Us</h1>
              <div className="h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
              <p className="max-w-xl text-zinc-300">Reliable support for errands and dispatch, available in Port Harcourt.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }} className="rounded-xl overflow-hidden bg-[#0A0A0A] border border-[color:rgba(212,167,56,0.40)] hover:shadow-[0_0_40px_rgba(245,199,109,0.25)] w-full md:w-[420px] md:h-[420px]">
              <Image src="/wendy3.jpg" alt="Contact visual" width={1200} height={900} sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw" unoptimized={!isProd} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-black border border-[color:var(--gold-end)] grid place-items-center">
                  <svg aria-hidden className="w-4 h-4 text-[color:var(--gold-end)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.47 3.27a2 2 0 0 1-.57 1.82l-2.2 2.2a16 16 0 0 0 7.07 7.07l2.2-2.2a2 2 0 0 1 1.82-.57l3.27.47A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className={`font-semibold`}>Phone / WhatsApp</div>
              </div>
              <div className="space-y-2 text-zinc-300">
                <a href="https://wa.me/2348078712534" target="_blank" rel="noopener noreferrer" className="block underline underline-offset-4">+234 807 871 2534</a>
                <a href="https://wa.me/2348038429173" target="_blank" rel="noopener noreferrer" className="block underline underline-offset-4">0803 842 9173</a>
              </div>
            </motion.div>
            <motion.a variants={item} href="https://instagram.com/Tribesbywendyerrands" target="_blank" rel="noopener noreferrer" className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-black border border-[color:var(--gold-end)] grid place-items-center">
                  <svg aria-hidden className="w-4 h-4 text-[color:var(--gold-end)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                  </svg>
                </div>
                <div className={`font-semibold`}>Instagram</div>
              </div>
              <div className="text-zinc-300">@Tribesbywendyerrands</div>
            </motion.a>
            
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="relative rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[linear-gradient(180deg,var(--gold-start),var(--gold-end))]" />
            <div className={`text-xl font-bold mb-4`}>Our Guarantees</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />Reliability, Consistent service you can trust.</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />Speed, Fast response and rapid deliveries.</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />Accountability, Transparent communication every step of the way.</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />Safety, Your items handled with care and professionalism.</div>
            </div>
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className={`text-xl font-bold mb-4`}>Send a Message</div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Name" />
              <input className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Email" type="email" />
              <input className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Phone" />
              <textarea className="md:col-span-2 rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Message" rows={4} />
              <button type="button" className="md:col-span-2 rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Send Message</button>
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
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
