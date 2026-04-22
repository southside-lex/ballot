import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'

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

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-brand"
    >
      {children}
    </Link>
  )
}

export default async function CandidateProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: candidate, error } = await supabase
    .from('candidates')
    .select(`
      id,
      name,
      party,
      bio,
      core_beliefs,
      work_experience,
      is_incumbent,
      photo_url,
      website,
      fec_link,
      short_bio,
      positions (
        id,
        title,
        description,
        state,
        district,
        current_holder
      ),
      policy_positions (
        topic,
        stance,
        detail,
        source_url
      )
    `)
    .eq('id', id)
    .single()

  if (error || !candidate) {
    notFound()
  }

  const position = (
    Array.isArray(candidate.positions)
      ? candidate.positions[0]
      : candidate.positions
  ) as {
    id: number
    title: string
    description: string | null
    state: string | null
    district: string | null
    current_holder: string | null
  } | null

  return (
    <>
      <SiteHeader />
      <main>
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-text mb-8"
          >
            ← Back to candidates
          </Link>

          {position && position.state && (
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand mb-4">
              {position.state}
              {position.district && ` · District ${position.district}`}
              {' · '}
              {position.title}
            </p>
          )}

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.95] mb-4">
            {candidate.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: partyColor(candidate.party) }}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-text">
                {candidate.party}
              </span>
            </div>
            {candidate.is_incumbent && (
              <>
                <span className="text-text-dim">·</span>
                <span className="font-mono text-xs uppercase tracking-wider text-brand font-bold">
                  In office
                </span>
              </>
            )}
          </div>

          <div>
            <div className="md:float-right md:ml-10 md:mb-6 mb-8 md:w-[320px] w-full">
              <div className="aspect-[4/5] rounded-md overflow-hidden border border-border bg-surface-raised">
                {candidate.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={candidate.photo_url}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                      Portrait pending
                    </span>
                  </div>
                )}
              </div>
              {candidate.website && (
                <ExternalLink href={candidate.website}>
                  Official website ↗
                </ExternalLink>
              )}
            </div>

            <div className="space-y-12">
              {candidate.short_bio && (
                <p className="text-lg md:text-xl text-text leading-relaxed font-medium">
                  {candidate.short_bio}
                </p>
              )}

              {candidate.bio && (
                <section>
                  <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text mb-4">
                    Biography
                  </h2>
                  <p className="text-base md:text-lg text-text leading-relaxed whitespace-pre-line">
                    {candidate.bio}
                  </p>
                </section>
              )}

              {candidate.core_beliefs && (
                <section>
                  <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text mb-4">
                    Core beliefs
                  </h2>
                  <p className="text-base md:text-lg text-text leading-relaxed whitespace-pre-line">
                    {candidate.core_beliefs}
                  </p>
                </section>
              )}

              {candidate.work_experience && (
                <section>
                  <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text mb-4">
                    Experience
                  </h2>
                  <p className="text-base md:text-lg text-text leading-relaxed whitespace-pre-line">
                    {candidate.work_experience}
                  </p>
                </section>
              )}

              {candidate.policy_positions && candidate.policy_positions.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text mb-6">
                    Policy positions
                  </h2>
                  <div className="space-y-6">
                    {candidate.policy_positions.map((pp: any, i: number) => (
                      <div key={i} className="pb-6 border-b border-border last:border-0">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-brand mb-2">
                          {pp.topic}
                        </p>
                        <h3 className="font-display text-xl text-text mb-2">
                          {pp.stance}
                        </h3>
                        {pp.detail && (
                          <p className="text-base text-text leading-relaxed">
                            {pp.detail}
                          </p>
                        )}
                        {pp.source_url && (
                          <ExternalLink href={pp.source_url}>
                            Source ↗
                          </ExternalLink>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {position && position.description && (
                <section>
                  <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-text mb-4">
                    About this race
                  </h2>
                  <p className="text-base md:text-lg text-text leading-relaxed mb-4">
                    {position.description}
                  </p>
                  {position.current_holder && (
                    <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                      Current holder: <span className="text-text">{position.current_holder}</span>
                    </p>
                  )}
                </section>
              )}
            </div>

            <div className="clear-both" />
          </div>
        </div>
      </main>
    </>
  )
}