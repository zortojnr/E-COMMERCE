"use client";
import { Poppins, DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["700","800"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function BookPickupPage() {
  const [step, setStep] = useState(1);
  const [itemDesc, setItemDesc] = useState("");
  const [notes, setNotes] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const validStep1 = itemDesc.trim().length > 0;
  const validStep2 = from.trim().length > 0 && date.trim().length > 0 && time.trim().length > 0;
  const validStep3 = name.trim().length > 0 && phone.trim().length > 0;

  function next() {
    if (step === 1 && !validStep1) return;
    if (step === 2 && !validStep2) return;
    setStep((s) => Math.min(3, s + 1));
  }
  function prev() { setStep((s) => Math.max(1, s - 1)); }

  function submit() {
    if (!validStep3) return;
    const normalizedPhone = phone.replace(/\D/g, "");
    const summary = `Type: Pickup\nItem: ${itemDesc}\nNotes: ${notes}\nFrom: ${from}\nTo: ${to}\nSchedule: ${date} ${time}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`;
    const url = `https://wa.me/2348078712534?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank");
  }

  return (
    <div className={`${dmSans.variable} ${poppins.variable} min-h-screen bg-black text-white`}>
      <main className="mx-auto max-w-7xl px-6 py-24">
        <motion.div initial="hidden" animate="show" variants={item} className="mb-8">
          <h1 className={`${poppins.className} text-3xl md:text-4xl font-extrabold`}>Book a Pickup</h1>
          <p className="mt-2 text-zinc-300">Fast, reliable pickup scheduling in a few simple steps.</p>
        </motion.div>

        <div className="flex items-center gap-2 mb-6">
          {[1,2,3].map((n) => (
            <div key={n} className={`h-2 flex-1 rounded-full ${step>=n ? 'bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]' : 'bg-zinc-800'}`} />
          ))}
        </div>

        {step === 1 && (
          <motion.div initial="hidden" animate="show" variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className={`${poppins.className} text-xl font-bold mb-4`}>Details</div>
            <div className="grid grid-cols-1 gap-4">
              <input value={itemDesc} onChange={(e)=>setItemDesc(e.target.value)} className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Item description (required)" />
              <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3} className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Notes (optional)" />
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={next} className="rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]">Next</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial="hidden" animate="show" variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className={`${poppins.className} text-xl font-bold mb-4`}>Locations & Schedule</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={from} onChange={(e)=>setFrom(e.target.value)} className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Pickup address (required)" />
              <input value={to} onChange={(e)=>setTo(e.target.value)} className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Drop-off address (optional)" />
              <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" />
              <input value={time} onChange={(e)=>setTime(e.target.value)} type="time" className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" />
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={prev} className="rounded-xl px-6 py-3 border border-[color:var(--gold-end)] text-[color:var(--gold-end)]">Back</button>
              <button onClick={next} className="rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]">Next</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial="hidden" animate="show" variants={item} className="rounded-xl p-6 bg-[rgba(20,20,20,0.6)] border border-zinc-800">
            <div className={`${poppins.className} text-xl font-bold mb-4`}>Contact & Review</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Name (required)" />
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Phone (required)" />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-3 text-white" placeholder="Email (optional)" />
            </div>
            <div className="rounded-md bg-[#0A0A0A] border border-zinc-800 p-4 text-zinc-300">
              <div><span className="font-semibold">Type:</span> Pickup</div>
              <div><span className="font-semibold">Item:</span> {itemDesc || "—"}</div>
              <div><span className="font-semibold">From:</span> {from || "—"}</div>
              <div><span className="font-semibold">To:</span> {to || "—"}</div>
              <div><span className="font-semibold">Schedule:</span> {date || "—"} {time || ""}</div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={prev} className="rounded-xl px-6 py-3 border border-[color:var(--gold-end)] text-[color:var(--gold-end)]">Back</button>
              <button onClick={submit} className="rounded-xl px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))]">Confirm & WhatsApp</button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

