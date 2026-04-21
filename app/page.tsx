import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Home() {
  const { data: candidates, error } = await supabase
    .from('candidates')
    .select('id, name, party, is_incumbent')

  if (error) {
    return <div className="p-8">Error: {error.message}</div>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ballot — Candidates</h1>
      <ul className="space-y-2">
        {candidates?.map((c) => (
          <li key={c.id}>
            <Link
              href={`/candidates/${c.id}`}
              className="block border p-3 rounded hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">{c.name}</span> — {c.party}
              {c.is_incumbent && (
                <span className="ml-2 text-sm text-gray-500">(incumbent)</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}