function formatTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function BookingTable({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-16 text-muted text-sm">
        <div className="text-4xl mb-3">📋</div>
        No bookings found.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface border-b border-border">
            {['Booking ID', 'Phone', 'From', 'To', 'Price', 'Booking Time'].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted font-medium whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-surface/50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-muted max-w-[140px] truncate">
                {b.id}
              </td>
              <td className="px-4 py-3 text-ink whitespace-nowrap">{b.phoneNumber}</td>
              <td className="px-4 py-3 text-ink whitespace-nowrap">
                {b.deal?.departureCity ?? '—'}
              </td>
              <td className="px-4 py-3 text-ink whitespace-nowrap">
                {b.deal?.arrivalCity ?? '—'}
              </td>
              <td className="px-4 py-3 text-ink whitespace-nowrap">
                {b.deal ? `₹${b.deal.cost.toLocaleString('en-IN')}` : '—'}
              </td>
              <td className="px-4 py-3 text-ink whitespace-nowrap">
                {formatTime(b.bookingTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}