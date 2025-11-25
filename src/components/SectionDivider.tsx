export default function SectionDivider() {
  return (
    <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,60 C360,0 1080,120 1440,60 L1440,120 L0,120 Z" fill="#0B0B0B" opacity="0.7" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A738" />
          <stop offset="100%" stopColor="#F5C76D" />
        </linearGradient>
      </defs>
      <path d="M0,70 C360,10 1080,130 1440,70 L1440,120 L0,120 Z" fill="url(#goldGrad)" opacity="0.08" />
    </svg>
  );
}
