export default function Hero() {
    return (
      <section className="mb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Ballot</h1>
          <p className="text-lg text-gray-400">
            Voter information and civic intelligence for the 2026 U.S. midterms.
          </p>
        </div>
  
        {/* Map placeholder — real interactive map coming in Lessons 13–15 */}
        <div className="aspect-[2/1] bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Interactive Map</p>
            <p className="text-gray-600 text-xs">Coming soon — state-by-state race tracker</p>
          </div>
        </div>
      </section>
    )
  }