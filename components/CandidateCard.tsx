import Link from 'next/link'

type Candidate = {
  id: number
  name: string
  party: string | null
  is_incumbent: boolean | null
  photo_url: string | null
  short_bio: string | null
}

function partyColor(party: string | null) {
  if (!party) return 'var(--color-text-dim)'
  const p = party.toLowerCase()
  if (p.includes('democrat')) return 'var(--color-party-democrat)'
  if (p.includes('republican')) return 'var(--color-party-republican)'
  if (p.includes('green')) return 'var(--color-party-green)'
  if (p.includes('libertarian')) return 'var(--color-party-libertarian)'
  if (p.includes('independent')) return 'var(--color-party-independent)'
  return 'var(--color-text-muted)'
}

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="group block"
    >
      {/* Photo — the hero of the card */}
      <div className="aspect-[4/5] bg-surface-raised rounded-md overflow-hidden relative border border-border">
        {candidate.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={candidate.photo_url}
            alt={candidate.name}
            className="w-full h-full object-cover grayscale contrast-[1.02] group-hover:grayscale-0 transition-[filter] duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
              Portrait pending
            </span>
          </div>
        )}

        {/* Incumbent tag */}
        {candidate.is_incumbent && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-bg/90 backdrop-blur-sm border border-border">
            <span className="font-mono text-[9px] uppercase tracking-wider text-text">
              Incumbent
            </span>
          </div>
        )}
      </div>

      {/* Minimal text below */}
      <div className="pt-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: partyColor(candidate.party) }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {candidate.party}
          </span>
        </div>
        <h3 className="font-display text-base md:text-lg tracking-tight text-text leading-tight group-hover:text-brand transition-colors">
          {candidate.name}
        </h3>
      </div>
    </Link>
  )
}