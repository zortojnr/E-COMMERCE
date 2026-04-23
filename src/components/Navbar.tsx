"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 max-md:bg-black/90 max-md:backdrop-blur-md ${
        navSolid ? "md:bg-black/60 md:backdrop-blur" : "md:bg-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[4.5rem] sm:h-20 items-center gap-2">
          {/* Logo - Left */}
          <Link href="/" prefetch={false} className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Image src="/favicon.svg" alt="Tribes By Wendy Errands Limited logo" width={48} height={48} className="rounded w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
            <div className="leading-tight min-w-0">
              <div className="font-bold tracking-tight text-white text-sm sm:text-base md:text-lg truncate">Tribes By Wendy Errands Limited</div>
              <div className="hidden sm:block text-xs text-[color:var(--brand-text-muted)] truncate">THINK LOGISTICS, THINK US</div>
            </div>
          </Link>
          
          {/* Navigation - Center */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm text-white">
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
                  className="absolute left-0 mt-3 w-64 rounded-none bg-[rgba(20,20,20,0.85)] border border-zinc-800 shadow-lg p-2"
                >
                  {[
                    { href: "/services#errand", label: "Errand logistics" },
                    { href: "/services#dispatch", label: "Dispatch delivery" },
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
            <Link href="/pricing" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">Pricing</Link>
            <Link href="/testimonials" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">Testimonials</Link>
            <Link href="/contact" prefetch={false} className="hover:text-[color:var(--gold-end)] transition-colors">Contact Us</Link>
          </nav>
          
          <div className="hidden md:block w-[12rem]" aria-hidden />
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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
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
      <button
        type="button"
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
      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] min-h-[100dvh] bg-black/95 backdrop-blur-md touch-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={() => setOpen(false)}
          >
            <div className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-[201]">
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-2 border border-zinc-700 text-white bg-zinc-900 shadow-lg">
                ✕
              </button>
            </div>
            <div className="flex min-h-[100dvh] items-center justify-center px-4 pt-14 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div
                id="mobile-menu"
                ref={panelRef}
                tabIndex={-1}
                className="relative z-[1] w-full max-w-sm touch-auto rounded-2xl border border-[color:var(--brand-border)] bg-[color:var(--brand-bg-2)] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.65)] max-h-[min(85dvh,32rem)] overflow-y-auto overscroll-contain"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image src="/favicon.svg" alt="Tribes By Wendy Errands Limited logo" width={36} height={36} className="rounded" />
                  <div className="leading-tight">
                    <div className="font-semibold tracking-tight text-white">Tribes By Wendy Errands Limited</div>
                    <div className="text-xs text-[color:var(--brand-text-muted)]">THINK LOGISTICS, THINK US</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-center text-white">
                  <Link href="/" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4 py-1">
                    Home
                  </Link>
                  <Link href="/about" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4 py-1">
                    About Us
                  </Link>
                  <Link href="/services" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4 py-1">
                    Services
                  </Link>
                  <Link href="/pricing" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4 py-1">
                    Pricing
                  </Link>
                  <Link href="/testimonials" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4 py-1">
                    Testimonials
                  </Link>
                  <Link href="/contact" prefetch={false} onClick={() => setOpen(false)} className="hover:underline underline-offset-4 py-1">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
