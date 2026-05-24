import { useState } from 'react'
import { submitClaim } from '../api/client'
import type { Claim } from '../types'

interface Props {
  onSubmit: (claim: Claim) => void
  onCancel: () => void
}

export default function ClaimForm({ onSubmit, onCancel }: Props) {
  const [form, setForm] = useState({ claimantName: '', type: 'Medical', description: '', amount: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.claimantName || !form.amount) {
      setError('Claimant name and amount are required')
      return
    }
    setLoading(true)
    try {
      const { data } = await submitClaim({ ...form, amount: parseFloat(form.amount) })
      onSubmit(data)
    } catch {
      setError('Failed to submit claim. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <h2 style={s.heading}>Submit New Claim</h2>

        <label style={s.label}>Claimant Name *</label>
        <input style={s.input} value={form.claimantName} onChange={set('claimantName')} placeholder="Full name" />

        <label style={s.label}>Claim Type *</label>
        <select style={s.input} value={form.type} onChange={set('type')}>
          <option>Medical</option>
          <option>Auto</option>
          <option>Property</option>
          <option>Life</option>
        </select>

        <label style={s.label}>Amount ($) *</label>
        <input style={s.input} type="number" min="0" step="0.01" value={form.amount}
          onChange={set('amount')} placeholder="0.00" />

        <label style={s.label}>Description</label>
        <textarea style={{ ...s.input, height: '80px', resize: 'none' }}
          value={form.description} onChange={set('description')} placeholder="Brief description of the claim" />

        {error && <p style={s.error}>{error}</p>}

        <div style={s.row}>
          <button style={s.btnPrimary} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Claim'}
          </button>
          <button style={s.btnGray} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
  },
  modal: {
    background: '#fff', padding: '2rem', borderRadius: '14px',
    width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
  },
  heading: { color: '#1a1a2e', marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.35rem', fontWeight: 600, fontSize: '0.88rem', color: '#555' },
  input: {
    width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e0e0e0',
    borderRadius: '8px', fontSize: '0.95rem', marginBottom: '1rem', boxSizing: 'border-box' as const,
  },
  row: { display: 'flex', gap: '0.75rem', marginTop: '0.5rem' },
  btnPrimary: {
    flex: 1, padding: '0.75rem', background: '#c1121f', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 600,
  },
  btnGray: {
    flex: 1, padding: '0.75rem', background: '#6c757d', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 600,
  },
  error: { color: '#c1121f', fontSize: '0.88rem', marginBottom: '0.5rem' },
}
