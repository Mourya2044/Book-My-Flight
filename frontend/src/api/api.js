const BASE = 'http://localhost:8080'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error')
    throw new Error(text || `HTTP ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export function fetchDeals() {
  return request('/deals')
}

export function createDeal(data) {
  return request('/deals', { method: 'POST', body: JSON.stringify(data) })
}

export function updateDeal(id, data) {
  return request(`/deals/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteDeal(id) {
  return request(`/deals/${id}`, { method: 'DELETE' })
}

export function bookFlight(dealId, phoneNumber) {
  return request('/booking', {
    method: 'POST',
    body: JSON.stringify({ dealId, phoneNumber }),
  })
}

export function fetchClientBookings(phoneNumber) {
  return request(`/booking/client/${encodeURIComponent(phoneNumber)}`)
}

export function fetchAllBookings() {
  return request('/booking/admin')
}