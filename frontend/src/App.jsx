import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import AdminBookings from './pages/AdminBookings.jsx'
import MyBookings from './pages/MyBookings.jsx'

const NAV_LINKS = [
  { to: '/',               label: 'Home' },
  { to: '/my-bookings',    label: 'My Bookings' },
  { to: '/admin',          label: 'Admin Deals' },
  // { to: '/admin/bookings', label: 'Admin Bookings' },
]

function Nav() {
  const loc = useLocation()
  return (
    <header className="border-b border-border bg-paper sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-accent text-xl">✈</span>
          <span className="font-display text-lg text-ink tracking-tight">Book My Flight</span>
        </Link>
        <nav className="flex items-center gap-1 flex-wrap">
          {NAV_LINKS.map(({ to, label }) => {
            // Exact match for / to avoid it highlighting for all routes
            const active =
              to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-ink text-paper'
                    : 'text-muted hover:text-ink hover:bg-surface'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper">
        <Nav />
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/admin"           element={<Admin />} />
          <Route path="/admin/bookings"  element={<AdminBookings />} />
          <Route path="/my-bookings"     element={<MyBookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}