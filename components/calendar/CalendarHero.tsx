"use client";

import Image from "next/image";

interface CalendarHeroProps {
  heroImage: string;
  month: string;
  year: number;
  accentColor: string;
  animClass: string;
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}

export function CalendarHero({
  heroImage,
  month,
  year,
  accentColor,
  animClass,
  onPrev,
  onNext,
  disabled,
}: CalendarHeroProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${animClass}`}
      style={{ height: "clamp(220px, 44vw, 300px)" }}
    >
      <Image
        src={heroImage}
        alt={`${month} scenery`}
        fill
        className="object-cover object-center"
        priority
        sizes="(max-width: 768px) 100vw, 600px"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: "96px" }}>
        <svg
          viewBox="0 0 800 96"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <polygon
            points="0,96 0,42 240,2 480,54 480,96"
            fill={accentColor}
            opacity="0.70"
          />
          <polygon
            points="280,96 280,50 510,8 800,8 800,96"
            fill={accentColor}
          />
        </svg>

        <div className="absolute inset-0 z-20 flex items-end pb-3 px-4">
          <button
            onClick={onPrev}
            disabled={disabled}
            aria-label="Previous month"
            className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/28 transition-colors disabled:opacity-30 text-white text-lg leading-none"
          >
            ‹
          </button>

          <div className="flex-1" />

          <div className="text-right mr-3">
            <p className="text-white/70 text-[10px] font-semibold tracking-[0.22em] uppercase leading-none mb-0.5">
              {year}
            </p>
            <h2 className="text-white text-[24px] sm:text-[28px] font-extrabold tracking-[0.06em] uppercase leading-none">
              {month}
            </h2>
          </div>

          <button
            onClick={onNext}
            disabled={disabled}
            aria-label="Next month"
            className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/28 transition-colors disabled:opacity-30 text-white text-lg leading-none"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
