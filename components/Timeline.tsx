type Election = {
    id: number
    name: string
    date: string | null
    state: string | null
    type: string | null
  }
  
  export default function Timeline({ elections }: { elections: Election[] }) {
    return (
      <section className="mb-16">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-white">Election Timeline</h2>
          <p className="text-gray-400 mt-2">Upcoming federal elections</p>
        </header>
  
        {elections.length === 0 ? (
          <p className="text-gray-500 italic">No upcoming elections scheduled.</p>
        ) : (
          <ol className="space-y-3">
            {elections.map((e) => (
              <li
                key={e.id}
                className="flex items-start gap-4 border border-gray-800 rounded-lg p-4"
              >
                <div className="text-gray-400 text-sm font-mono whitespace-nowrap min-w-[110px]">
                  {e.date ? new Date(e.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }) : 'TBD'}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{e.name}</h3>
                  {e.type && <p className="text-sm text-gray-400 capitalize">{e.type}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    )
  }