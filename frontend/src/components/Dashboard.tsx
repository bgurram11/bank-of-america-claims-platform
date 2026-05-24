import { useEffect, useState } from 'react'
import { getClaims, updateClaimStatus } from '../api/client'
import type { Claim } from '../types'
import ClaimForm from './ClaimForm'

interface Props {
  username: string
  onLogout: () => void
}

const STATUS_COLOR: Record<string, string> = {
  PENDING: '#fd7e14',
  IN_REVIEW: '#0d6efd',
  APPROVED: '#198754',
  REJECTED: '#dc3545',
}

export default function Dashboard({ username, onLogout }: Props) {
  const [claims, setClaims] = useState<Claim[]>([])
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClaims()
      .then(r => setClaims(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleNewClaim = (claim: Claim) => {
    setClaims(prev => [claim, ...prev])
    setShowForm(false)
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const { data } = await updateClaimStatus(id, status)
      setClaims(prev => prev.map(c => (c.id === id ? data : c)))
    } catch (e) {
      console.error(e)
    }
  }

  const statuses = ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED'] as const
  const filtered = filter === 'ALL' ? claims : claims.filter(c => c.status === filter)
  const total = claims.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <span style={s.logo}>BOA</span>
          <span style={s.appName}>Claims Portal</span>
        </div>
        <div style={s.headerRight}>
          <span style={s.greeting}>Hello, <strong>{username}</strong></span>
          <button style={s.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main style={s.main}>
        {/* Summary cards */}
        <div style={s.summaryRow}>
          <div style={s.summaryCard}>
            <span style={s.summaryNum}>{claims.length}</span>
            <span style={s.summaryLabel}>Total Claims</span>
          </div>
          {statuses.map(st => (
            <div key={st} style={{ ...s.summaryCard, borderTop: `3px solid ${STATUS_COLOR[st]}` }}>
              <span style={{ ...s.summaryNum, color: STATUS_COLOR[st] }}>
                {claims.filter(c => c.status === st).length}
              </span>
              <span style={s.summaryLabel}>{st.replace('_', ' ')}</span>
            </div>
          ))}
          <div style={{ ...s.summaryCard, borderTop: '3px solid #1a1a2e' }}>
            <span style={{ ...s.summaryNum, fontSize: '1.3rem' }}>
              ${total.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </span>
            <span style={s.summaryLabel}>Total Value</span>
          </div>
        </div>

        {/* Toolbar */}
        <div style={s.toolbar}>
          <div style={s.filters}>
            {['ALL', ...statuses].map(f => (
              <button
                key={f}
                style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}
                onClick={() => setFilter(f)}
              >
                {f === 'ALL' ? 'All' : f.replace('_', ' ')}
              </button>
            ))}
          </div>
          <button style={s.newBtn} onClick={() => setShowForm(true)}>+ New Claim</button>
        </div>

        {/* Claims grid */}
        {loading ? (
          <p style={s.emptyMsg}>Loading claims…</p>
        ) : filtered.length === 0 ? (
          <p style={s.emptyMsg}>No claims found for this filter.</p>
        ) : (
          <div style={s.grid}>
            {filtered.map(claim => (
              <div key={claim.id} style={s.card}>
                <div style={s.cardTop}>
                  <code style={s.claimNum}>{claim.claimNumber}</code>
                  <span style={{ ...s.badge, background: STATUS_COLOR[claim.status] }}>
                    {claim.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 style={s.claimant}>{claim.claimantName}</h3>
                <div style={s.metaRow}>
                  <span style={s.typeTag}>{claim.type}</span>
                  <span style={s.amount}>${Number(claim.amount).toLocaleString()}</span>
                </div>
                {claim.description && <p style={s.desc}>{claim.description}</p>}
                <div style={s.cardFooter}>
                  <span style={s.by}>by {claim.submittedBy}</span>
                  <select
                    style={s.statusSelect}
                    value={claim.status}
                    onChange={e => handleStatusChange(claim.id, e.target.value)}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && <ClaimForm onSubmit={handleNewClaim} onCancel={() => setShowForm(false)} />}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f0f2f5', fontFamily: 'inherit' },
  header: {
    background: '#c1121f', color: '#fff', padding: '0 2rem', height: '60px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  logo: {
    background: 'rgba(255,255,255,0.2)', fontWeight: 900, fontSize: '1rem',
    padding: '0.2rem 0.6rem', borderRadius: '6px', letterSpacing: '2px',
  },
  appName: { fontSize: '1rem', fontWeight: 600, opacity: 0.95 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  greeting: { fontSize: '0.9rem', opacity: 0.9 },
  logoutBtn: {
    padding: '0.35rem 0.9rem', background: 'rgba(255,255,255,0.15)',
    color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem',
  },
  main: { maxWidth: '1280px', margin: '0 auto', padding: '1.75rem 2rem' },
  summaryRow: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' as const },
  summaryCard: {
    flex: 1, minWidth: '110px', background: '#fff', borderRadius: '10px',
    padding: '1rem 1.25rem', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
    display: 'flex', flexDirection: 'column' as const, gap: '0.25rem',
    borderTop: '3px solid #ddd',
  },
  summaryNum: { fontSize: '1.8rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1 },
  summaryLabel: { fontSize: '0.78rem', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.5px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' },
  filters: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const },
  filterBtn: {
    padding: '0.45rem 1rem', border: '1.5px solid #ddd', borderRadius: '20px',
    background: '#fff', cursor: 'pointer', fontSize: '0.85rem', color: '#555',
  },
  filterActive: { borderColor: '#c1121f', background: '#fff0f0', color: '#c1121f', fontWeight: 600 },
  newBtn: {
    padding: '0.55rem 1.25rem', background: '#c1121f', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.1rem' },
  card: {
    background: '#fff', borderRadius: '12px', padding: '1.25rem',
    boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' },
  claimNum: { fontSize: '0.78rem', color: '#999', background: '#f5f5f5', padding: '0.2rem 0.5rem', borderRadius: '4px' },
  badge: { padding: '0.2rem 0.6rem', borderRadius: '12px', color: '#fff', fontSize: '0.72rem', fontWeight: 700 },
  claimant: { color: '#1a1a2e', fontSize: '1.05rem', marginBottom: '0.5rem' },
  metaRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
  typeTag: { fontSize: '0.8rem', color: '#666', background: '#f0f0f0', padding: '0.2rem 0.55rem', borderRadius: '4px' },
  amount: { fontWeight: 700, color: '#1a1a2e' },
  desc: { fontSize: '0.84rem', color: '#777', lineHeight: 1.45, marginBottom: '0.75rem' },
  cardFooter: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0',
  },
  by: { fontSize: '0.78rem', color: '#bbb' },
  statusSelect: {
    padding: '0.3rem 0.5rem', border: '1.5px solid #e0e0e0',
    borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer',
  },
  emptyMsg: { textAlign: 'center', color: '#aaa', marginTop: '3rem', fontSize: '1rem' },
}
