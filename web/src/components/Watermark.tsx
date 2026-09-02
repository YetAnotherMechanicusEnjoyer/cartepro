import React from "react"

interface WatermarkProps {
  children: React.ReactNode
  text?: string
}

export function Watermark({
  children,
  text = "DOCUMENT DE SIMULATION - NE PAS UTILISER COMME OFFICIEL",
}: WatermarkProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        title={text}
        className="bg-amber-500/90 text-amber-950 font-bold text-center text-xs md:text-sm py-1.5 px-4 shadow-xs flex items-center justify-center gap-2 border-b border-amber-600/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>ENVIRONNEMENT DE SIMULATION — Les montants affichés n&apos;ont aucune valeur légale</span>
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
