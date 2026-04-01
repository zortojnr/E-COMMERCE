"use client";

const MESSAGE =
  "With the current hike in fuel prices, our prices may change. ";

export default function AnnouncementTicker() {
  const repeated = Array(4).fill(MESSAGE).join("");

  return (
    <div
      className="fixed top-[4.5rem] sm:top-20 left-0 right-0 z-[95] h-9 flex items-center border-b border-[color:var(--brand-border)] bg-black/95 text-[color:var(--brand-text-muted)] overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="announcement-ticker-track flex whitespace-nowrap text-xs sm:text-sm font-medium py-1">
        <span className="pr-16">{repeated}</span>
        <span className="pr-16" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}
