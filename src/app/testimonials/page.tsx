"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
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
  const baseList = [
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
    { name: "Chinedu", type: "Customer", text: "Delivery was slow and the rider was not courteous.", avatar: avatars[0], rating: 1 },
    { name: "Amaka", type: "Customer", text: "Affordable and stress-free moving.", avatar: avatars[1] },
    { name: "Timi", type: "Customer", text: "Rider was rude and delivery arrived late.", avatar: avatars[2], rating: 1 },
    { name: "Blessing", type: "Customer", text: "Friendly support, clear updates and timely delivery.", avatar: avatars[3] },
    { name: "David", type: "Customer", text: "Professional handling and great pricing for repeat orders, but the rider was slow.", avatar: avatars[0], rating: 3 },
  ];
  const [reviews, setReviews] = useState<Array<{name: string; type: string; text: string; avatar: string; rating: number}>>([]);
  const [name, setName] = useState("");
  const [portfolio, setPortfolio] = useState("Customer");
  const [business, setBusiness] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const submit = (e: any) => {
    e.preventDefault();
    if (!name || !comment) return;
    const type = portfolio === "Business Owner" && business ? `Business Owner — ${business}` : portfolio;
    setReviews((r) => [{ name, type, text: comment, avatar: avatars[(r.length) % avatars.length], rating }, ...r]);
    setName(""); setBusiness(""); setComment(""); setRating(5); setPortfolio("Customer");
  };
  return (
    <div className={`min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-24 md:pt-32 text-center">
          <motion.div initial="hidden" animate="show" variants={item}>
            <h1 className={`text-4xl md:text-5xl font-extrabold`}>What Our Customers Say About Us</h1>
            <p className="mt-4 text-zinc-300">Real experiences from real users who trust TribesByWendy Errands for deliveries, errands and fast logistics in Port Harcourt.</p>
            <div className="mx-auto mt-6 h-px w-24 bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]" />
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" animate="show" variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...baseList, ...reviews].map((t, i) => (
              <motion.div key={i} variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.55)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.18)] hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[color:rgba(212,167,56,0.40)]">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} sizes="40px" unoptimized={!isProd} className="object-cover" />
                  </div>
                  <div>
                    <div className={`font-semibold`}>{t.name}</div>
                    <div className="text-xs text-zinc-400">{t.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[color:var(--gold-end)] mb-3" aria-label={`Rating ${'rating' in t ? t.rating : 4} out of 5`}>
                  {Array.from({ length: ('rating' in t ? t.rating : 4) }, () => '★').map((s, idx) => (<span key={idx}>{s}</span>))}
                  {Array.from({ length: 5 - ('rating' in t ? t.rating : 4) }, () => '☆').map((s, idx) => (<span key={`e${idx}`} className="text-zinc-600">{s}</span>))}
                </div>
                <div className="text-sm text-zinc-300">{t.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" animate="show" variants={item} className="rounded-2xl p-8 bg-[rgba(20,20,20,0.55)] border border-zinc-800 hover:border-[color:var(--gold-end)] transition-all duration-200">
            <div className="text-3xl mb-4">“</div>
            <div className={`text-lg md:text-xl font-semibold`}>Trusted by individuals, students and business owners, TribesByWendy Errands continues to deliver reliability, speed and peace of mind.</div>
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div initial="hidden" animate="show" variants={item} className="rounded-2xl p-8 bg-[rgba(20,20,20,0.55)] border border-zinc-800">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6`}>Share your experience</h2>
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-zinc-300 mb-1">Name</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md bg-[#0A0A0A] border border-zinc-800 px-3 py-2 text-white" required />
              </div>
              <div>
                <label htmlFor="portfolio" className="block text-sm text-zinc-300 mb-1">Portfolio</label>
                <select id="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="w-full rounded-md bg-[#0A0A0A] border border-zinc-800 px-3 py-2 text-white">
                  <option>Customer</option>
                  <option>Regular Customer</option>
                  <option>Business Owner</option>
                </select>
              </div>
              {portfolio === "Business Owner" && (
                <div className="md:col-span-2">
                  <label htmlFor="business" className="block text-sm text-zinc-300 mb-1">Business Name</label>
                  <input id="business" value={business} onChange={(e) => setBusiness(e.target.value)} className="w-full rounded-md bg-[#0A0A0A] border border-zinc-800 px-3 py-2 text-white" />
                </div>
              )}
              <div className="md:col-span-2">
                <label htmlFor="comment" className="block text-sm text-zinc-300 mb-1">Comment</label>
                <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full rounded-md bg-[#0A0A0A] border border-zinc-800 px-3 py-2 text-white h-28" required />
              </div>
              <div>
                <span className="block text-sm text-zinc-300 mb-1">Star rating</span>
                <div role="radiogroup" aria-label="Star rating" className="flex items-center gap-2">
                  {[1,2,3,4,5].map((n) => (
                    <button type="button" key={n} aria-label={`${n} star${n>1?'s':''}`} onClick={() => setRating(n)} className={`text-2xl ${rating >= n ? 'text-[color:var(--gold-end)]' : 'text-zinc-600'}`}>★</button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)]">Submit Comment</button>
              </div>
            </form>
          </motion.div>
        </section>

        <section className="my-20">
          <motion.div initial="hidden" animate="show" variants={item} className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] border border-zinc-800">
            <div className="p-8 md:p-12">
              <div className={`text-2xl md:text-3xl font-extrabold`}>Experience premium errands & logistics service.</div>
              <div className="mt-2 text-sm md:text-base text-zinc-300">Fast. Reliable. Affordable. Every time.</div>
              <a href="/book/errand" className="mt-6 inline-block rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book a Service Now</a>
            </div>
          </motion.div>
        </section>

        <footer className="py-16">
          <motion.div initial="hidden" animate="show" variants={item}>
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
