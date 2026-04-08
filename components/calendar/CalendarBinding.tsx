export function CalendarBinding() {
  return (
    <div className="relative z-20 select-none">
      <div
        className="h-2.75 w-full"
        style={{
          background:
            "linear-gradient(180deg, #e9eaec 0%, #c8cdd6 45%, #9ca3af 100%)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
        }}
      />
      <div className="flex justify-center items-start gap-3.75 -mt-0.5 px-2">
        {Array.from({ length: 20 }).map((_, i) => {
          const isCenter = i === 9 || i === 10;
          return (
            <div
              key={i}
              style={{
                width: isCenter ? 14 : 12,
                height: isCenter ? 22 : 18,
                borderRadius: "999px",
                background:
                  "linear-gradient(155deg, #f4f5f6 0%, #d1d5db 42%, #9ca3af 100%)",
                border: "1.5px solid #9ca3af",
                boxShadow:
                  "inset 0 1px 2px rgba(255,255,255,0.65), 0 1px 4px rgba(0,0,0,0.22)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
