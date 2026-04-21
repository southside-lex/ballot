'use client'

import { useState, useMemo } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'

type StateStatus = {
  state: string
  chamber: string
  status: string
  winning_party: string | null
}

type Props = {
  statuses?: StateStatus[]
  topology: any
}

const STATE_CODE_TO_FIPS: Record<string, string> = {
  AL: '01', AK: '02', AZ: '04', AR: '05', CA: '06', CO: '08', CT: '09', DE: '10',
  FL: '12', GA: '13', HI: '15', ID: '16', IL: '17', IN: '18', IA: '19', KS: '20',
  KY: '21', LA: '22', ME: '23', MD: '24', MA: '25', MI: '26', MN: '27', MS: '28',
  MO: '29', MT: '30', NE: '31', NV: '32', NH: '33', NJ: '34', NM: '35', NY: '36',
  NC: '37', ND: '38', OH: '39', OK: '40', OR: '41', PA: '42', RI: '44', SC: '45',
  SD: '46', TN: '47', TX: '48', UT: '49', VT: '50', VA: '51', WA: '53', WV: '54',
  WI: '55', WY: '56',
}

function partyFill(party: string | null | undefined): string {
  if (!party) return 'var(--color-surface-raised)'
  const p = party.toLowerCase()
  if (p.includes('democrat')) return 'var(--color-party-democrat)'
  if (p.includes('republican')) return 'var(--color-party-republican)'
  if (p.includes('green')) return 'var(--color-party-green)'
  if (p.includes('libertarian')) return 'var(--color-party-libertarian)'
  return 'var(--color-brand)'
}

const WIDTH = 975
const HEIGHT = 610

export default function USMap({ statuses = [], topology }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const statusByFips = useMemo(() => {
    const map = new Map<string, StateStatus>()
    statuses.forEach((s) => {
      const fips = STATE_CODE_TO_FIPS[s.state]
      if (fips) map.set(fips, s)
    })
    return map
  }, [statuses])

  const paths = useMemo(() => {
    const collection = feature(
      topology,
      topology.objects.states
    ) as unknown as FeatureCollection<Geometry, { name: string }>

    const projection = geoAlbersUsa()
      .scale(1300)
      .translate([WIDTH / 2, HEIGHT / 2])

    const pathGen = geoPath(projection)

    return collection.features.map((f) => ({
      id: f.id as string,
      name: f.properties.name,
      d: pathGen(f) || '',
    }))
  }, [topology])

  return (
    <div className="relative w-full aspect-[16/10] bg-surface border border-border rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-dim z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
        Live · U.S. Senate
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 text-[10px] font-mono uppercase tracking-wider text-text-muted z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'var(--color-party-democrat)' }} />
          Democratic
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'var(--color-party-republican)' }} />
          Republican
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm border border-border-strong" style={{ backgroundColor: 'var(--color-surface-raised)' }} />
          No election
        </div>
      </div>

      {hovered && (
        <div className="absolute top-4 right-4 font-mono text-xs text-text bg-bg px-3 py-1.5 rounded-md border border-border z-10">
          {hovered}
        </div>
      )}

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full">
        <g>
          {paths.map((p) => {
            const status = statusByFips.get(p.id)
            const fill = status
              ? partyFill(status.winning_party)
              : 'var(--color-surface-raised)'

            return (
              <path
                key={p.id}
                d={p.d}
                fill={fill}
                stroke="var(--color-border-strong)"
                strokeWidth={0.5}
                style={{ cursor: 'pointer', transition: 'opacity 140ms ease' }}
                onMouseEnter={(e) => {
                  setHovered(p.name)
                  e.currentTarget.style.opacity = '0.85'
                }}
                onMouseLeave={(e) => {
                  setHovered(null)
                  e.currentTarget.style.opacity = '1'
                }}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}