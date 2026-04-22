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
  current_holder: string | null
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-5">
          {position.state && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-2">
              {position.state}
              {position.district && ` · District ${position.district}`}
            </p>
          )}
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text leading-tight">
            {position.title}
          </h2>
          {position.current_holder && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-3">
              Current: <span className="text-text">{position.current_holder}</span>
            </p>
          )}
        </div>

        <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end gap-3">
          {position.description && (
            <p className="text-sm text-text-muted leading-relaxed">
              {position.description}
            </p>
          )}
          <p className="font-mono text-xs text-text-dim">
            {candidates.length} {candidates.length === 1 ? 'candidate' : 'candidates'}
          </p>
        </div>
      </div>

      {candidates.length === 0 ? (
        <p className="text-text-dim italic text-sm">No candidates entered yet.</p>
      ) : (
        <div className="relative -mx-6 px-6">
          <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-border-strong [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="shrink-0 w-[calc(50%-0.625rem)] sm:w-[calc(33.333%-0.833rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)] snap-start"
              >
                <CandidateCard candidate={c} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}