import { supabase } from '@/lib/supabase'
import SiteHeader from '@/components/SiteHeader'
import Hero from '@/components/Hero'
import RaceSection from '@/components/RaceSection'
import Timeline from '@/components/Timeline'

async function getTopology() {
  const res = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json', {
    next: { revalidate: 86400 },
  })
  return res.json()
}

export default async function Home() {
  const [topology, positionsResult, electionsResult, statusesResult] = await Promise.all([
    getTopology(),
    supabase
      .from('positions')
      .select(`
        id, title, description, state, district, hierarchy_rank,
        candidates ( id, name, party, is_incumbent, photo_url, short_bio )
      `)
      .order('hierarchy_rank', { ascending: true })
      .order('state', { ascending: true }),
    supabase
      .from('elections')
      .select('id, name, date, state, type')
      .eq('is_active', true)
      .order('date', { ascending: true }),
    supabase
      .from('state_election_status')
      .select('state, chamber, status, winning_party'),
  ])

  const { data: positions, error: positionsError } = positionsResult
  const { data: elections, error: electionsError } = electionsResult
  const { data: statuses, error: statusesError } = statusesResult

  if (positionsError || electionsError || statusesError) {
    return (
      <div className="p-8 text-red-600">
        Error loading data:{' '}
        {positionsError?.message || electionsError?.message || statusesError?.message}
      </div>
    )
  }

  return (
    <>
      <SiteHeader />
      <main>
        <div className="max-w-7xl mx-auto px-6">
          <Hero statuses={statuses || []} topology={topology} />

          <section>
            <div className="mb-4 flex items-baseline justify-between flex-wrap gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-2">
                  Portfolio
                </p>
                <h2 className="font-display text-3xl md:text-5xl tracking-[-0.025em] leading-[0.95]">
                  Candidates.
                </h2>
              </div>
              <p className="text-sm text-text-muted max-w-sm">
                Organized by office. Click any candidate to review biography,
                policy positions, and work history.
              </p>
            </div>

            {positions?.map((p) => (
              <RaceSection
                key={p.id}
                position={p}
                candidates={p.candidates || []}
              />
            ))}
          </section>

          <Timeline elections={elections || []} />

          <footer className="py-12 border-t border-border mt-16">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span className="font-display text-base tracking-tight">Ballot</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                Civic intelligence · 2026
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}