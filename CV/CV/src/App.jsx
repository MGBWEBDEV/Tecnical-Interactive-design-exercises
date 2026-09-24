import { useEffect, useState } from 'react'
import CVEditor from './CVEditor'
import AuthForm from './components/AuthForm'
import { getSession, isAnonymous } from './lib/auth'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [guestDraft, setGuestDraft] = useState(null)

  useEffect(() => {
    let active = true
    getSession().then(user => { if (active) setSession(user) })
      .catch(failure => { if (active) setError(failure.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  if (loading) return <p role="status">Restoring your session?</p>
  if (error) return <p role="alert">{error} Reload the page to retry.</p>
  const user = session && !isAnonymous(session) ? session : null
  function requestAccount(data) {
    setGuestDraft(data)
    setShowAuth(true)
  }
  return (
    <>
      {showAuth && <AuthForm session={session} onCancel={() => setShowAuth(false)} onAuthenticated={account => { setSession(account); setShowAuth(false) }} />}
      <div hidden={showAuth}>
        <CVEditor key={user?.id || 'guest'} user={user} initialDraft={guestDraft} onRequireAuth={requestAccount} onLoggedOut={() => { setGuestDraft(null); setSession(null) }} />
      </div>
    </>
  )
}
