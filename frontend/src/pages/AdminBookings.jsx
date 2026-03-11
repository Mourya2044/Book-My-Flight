import { useState, useEffect } from 'react'
import { fetchAllBookings } from '../api/api.js'
import BookingTable from '../components/BookingTable.jsx'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllBookings()
      .then(setBookings)
      .catch((err) => setError(err.message || 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-4xl text-ink mb-1">All Bookings</h1>
        <p className="text-muted text-sm">System-wide view of every flight booking.</p>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="rounded-xl border border-border overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-surface animate-pulse border-b border-border last:border-0"
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="animate-fade-in">
          {bookings.length > 0 && (
            <p className="text-xs text-muted mb-3 uppercase tracking-wider">
              {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
            </p>
          )}
          <BookingTable bookings={bookings} />
        </div>
      )}
    </main>
  )
}