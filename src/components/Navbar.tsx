"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logger } from "@/lib/logger";

export default function Navbar() {
  const [navSolid, setNavSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    logger.debug("Navbar", "scroll-state", { solid: navSolid });
  }, [navSolid]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        navSolid ? "bg-black/60 backdrop-blur" : "bg-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="TribesByWendy logo" width={40} height={40} className="rounded" />
            <span className="font-semibold tracking-tight">TribesByWendy Errands</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/" prefetch={false} className="hover:underline underline-offset-4">Home</Link>
            <Link href="/about" prefetch={false} className="hover:underline underline-offset-4">About</Link>
            <Link href="/services" prefetch={false} className="hover:underline underline-offset-4">Services</Link>
            <Link href="/testimonials" prefetch={false} className="hover:underline underline-offset-4">Testimonials</Link>
            <Link href="/contact" prefetch={false} className="hover:underline underline-offset-4">Contact</Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/book/errand" prefetch={false} className="rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">
              Book an Errand
            </Link>
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  useEffect(() => {
    if (open) {
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>("a,button");
      const first = nodes && nodes[0];
      first?.focus();
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (!active) return;
        if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  useEffect(() => { if (open) setOpen(false); }, [pathname]);
  return (
    <div>
      <button ref={triggerRef} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)} className="rounded-md p-2 border border-zinc-800 text-white">
        <span className="block w-5 h-[2px] bg-white mb-1" />
        <span className="block w-5 h-[2px] bg-white mb-1" />
        <span className="block w-5 h-[2px] bg-white" />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50" role="dialog" aria-modal="true">
          <div className="absolute top-4 right-4">
            <button onClick={() => setOpen(false)} className="rounded-md p-2 border border-zinc-800 text-white">✕</button>
          </div>
          <div className="flex h-full items-center justify-center">
            <div id="mobile-menu" ref={panelRef} tabIndex={-1} className="rounded-2xl p-8 bg-[rgba(20,20,20,0.55)] border border-zinc-800 w-[90%] max-w-sm">
              <div className="flex flex-col gap-4 text-center">
                <Link href="/" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Home</Link>
                <Link href="/about" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">About</Link>
                <Link href="/services" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Services</Link>
                <Link href="/testimonials" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Testimonials</Link>
                <Link href="#" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Contact</Link>
                <Link href="/book/errand" prefetch={false} onClick={() => setOpen(false)} className="mt-4 rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_rgba(245,199,109,0.25)] transition-all duration-200 hover:shadow-[0_10px_40px_rgba(245,199,109,0.35)]">Book an Errand</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
