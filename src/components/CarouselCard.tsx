"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Aspect = "square" | "wide" | "tall";

export default function CarouselCard({ images, intervalMs = 5000, aspect = "square", showControls = true, className = "" }: { images: string[]; intervalMs?: number; aspect?: Aspect; showControls?: boolean; className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const timerRef = useRef<number | null>(null);
  const isProd = process.env.NODE_ENV === "production";
  const visibleCount = images.filter((_, i) => !failed[i]).length;
  useEffect(() => {
    if (paused || images.length === 0 || visibleCount === 0) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => {
        let n = i;
        for (let step = 0; step < images.length; step++) {
          n = (n + 1) % images.length;
          if (!failed[n]) return n;
        }
        return i;
      });
    }, intervalMs);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [paused, intervalMs, images.length, visibleCount, failed]);
  const to = (n: number) => setIndex(n);
  const prev = () => {
    setIndex((i) => {
      for (let step = 0; step < images.length; step++) {
        const n = (i - 1 - step + images.length) % images.length;
        if (!failed[n]) return n;
      }
      return i;
    });
  };
  const next = () => {
    setIndex((i) => {
      for (let step = 0; step < images.length; step++) {
        const n = (i + 1 + step) % images.length;
        if (!failed[n]) return n;
      }
      return i;
    });
  };
  const ar = aspect === "square" ? "md:w-[420px] md:h-[420px]" : aspect === "wide" ? "md:w-[520px] md:h-[300px]" : "md:w-[360px] md:h-[520px]";
  const hasImages = images.length > 0 && visibleCount > 0;
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="image carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`relative rounded-xl overflow-hidden bg-[rgba(20,20,20,0.6)] border border-[color:var(--brand-border)] hover:shadow-[0_0_40px_var(--brand-glow)] transition-all duration-200 w-full ${ar} ${className}`}
    >
      <div className="relative w-full h-full" onKeyDown={(e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); }} tabIndex={0}>
        {hasImages ? images.map((src, i) => {
          const isPriority = i === 0;
          const isCurrent = i === index;
          const loadingProp = isPriority ? undefined : (isCurrent ? "eager" : "lazy");
          return (
            <Image
              key={src + i}
              src={src}
              alt="service image"
              fill
              sizes="(min-width:1024px) 40vw, (min-width:640px) 60vw, 100vw"
              priority={isPriority}
              className={`object-cover transition-opacity duration-500 ${isCurrent ? "opacity-100" : "opacity-0"}`}
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
              unoptimized={!isProd}
              {...(loadingProp ? { loading: loadingProp } : {})}
            />
          );
        }) : (
          <div className="absolute inset-0 grid place-items-center text-[color:var(--brand-text-muted)]">No images available</div>
        )}
      </div>
      {showControls && hasImages && (
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => to(i)}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-[color:var(--gold-end)]" : "bg-zinc-500"}`}
            />
          ))}
        </div>
      )}
      {showControls && hasImages && (
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between">
          <button aria-label="Previous" onClick={prev} className="rounded-md px-2 py-1 bg-black/40 border border-[color:var(--brand-border)] text-white">◀</button>
          <button aria-label="Next" onClick={next} className="rounded-md px-2 py-1 bg-black/40 border border-[color:var(--brand-border)] text-white">▶</button>
        </div>
      )}
    </div>
  );
}
