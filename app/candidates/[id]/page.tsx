import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CandidateProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Fetch the candidate + their position + their policy positions in one query.
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
      positions (
        title,
        description,
        state,
        district
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

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">
        ← Back to candidates
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">{candidate.name}</h1>
        <p className="text-lg text-gray-400 mt-1">
          {candidate.party}
          {candidate.is_incumbent && ' · Incumbent'}
        </p>
        {candidate.positions && (
          <p className="text-md text-gray-300 mt-2">
            Running for: <span className="font-semibold">{(candidate.positions as any).title}</span>
          </p>
        )}
      </header>

      {candidate.bio && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Biography</h2>
          <p className="text-gray-200 leading-relaxed">{candidate.bio}</p>
        </section>
      )}

      {candidate.core_beliefs && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Core Beliefs</h2>
          <p className="text-gray-200 leading-relaxed">{candidate.core_beliefs}</p>
        </section>
      )}

      {candidate.work_experience && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          <p className="text-gray-200 leading-relaxed whitespace-pre-line">
            {candidate.work_experience}
          </p>
        </section>
      )}

      {candidate.policy_positions && candidate.policy_positions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Policy Positions</h2>
          <div className="space-y-4">
            {candidate.policy_positions.map((pp: any, i: number) => (
              <div key={i} className="border border-gray-800 rounded p-4">
                <h3 className="font-semibold">{pp.topic}</h3>
                <p className="text-sm text-gray-400 mt-1">{pp.stance}</p>
                {pp.detail && (
                  <p className="text-gray-300 mt-2">{pp.detail}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}