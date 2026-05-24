import { useState } from 'react'
import { login, register } from '../api/client'

interface Props {
  onLogin: (username: string, token: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (action: 'login' | 'register') => {
    setError('')
    setLoading(true)
    try {
      const fn = action === 'login' ? login : register
      const { data } = await fn(username, password)
      onLogin(data.username, data.token)
    } catch {
      setError('Invalid credentials. Try admin / password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logoRow}>
          <span style={s.logo}>BOA</span>
        </div>
        <h2 style={s.title}>Claims Portal</h2>
        <p style={s.subtitle}>Bank of America — Claims Management System</p>

        <input
          style={s.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={s.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit('login')}
        />

        {error && <p style={s.error}>{error}</p>}

        <div style={s.row}>
          <button style={s.btn} onClick={() => submit('login')} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
          <button style={{ ...s.btn, ...s.btnOutline }} onClick={() => submit('register')} disabled={loading}>
            Register
          </button>
        </div>
        <p style={s.hint}>Demo credentials: <strong>admin</strong> / <strong>password</strong></p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #c1121f 0%, #780000 100%)',
  },
  card: {
    background: '#fff', padding: '2.5rem', borderRadius: '16px',
    width: '100%', maxWidth: '400px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
  },
  logoRow: { display: 'flex', justifyContent: 'center', marginBottom: '1rem' },
  logo: {
    background: '#c1121f', color: '#fff', fontWeight: 900, fontSize: '1.4rem',
    padding: '0.4rem 1rem', borderRadius: '8px', letterSpacing: '2px',
  },
  title: { textAlign: 'center', color: '#1a1a2e', fontSize: '1.5rem', marginBottom: '0.25rem' },
  subtitle: { textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '2rem' },
  input: {
    width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e0e0e0',
    borderRadius: '8px', fontSize: '1rem', marginBottom: '1rem', outline: 'none',
    boxSizing: 'border-box' as const,
  },
  row: { display: 'flex', gap: '0.75rem', marginTop: '0.25rem' },
  btn: {
    flex: 1, padding: '0.75rem', background: '#c1121f', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 600,
  },
  btnOutline: { background: '#fff', color: '#c1121f', border: '2px solid #c1121f' },
  error: { color: '#c1121f', fontSize: '0.88rem', marginBottom: '0.75rem' },
  hint: { textAlign: 'center', color: '#aaa', fontSize: '0.82rem', marginTop: '1.25rem' },
}
