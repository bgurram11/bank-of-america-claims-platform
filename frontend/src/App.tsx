import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

export default function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem('username'))

  const handleLogin = (username: string, token: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    setUser(username)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null)
  }

  return user
    ? <Dashboard username={user} onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />
}
