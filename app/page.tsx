import { supabase } from '@/lib/supabase'
import Hero from '@/components/Hero'
import RaceSection from '@/components/RaceSection'
import Timeline from '@/components/Timeline'

export default async function Home() {
  // Fetch all positions + their candidates, sorted by hierarchy.
  const { data: positions, error: positionsError } = await supabase
    .from('positions')
    .select(`
      id,
      title,
      description,
      state,
      district,
      hierarchy_rank,
      candidates (
        id,
        name,
        party,
        is_incumbent,
        photo_url
      )
    `)
    .order('hierarchy_rank', { ascending: true })
    .order('state', { ascending: true })

  // Fetch elections for the timeline.
  const { data: elections, error: electionsError } = await supabase
    .from('elections')
    .select('id, name, date, state, type')
    .eq('is_active', true)
    .order('date', { ascending: true })

  if (positionsError || electionsError) {
    return (
      <div className="p-8 text-red-400">
        Error loading data:{' '}
        {positionsError?.message || electionsError?.message}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Hero />

        <section className="mb-16">
          <header className="mb-8">
            <h2 className="text-3xl font-bold">Candidate Due Diligence</h2>
            <p className="text-gray-400 mt-2">
              Research the candidates running in the 2026 midterms, organized by office.
            </p>
          </header>

          {positions?.map((p) => (
            <RaceSection
              key={p.id}
              position={p}
              candidates={p.candidates || []}
            />
          ))}
        </section>

        <Timeline elections={elections || []} />
      </div>
    </main>
  )
}