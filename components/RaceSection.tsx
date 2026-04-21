import CandidateCard from './CandidateCard'

type Candidate = {
  id: number
  name: string
  party: string | null
  is_incumbent: boolean | null
  photo_url: string | null
  short_bio: string | null
}

type Position = {
  id: number
  title: string
  description: string | null
  state: string | null
  district: string | null
}

export default function RaceSection({
  position,
  candidates,
}: {
  position: Position
  candidates: Candidate[]
}) {
  return (
    <section className="py-12 border-t border-border">
      {/* Section header */}
      <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8">
        <div>
          {position.state && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-2">
              {position.state}
              {position.district && ` · District ${position.district}`}
            </p>
          )}
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text leading-tight">
            {position.title}
          </h2>
        </div>
        <p className="font-mono text-xs text-text-dim">
          {candidates.length} {candidates.length === 1 ? 'candidate' : 'candidates'}
        </p>
      </div>

      {/* Candidate grid */}
      {candidates.length === 0 ? (
        <p className="text-text-dim italic text-sm">No candidates entered yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {candidates.map((c) => (
            <CandidateCard key={c.id} candidate={c} />
          ))}
        </div>
      )}
    </section>
  )
}