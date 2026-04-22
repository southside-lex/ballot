import Link from 'next/link'

export function BallotLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ballot"
    >
      {/* Wordmark */}
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

      {/* Four purple oval outlines, 2x2 grid */}
      <g stroke="var(--color-brand)" strokeWidth="3" fill="none">
        {/* Top row */}
        <ellipse cx="145" cy="18" rx="14" ry="9" />
        <ellipse cx="180" cy="18" rx="14" ry="9" />
        {/* Bottom row */}
        <ellipse cx="145" cy="42" rx="14" ry="9" />
        <ellipse cx="180" cy="42" rx="14" ry="9" />
      </g>
    </svg>
  )
}

export default function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BallotLogo className="h-8 w-auto text-text" />
        </Link>

        <nav className="flex items-center gap-7 text-sm">
          <Link href="/" className="text-text-muted hover:text-text">Candidates</Link>
          <Link href="/" className="text-text-muted hover:text-text">Races</Link>
          <Link href="/" className="text-text-muted hover:text-text">Timeline</Link>
          <span className="text-text-dim hidden md:inline">·</span>
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider hidden md:inline">
            2026 Midterms
          </span>
        </nav>
      </div>
    </header>
  )
}