import { useState, useEffect } from 'react'
import { fetchDeals, createDeal, updateDeal, deleteDeal } from '../api/api.js'
import DealForm from '../components/DealForm.jsx'
import { Link } from 'react-router-dom'

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

export default function Admin() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  // null = create mode, object = edit mode
  const [editTarget, setEditTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchDeals()
      setDeals(data)
    } catch (err) {
      setError(err.message || 'Failed to load deals')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleCreate(data) {
    setFormLoading(true)
    setFormError(null)
    try {
      await createDeal(data)
      setShowForm(false)
      await load()
    } catch (err) {
      setFormError(err.message || 'Failed to create deal')
    } finally {
      setFormLoading(false)
    }
  }

  async function handleUpdate(data) {
    if (!editTarget) return
    setFormLoading(true)
    setFormError(null)
    try {
      await updateDeal(editTarget.id, data)
      setEditTarget(null)
      await load()
    } catch (err) {
      setFormError(err.message || 'Failed to update deal')
    } finally {
      setFormLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this deal?')) return
    try {
      await deleteDeal(id)
      await load()
    } catch (err) {
      alert(err.message || 'Failed to delete deal')
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="font-display text-4xl text-ink mb-1">Admin</h1>
          <p className="text-muted text-sm">Manage flight deals</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={"/admin/bookings"}
            className={'px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap text-muted hover:text-ink hover:bg-surface'
            }
          >
            All Bookings
          </Link>
          <button
            onClick={() => { setEditTarget(null); setShowForm((v) => !v); setFormError(null) }}
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            {showForm && !editTarget ? '✕ Cancel' : '+ New Deal'}
          </button>
        </div>
      </div>

      {/* Create form */}
      {showForm && !editTarget && (
        <div className="bg-white border border-border rounded-xl p-6 mb-8 animate-slide-up">
          <h2 className="font-display text-xl text-ink mb-5">New Deal</h2>
          {formError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              {formError}
            </p>
          )}
          <DealForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-surface rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* Deals table */}
      {!loading && deals.length === 0 && !error && (
        <div className="text-center py-20 text-muted text-sm">No deals yet. Create one above.</div>
      )}

      {!loading && deals.length > 0 && (
        <div className="flex flex-col gap-3 stagger">
          {deals.map((deal) => (
            <div key={deal.id}>
              {editTarget?.id === deal.id ? (
                <div className="bg-white border border-accent/40 rounded-xl p-6 animate-slide-up">
                  <h2 className="font-display text-lg text-ink mb-4">Edit Deal</h2>
                  {formError && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                      {formError}
                    </p>
                  )}
                  <DealForm
                    initial={editTarget}
                    onSubmit={handleUpdate}
                    onCancel={() => { setEditTarget(null); setFormError(null) }}
                    loading={formLoading}
                  />
                </div>
              ) : (
                <div className="animate-slide-up bg-white border border-border rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-display text-ink whitespace-nowrap">
                      {deal.departureCity}
                      <span className="text-accent mx-2 text-sm">✈</span>
                      {deal.arrivalCity}
                    </span>
                    <span className="hidden sm:inline text-xs text-muted">
                      {formatTime(deal.startTime)} – {formatTime(deal.endTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-display text-ink">₹{deal.cost.toLocaleString('en-IN')}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditTarget(deal); setShowForm(false); setFormError(null) }}
                        className="text-xs border border-border px-3 py-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="text-xs border border-red-200 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
