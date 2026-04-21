import CandidateCard from './CandidateCard'

type Candidate = {
  id: number
  name: string
  party: string | null
  is_incumbent: boolean | null
  photo_url: string | null
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
    <section className="mb-16">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white">{position.title}</h2>
        {position.description && (
          <p className="text-gray-400 mt-2 max-w-2xl">{position.description}</p>
        )}
      </header>

      {candidates.length === 0 ? (
        <p className="text-gray-500 italic">No candidates entered yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {candidates.map((c) => (
            <CandidateCard key={c.id} candidate={c} />
          ))}
        </div>
      )}
    </section>
  )
}