"use client";

interface CalendarChevronProps {
  month: string;
  year: number;
  accentColor: string;
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}

export function CalendarChevron({
  month,
  year,
  accentColor,
  onPrev,
  onNext,
  disabled,
}: CalendarChevronProps) {
  return (
    <div className="relative h-16 overflow-visible" style={{ zIndex: 10 }}>
      <svg
        viewBox="0 0 800 64"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,0 400,64 800,0 800,64 0,64" fill={accentColor} />
        <polygon
          points="0,0 400,56 800,0"
          fill={accentColor}
          opacity="0.6"
        />
      </svg>

      <div className="absolute inset-0 flex items-end justify-between px-6 pb-2 z-10">
        <button
          onClick={onPrev}
          disabled={disabled}
          className="text-white/80 hover:text-white transition-colors disabled:opacity-40 text-xl font-light leading-none select-none"
          aria-label="Previous month"
        >
          ‹
        </button>

        <div className="text-right">
          <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">
            {year}
          </span>
          <h2 className="text-white text-2xl font-extrabold tracking-wide uppercase leading-tight -mt-0.5">
            {month}
          </h2>
        </div>

        <button
          onClick={onNext}
          disabled={disabled}
          className="text-white/80 hover:text-white transition-colors disabled:opacity-40 text-xl font-light leading-none select-none"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
    </div>
  );
}
