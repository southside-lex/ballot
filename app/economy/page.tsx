import SiteHeader from '@/components/SiteHeader'
import Link from 'next/link'
import { BallotLogo } from '@/components/SiteHeader'

export default function EconomyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-4">
            Economy
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-[-0.03em] leading-[0.95] mb-6">
            Economic intelligence.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mb-16">
            Market indices, federal rates, state-by-state economic indicators —
            the numbers shaping American lives and elections.
          </p>

          {/* Placeholder for the major indices chart */}
          <section className="mb-20">
            <div className="flex items-baseline justify-between mb-4 flex-wrap gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-2">
                  Module 01
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em]">
                  Major indices.
                </h2>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                Coming soon
              </p>
            </div>
            <div className="aspect-[16/8] bg-surface-raised border border-border rounded-lg flex items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                DOW · NASDAQ · S&P 500
              </p>
            </div>
          </section>

          {/* Placeholder for state-by-state metrics */}
          <section>
            <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-2">
                  Module 02
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em]">
                  Economic indicators.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Average gasoline price',
                'Federal funds rate',
                'Consumer Price Index',
                'Unemployment rate',
                'Median home price',
                'Household goods index',
              ].map((label) => (
                <div
                  key={label}
                  className="aspect-[4/3] bg-surface border border-border rounded-lg p-6 flex flex-col justify-between"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    {label}
                  </p>
                  <p className="font-display text-3xl text-text-dim">—</p>
                </div>
              ))}
            </div>
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