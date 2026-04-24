import SiteHeader from '@/components/SiteHeader'
import Link from 'next/link'
import { BallotLogo } from '@/components/SiteHeader'

export default function PerspectivesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-4">
            Perspectives
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-[-0.03em] leading-[0.95] mb-6">
            Editorial voices.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mb-20">
            Long-form essays and commentary from policy thinkers, economists,
            and public figures. One voice at a time.
          </p>

          {/* Featured piece placeholder */}
          <section className="mb-20">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-4">
              Featured
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 md:gap-12 border-t border-b border-border py-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
                  Coming soon · Economics
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-tight mb-4">
                  The first editorial piece.
                </h2>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  Ballot's Perspectives section will feature long-form writing
                  from leading voices on economics, policy, and American life —
                  published regularly, archived permanently.
                </p>
              </div>
              <div className="aspect-[4/5] bg-surface-raised border border-border rounded-md flex items-center justify-center">
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  Portrait
                </p>
              </div>
            </div>
          </section>

          {/* Archive placeholder */}
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-4">
              Archive
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-8">
              Past pieces.
            </h2>
            <p className="text-text-muted italic">
              No pieces published yet. Check back soon.
            </p>
          </section>

          <footer className="py-12 border-t border-border mt-20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link href="/" className="flex items-center">
                <BallotLogo className="h-6 w-auto text-text" />
              </Link>
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                Civic intelligence · 2026
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}