import { cn } from "@/lib/utils"

type SkillPathLogoProps = {
  className?: string
  markClassName?: string
  showWordmark?: boolean
}

export function SkillPathLogo({
  className,
  markClassName,
  showWordmark = true,
}: SkillPathLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={cn("size-8 shrink-0 drop-shadow-[0_8px_16px_rgba(245,126,31,0.22)]", markClassName)}
        fill="none"
      >
        <defs>
          <linearGradient id="skillpath-mark-bg" x1="8" y1="5" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB86B" />
            <stop offset="0.52" stopColor="#FF7E5F" />
            <stop offset="1" stopColor="#5D1636" />
          </linearGradient>
          <linearGradient id="skillpath-route" x1="11" y1="27" x2="30" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF7ED" />
            <stop offset="1" stopColor="#FFE1B8" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="32" height="32" rx="11" fill="url(#skillpath-mark-bg)" />
        <path
          d="M12 27.5C16.8 24.2 16.4 17.7 21.2 16.2C24.1 15.3 26.8 16.6 30 11.5"
          stroke="url(#skillpath-route)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="27.5" r="3.2" fill="#FFF7ED" />
        <circle cx="21" cy="16.3" r="2.8" fill="#FFF7ED" />
        <path d="M28.9 9.2l3.3 1.1l-2.3 2.6l-3.3-1.1l2.3-2.6z" fill="#FFF7ED" />
        <path
          d="M11 11.6h7.1M11 15.4h3.9"
          stroke="#FFF7ED"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.86"
        />
        <path
          d="M29.7 24.6l.9 2.1l2.2.8l-2.2.8l-.9 2.1l-.9-2.1l-2.2-.8l2.2-.8l.9-2.1z"
          fill="#FFE1B8"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-extrabold tracking-tight text-slate-800">
          SkillPath
        </span>
      )}
    </div>
  )
}
