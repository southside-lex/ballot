import Link from 'next/link'

export function BallotLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 170 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ballot"
    >
      <text
        x="0"
        y="45"
        fontFamily="var(--font-display), var(--font-sans), system-ui"
        fontSize="40"
        fontWeight="700"
        letterSpacing="-0.04em"
        fill="currentColor"
      >
        ballot
      </text>

      <g stroke="var(--color-brand)" strokeWidth="3" fill="none">
        <ellipse cx="122" cy="18" rx="14" ry="9" />
        <ellipse cx="155" cy="18" rx="14" ry="9" />
        <ellipse cx="122" cy="42" rx="14" ry="9" />
        <ellipse cx="155" cy="42" rx="14" ry="9" />
      </g>
    </svg>
  )
}

export default function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0">
          <BallotLogo className="h-8 w-auto text-text" />
        </Link>

        <nav className="flex items-center gap-4 md:gap-7 text-sm">
          <Link href="/" className="text-text-muted hover:text-text">Politics</Link>
          <Link href="/economy" className="text-text-muted hover:text-text">Economy</Link>
          <Link href="/perspectives" className="text-text-muted hover:text-text">Perspectives</Link>
          <span className="text-text-dim hidden md:inline">·</span>
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider hidden md:inline">
            2026 Midterms
          </span>
        </nav>
      </div>
    </header>
  )
}