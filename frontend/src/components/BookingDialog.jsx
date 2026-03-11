import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { bookFlight } from '../api/api.js'

export default function BookingDialog({ open, onClose, deal }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  function reset() {
    setPhone('')
    setLoading(false)
    setSuccess(null)
    setError(null)
  }

  function handleClose() {
    reset()
    onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!phone.trim()) return

    setLoading(true)
    setError(null)
    try {
      const result = await bookFlight(deal.id, phone.trim())
      setSuccess(result)
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) handleClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-paper border border-border rounded-xl shadow-xl p-6 animate-slide-up focus:outline-none">

          {success ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="font-display text-2xl text-ink mb-1">Booking Confirmed</h2>
              <p className="text-sm text-muted mb-1">
                {deal.departureCity} → {deal.arrivalCity}
              </p>
              <p className="text-xs text-muted mt-3">
                Booking ID: <span className="font-mono text-ink">{success.id}</span>
              </p>
              <button
                onClick={handleClose}
                className="mt-5 w-full bg-ink text-paper text-sm font-medium py-2.5 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <Dialog.Title className="font-display text-xl text-ink mb-1">
                Book Flight
              </Dialog.Title>
              <p className="text-sm text-muted mb-5">
                {deal.departureCity} → {deal.arrivalCity} · ₹{deal.cost.toLocaleString('en-IN')}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    required
                    maxLength={15}
                    className="border border-border rounded-lg px-3 py-2.5 text-sm text-ink placeholder-muted/60 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 border border-border text-sm text-ink font-medium py-2.5 rounded-lg hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-accent text-white text-sm font-medium py-2.5 rounded-lg hover:bg-orange-700 disabled:opacity-60 transition-colors"
                  >
                    {loading ? 'Booking…' : 'Confirm'}
                  </button>
                </div>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
