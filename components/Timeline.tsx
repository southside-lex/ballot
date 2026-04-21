type Election = {
    id: number
    name: string
    date: string | null
    state: string | null
    type: string | null
  }
  
  export default function Timeline({ elections }: { elections: Election[] }) {
    return (
      <section className="py-20 border-t border-border">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-2">
            Calendar
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] text-text leading-tight">
            Timeline.
          </h2>
        </div>
  
        {elections.length === 0 ? (
          <p className="text-text-dim italic text-sm">No upcoming elections.</p>
        ) : (
          <ol className="divide-y divide-border border-y border-border">
            {elections.map((e) => (
              <li
                key={e.id}
                className="flex items-baseline gap-6 py-5"
              >
                <time className="font-mono text-xs text-brand tabular-nums whitespace-nowrap w-28 shrink-0">
                  {e.date
                    ? new Date(e.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'TBD'}
                </time>
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl tracking-tight text-text">
                    {e.name}
                  </h3>
                  {e.type && (
                    <p className="text-xs font-mono uppercase tracking-wider text-text-dim mt-0.5 capitalize">
                      {e.type}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    )
  }