import { useState, useEffect } from 'react'
import { fetchDeals } from '../api/api.js'
import DealCard from '../components/DealCard.jsx'

export default function Home() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDeals()
      .then(setDeals)
      .catch((err) => setError(err.message || 'Failed to load deals'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-10 animate-fade-in">
        <h1 className="font-display text-4xl text-ink mb-2">Flight Deals</h1>
        <p className="text-muted text-sm">Handpicked fares. Book in seconds.</p>
      </div>

      {/* States */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-border rounded-lg p-5 h-44 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-4 bg-surface rounded w-3/4 mb-3" />
              <div className="h-3 bg-surface rounded w-1/2 mb-2" />
              <div className="h-3 bg-surface rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-5 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && deals.length === 0 && (
        <div className="text-center py-20 text-muted">
          <div className="text-5xl mb-4">✈</div>
          <p className="text-sm">No deals available right now. Check back soon.</p>
        </div>
      )}

      {!loading && !error && deals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </main>
  )
}
