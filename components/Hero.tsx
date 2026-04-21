import USMap from './USMap'

type StateStatus = {
  state: string
  chamber: string
  status: string
  winning_party: string | null
}

type Props = {
  statuses?: StateStatus[]
  topology: any
}

export default function Hero({ statuses = [], topology }: Props) {
  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand mb-3">
            2026 U.S. Midterm Elections
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-[-0.03em] leading-[0.95]">
            Every race. Every candidate.
          </h1>
        </div>
        <p className="text-base md:text-lg text-text-muted max-w-sm leading-relaxed">
          Track live results across all 50 states. Click into any race for
          candidate profiles and policy research.
        </p>
      </div>

      <USMap statuses={statuses} topology={topology} />
    </section>
  )
}