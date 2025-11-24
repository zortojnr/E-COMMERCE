"use client";
import Image from "next/image";
import { Poppins, DM_Sans } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({ subsets: ["latin"], weight: ["700","800"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function TestimonialsPage() {
  const isProd = process.env.NODE_ENV === "production";
  const avatars = [
    "/images/avatars/avatar1.jpg",
    "/images/avatars/avatar2.jpg",
    "/images/avatars/avatar3.jpg",
    "/images/avatars/avatar4.jpg",
  ];
  return (
    <div className={`${dmSans.variable} ${poppins.variable} min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item}>
            <h1 className={`${poppins.className} text-4xl md:text-5xl font-extrabold`}>What Our Customers Say About Us</h1>
            <p className="mt-4 text-zinc-300">Real experiences from real users who trust TribesByWendy Errands for deliveries, errands and fast logistics across Port Harcourt & Warri.</p>
            <div className="mx-auto mt-6 h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Phone Delivery Service Customer",
                type: "Regular Delivery User",
                text:
                  "Excited and impressed! I’ve used their service for multiple deliveries across Port Harcourt, one thing that always stands out is the unbelievably low pricing. Fast, friendly and extremely reliable, they make every delivery stress-free.",
                avatar: avatars[0],
              },
              {
                name: "Koks",
                type: "Regular Customer",
                text:
                  "Their speed is unmatched. Every delivery comes quicker than expected, and the drivers’ accountability is top-tier. Safe, reliable and always available when needed, they’re my go-to brand for everything errands and delivery.",
                avatar: avatars[1],
              },
              {
                name: "Elena",
                type: "Customer",
                text:
                  "This service is both affordable and incredibly dependable. They stood out for me in a moment of urgent need, fast response, calm communication and excellent service. Highly recommended!",
                avatar: avatars[2],
              },
              {
                name: "Richard",
                type: "Business & Personal Delivery Customer",
                text:
                  "I’ve used several delivery companies for work, but the day I tried TribesByWendy Errands, everything changed. Their speed, availability and coordination are excellent, especially during urgent deliveries. They truly stand out.",
                avatar: avatars[3],
              },
              { name: "Chinedu", type: "Customer", text: "Swift pickup and very professional.", avatar: avatars[0] },
              { name: "Amaka", type: "Customer", text: "Affordable and stress-free moving.", avatar: avatars[1] },
              { name: "Timi", type: "Customer", text: "Reliable riders, great communication.", avatar: avatars[2] },
              { name: "Blessing", type: "Customer", text: "Friendly support, clear updates and timely delivery.", avatar: avatars[3] },
              { name: "David", type: "Customer", text: "Professional handling and great pricing for repeat orders.", avatar: avatars[0] },
            ].map((t, i) => (
              <motion.div key={i} variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.55)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} sizes="40px" unoptimized={!isProd} className="object-cover" />
                  </div>
                  <div>
                    <div className={`${poppins.className} font-semibold`}>{t.name}</div>
                    <div className="text-xs text-zinc-400">{t.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[color:var(--gold-end)] mb-3"><span>★</span><span>★</span><span>★</span><span>★</span><span className="text-zinc-600">☆</span></div>
                <div className="text-sm text-zinc-300">{t.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="rounded-2xl p-8 bg-[rgba(20,20,20,0.55)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200">
            <div className="text-3xl mb-4">“</div>
            <div className={`${poppins.className} text-lg md:text-xl font-semibold`}>Trusted by individuals, students and business owners since 2019, TribesByWendy Errands continues to deliver reliability, speed and peace of mind.</div>
          </motion.div>
        </section>

        <section className="my-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item} className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
            <div className="p-8 md:p-12">
              <div className={`${poppins.className} text-2xl md:text-3xl font-extrabold`}>Experience premium errands & logistics service.</div>
              <div className="mt-2 text-sm md:text-base text-zinc-300">Fast. Reliable. Affordable. Every time.</div>
              <a href="/book/errand" className="mt-6 inline-block rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book a Service Now</a>
            </div>
          </motion.div>
        </section>

        <footer className="py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={item}>
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
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
