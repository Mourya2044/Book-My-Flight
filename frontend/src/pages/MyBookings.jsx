import { useState } from 'react'
import { fetchClientBookings } from '../api/api.js'
import BookingTable from '../components/BookingTable.jsx'

export default function MyBookings() {
  const [phone, setPhone] = useState('')
  const [bookings, setBookings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(e) {
    e.preventDefault()
    const trimmed = phone.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setBookings(null)
    try {
      const data = await fetchClientBookings(trimmed)
      setBookings(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-4xl text-ink mb-1">My Bookings</h1>
        <p className="text-muted text-sm">Enter your phone number to view your flight bookings.</p>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-8 max-w-sm animate-slide-up"
      >
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 9876543210"
          required
          maxLength={15}
          className="flex-1 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder-muted/50 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-paper text-sm font-medium px-4 py-2 rounded-lg hover:bg-opacity-80 disabled:opacity-60 transition-colors whitespace-nowrap"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="rounded-xl border border-border overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-surface animate-pulse border-b border-border last:border-0"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && bookings !== null && (
        <div className="animate-fade-in">
          {bookings.length > 0 && (
            <p className="text-xs text-muted mb-3 uppercase tracking-wider">
              {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
            </p>
          )}
          <BookingTable bookings={bookings} />
        </div>
      )}
    </main>
  )
}