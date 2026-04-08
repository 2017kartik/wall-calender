"use client";

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      className={`
        relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full 
        border-2 border-transparent transition-colors duration-300 ease-in-out 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
        ${dark ? "bg-zinc-700" : "bg-gray-300/80"}
      `}
      style={{
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)",
      }}
    >
      <span className="sr-only">Toggle dark mode</span>
      
      {/* Sliding Thumb */}
      <span
        className={`
          pointer-events-none relative inline-block h-5 w-5 transform rounded-full 
          bg-white shadow-md transition duration-300 ease-in-out flex items-center justify-center
          ${dark ? "translate-x-7" : "translate-x-0.5"}
        `}
      >
        {/* Sun Icon */}
        <svg
          className={`absolute h-3.5 w-3.5 text-amber-500 transition-opacity duration-300 ${
            dark ? "opacity-0" : "opacity-100"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.293a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.414zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-2.293 4.22a1 1 0 010 1.415l-.707.708a1 1 0 01-1.414-1.414l.707-.708a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.293a1 1 0 01-1.415 0l-.708-.707a1 1 0 011.414-1.414l.708.707a1 1 0 010 1.414zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm2.293-4.22a1 1 0 010-1.415l.707-.708a1 1 0 011.414 1.414l-.707.708a1 1 0 01-1.414 0zM10 5a5 5 0 100 10 5 5 0 000-10z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`absolute h-3.5 w-3.5 text-zinc-700 transition-opacity duration-300 ${
            dark ? "opacity-100" : "opacity-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </button>
  );
}