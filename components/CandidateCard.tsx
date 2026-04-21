import Link from 'next/link'

type Candidate = {
  id: number
  name: string
  party: string | null
  is_incumbent: boolean | null
  photo_url: string | null
}

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="block border border-gray-800 rounded-lg p-4 hover:border-gray-600 hover:bg-gray-900 transition-colors"
    >
      <div className="aspect-square bg-gray-900 rounded mb-3 flex items-center justify-center text-gray-600 text-sm">
        {candidate.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={candidate.photo_url}
            alt={candidate.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          'No photo'
        )}
      </div>
      <h3 className="font-semibold text-white">{candidate.name}</h3>
      <p className="text-sm text-gray-400">
        {candidate.party}
        {candidate.is_incumbent && ' · Incumbent'}
      </p>
    </Link>
  )
}