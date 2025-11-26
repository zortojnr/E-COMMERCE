"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logger } from "@/lib/logger";

export default function Navbar() {
  const [navSolid, setNavSolid] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
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
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Image src="/logo.jpg" alt="TribesByWendy logo" width={48} height={48} className="rounded" />
            <div className="leading-tight">
              <div className="font-bold tracking-tight text-white text-lg">TribesByWendy Errands</div>
              <div className="text-xs text-[color:var(--brand-text-muted)]">THINK LOGISTICS, THINK US</div>
            </div>
          </div>
          
          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-white mx-auto">
            <Link href="/" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">Home</Link>
            <Link href="/about" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">About Us</Link>
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                prefetch={false}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                className="hover:text-[color:var(--gold-end)] transition-colors"
                onFocus={() => setServicesOpen(true)}
                onBlur={() => setServicesOpen(false)}
              >
                Services
              </Link>
              {servicesOpen && (
                <div
                  role="menu"
                  aria-label="Services list"
                  className="absolute left-0 mt-3 w-64 rounded-2xl bg-[rgba(20,20,20,0.85)] border border-zinc-800 shadow-lg p-2"
                >
                  {[
                    { href: "/services#errand", label: "Errand Services" },
                    { href: "/services#dispatch", label: "Dispatch Delivery" },
                    { href: "/services#same-day", label: "Same day delivery" },
                    { href: "/services#door-to-door", label: "Door to door delivery" },
                    { href: "/services#payment-on-delivery", label: "Payment on delivery" },
                    { href: "/services#warehousing", label: "Warehousing" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      role="menuitem"
                      className="block rounded-xl px-3 py-2 text-white hover:bg-[rgba(30,30,30,0.9)] hover:text-[color:var(--gold-end)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/testimonials" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">Testimonials</Link>
            <Link href="/contact" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">Contact Us</Link>
          </nav>
          
          {/* Action Button - Right */}
          <div className="hidden md:block flex-shrink-0">
            <Link href="/book/errand" prefetch={false} className="rounded-full px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_var(--brand-glow)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow-hover)] hover:scale-105">
              Book an Errand
            </Link>
          </div>
          <div className="md:hidden ml-auto">
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
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <button
        ref={triggerRef}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="rounded-md p-3 border border-zinc-800 text-white"
      >
        <span className="block w-6 h-[2px] bg-white mb-1" />
        <span className="block w-6 h-[2px] bg-white mb-1" />
        <span className="block w-6 h-[2px] bg-white" />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="absolute top-4 right-4">
            <button onClick={() => setOpen(false)} className="rounded-md p-2 border border-zinc-800 text-white">✕</button>
          </div>
          <div className="flex h-full items-center justify-center">
            <div id="mobile-menu" ref={panelRef} tabIndex={-1} className="rounded-2xl p-8 bg-[rgba(20,20,20,0.55)] border border-zinc-800 w-[90%] max-w-sm" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.jpg" alt="TribesByWendy logo" width={36} height={36} className="rounded" />
                <div className="leading-tight">
                  <div className="font-semibold tracking-tight text-white">TribesByWendy Errands</div>
                  <div className="text-xs text-[color:var(--brand-text-muted)]">THINK LOGISTICS, THINK US</div>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-center text-white">
                <Link href="/" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Home</Link>
                <Link href="/about" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">About Us</Link>
                <Link href="/services" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Services</Link>
                <Link href="/testimonials" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Testimonials</Link>
                <Link href="/contact" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Contact Us</Link>
                <Link href="/book/errand" prefetch={false} onClick={() => setOpen(false)} className="mt-4 rounded-none px-6 py-3 text-black font-semibold bg-[linear-gradient(90deg,var(--gold-start),var(--gold-end))] shadow-[0_0_30px_var(--brand-glow)] transition-all duration-200 hover:shadow-[0_10px_40px_var(--brand-glow-hover)]">Book an Errand</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
