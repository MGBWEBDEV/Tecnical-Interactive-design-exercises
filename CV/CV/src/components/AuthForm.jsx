import { useRef, useState } from 'react'
import { isAnonymous, logIn, signUp } from '../lib/auth'

export default function AuthForm({ session, onAuthenticated, onCancel }) {
  const anonymous = isAnonymous(session)
  const [mode, setMode] = useState('signup')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const pending = useRef(false)

  async function submit(event) {
    event.preventDefault()
    if (pending.current) return
    if (!username.trim()) { setError('Enter a username.'); return }
    if (anonymous && mode === 'login' && !window.confirm('Logging into another account leaves this browser’s anonymous CV behind. Create an account instead to keep it. Continue?')) return
    pending.current = true
    setBusy(true)
    setError('')
    try {
      const user = await (mode === 'signup' ? signUp(username, password) : logIn(username, password))
      setPassword('')
      onAuthenticated(user)
    } catch (failure) {
      setError(failure.code === 101 ? 'Incorrect username or password.' : failure.message)
    } finally {
      pending.current = false
      setBusy(false)
    }
  }

  return (
    <main className="auth-panel">
      <h1>My CV</h1>
      <h2>{mode === 'signup' ? 'Create an account' : 'Log in'}</h2>
      <p>Save your CV and access it on any device.</p>
      {anonymous && <p>Create an account to keep the CV already saved in this browser.</p>}
      <form onSubmit={submit}>
        <fieldset disabled={busy}>
          <label htmlFor="username">Username</label>
          <input id="username" autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={mode === 'signup' ? 8 : undefined} value={password} onChange={event => setPassword(event.target.value)} />
          {mode === 'signup' && <p>Use at least 8 characters.</p>}
          <button type="submit">{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}</button>
          <button type="button" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); setPassword('') }}>
            {mode === 'signup' ? 'Already have an account? Log in' : 'Create an account'}
          </button>
        </fieldset>
      </form>
      {error && <p role="alert">{error}</p>}
      <button type="button" disabled={busy} onClick={onCancel}>Back to my CV</button>
    </main>
  )
}
