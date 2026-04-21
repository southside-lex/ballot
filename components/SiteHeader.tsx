import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-brand" />
          <span className="font-display text-lg tracking-tight">Ballot</span>
        </Link>

        <nav className="flex items-center gap-7 text-sm">
          <Link href="/" className="text-text-muted hover:text-text">Candidates</Link>
          <Link href="/" className="text-text-muted hover:text-text">Races</Link>
          <Link href="/" className="text-text-muted hover:text-text">Timeline</Link>
          <span className="text-text-dim hidden md:inline">·</span>
          <span className="font-mono text-xs text-text-dim uppercase tracking-wider hidden md:inline">
            2026 Midterms
          </span>
        </nav>
      </div>
    </header>
  )
}