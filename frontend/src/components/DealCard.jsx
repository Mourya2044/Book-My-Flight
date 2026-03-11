import { useState } from 'react'
import BookingDialog from './BookingDialog.jsx'

function formatTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DealCard({ deal }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <article className="animate-slide-up bg-white border border-border rounded-lg p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Route */}
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-ink leading-none">{deal.departureCity}</span>
          <span className="text-accent text-sm">✈</span>
          <span className="font-display text-lg text-ink leading-none">{deal.arrivalCity}</span>
        </div>

        {/* Times */}
        <div className="flex gap-4 text-xs text-muted">
          <div>
            <div className="uppercase tracking-wider mb-0.5">Departs</div>
            <div className="text-ink font-medium">{formatTime(deal.startTime)}</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="uppercase tracking-wider mb-0.5">Arrives</div>
            <div className="text-ink font-medium">{formatTime(deal.endTime)}</div>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted uppercase tracking-wider">From</span>
            <div className="font-display text-2xl text-ink">₹{deal.cost.toLocaleString('en-IN')}</div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-700 transition-colors"
          >
            Book
          </button>
        </div>
      </article>

      <BookingDialog open={open} onClose={() => setOpen(false)} deal={deal} />
    </>
  )
}
