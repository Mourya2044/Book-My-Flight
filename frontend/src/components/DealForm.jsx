import { useState, useEffect } from 'react'

const EMPTY = {
  departureCity: '',
  arrivalCity: '',
  cost: '',
  startTime: '',
  endTime: '',
}

// Convert "2026-03-12T10:00:00" → "2026-03-12T10:00" (for datetime-local input)
function toInputValue(iso) {
  if (!iso) return ''
  return iso.slice(0, 16)
}

// Convert datetime-local value back to ISO-like string the API expects
function toApiDateTime(val) {
  if (!val) return ''
  return val + ':00'
}

export default function DealForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (initial) {
      setForm({
        departureCity: initial.departureCity || '',
        arrivalCity: initial.arrivalCity || '',
        cost: initial.cost ?? '',
        startTime: toInputValue(initial.startTime),
        endTime: toInputValue(initial.endTime),
      })
    } else {
      setForm(EMPTY)
    }
  }, [initial])

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      departureCity: form.departureCity.trim(),
      arrivalCity: form.arrivalCity.trim(),
      cost: Number(form.cost),
      startTime: toApiDateTime(form.startTime),
      endTime: toApiDateTime(form.endTime),
    })
  }

  const inputClass =
    'border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder-muted/50 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all w-full'
  const labelClass = 'text-xs uppercase tracking-wider text-muted font-medium'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Departure City</label>
          <input
            name="departureCity"
            value={form.departureCity}
            onChange={handleChange}
            placeholder="Kolkata"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Arrival City</label>
          <input
            name="arrivalCity"
            value={form.arrivalCity}
            onChange={handleChange}
            placeholder="Delhi"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Cost (₹)</label>
        <input
          name="cost"
          type="number"
          min="0"
          value={form.cost}
          onChange={handleChange}
          placeholder="3500"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Departure Time</label>
          <input
            name="startTime"
            type="datetime-local"
            value={form.startTime}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Arrival Time</label>
          <input
            name="endTime"
            type="datetime-local"
            value={form.endTime}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-border text-sm text-ink font-medium py-2 rounded-lg hover:bg-surface transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-ink text-paper text-sm font-medium py-2 rounded-lg hover:bg-opacity-80 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Saving…' : initial ? 'Update Deal' : 'Create Deal'}
        </button>
      </div>
    </form>
  )
}
