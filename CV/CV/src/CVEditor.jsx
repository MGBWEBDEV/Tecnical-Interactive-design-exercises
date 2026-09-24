import { useEffect, useRef, useState } from 'react'
import Education from './components/Education'
import GeneralInfo from './components/GeneralInfo'
import Experience from './components/Experience'
import { loadCV, saveCV } from './lib/cv'
import { logOut } from './lib/auth'

function CVEditor({ user, onLoggedOut, onRequireAuth, initialDraft }) {
  const [generalInfo, setGeneralInfo] = useState(initialDraft?.generalInfo || { name: '', email: '', phone: '' })
  const [education, setEducation] = useState(initialDraft?.education || [{ id: 'education-1', school: '', degree: '', year: '' }])
  const [experience, setExperience] = useState(initialDraft?.experience || [{ id: 'experience-1', company: '', position: '', responsibilities: '', dateFrom: '', dateTo: '' }])
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Loading your CV...')
  const [dirty, setDirty] = useState(Boolean(initialDraft))
  const incomingDraft = useRef(initialDraft)
  const replaceExisting = useRef(false)
  const record = useRef(null)
  const saving = useRef(false)

  useEffect(() => {
    let active = true
    const loadingCV = user ? loadCV() : Promise.resolve(null)
    loadingCV.then(cv => {
      if (!active) return
      record.current = cv
      if (cv && !incomingDraft.current) {
        setGeneralInfo(cv.get('generalInfo'))
        setEducation(cv.get('education'))
        setExperience(cv.get('experience'))
      }
      setStatus('ready')
      replaceExisting.current = Boolean(cv && incomingDraft.current)
      setMessage(incomingDraft.current ? 'Your CV is ready. Click Save CV to save it to your account.' : cv ? 'Saved CV loaded.' : 'Your CV is ready to edit.')
    }).catch(error => {
      if (!active) return
      setStatus('load-error')
      setMessage(`Could not load your CV: ${error.message}. Reload the page to retry.`)
    })
    return () => { active = false }
  }, [user])

  function change(setter, currentValue, value) {
    if (JSON.stringify(currentValue) === JSON.stringify(value)) return
    setter(value)
    setDirty(true)
    setMessage('You have unsaved changes.')
  }

  async function handleSave() {
    if (saving.current) return
    if (!user) {
      onRequireAuth({ generalInfo, education, experience })
      return
    }
    if (replaceExisting.current && !window.confirm('This account already has a saved CV. Replace it with the CV you just built?')) return
    saving.current = true
    setStatus('saving')
    setMessage('Saving your CV...')
    try {
      record.current = await saveCV(record.current, { generalInfo, education, experience })
      setStatus('ready')
      setDirty(false)
      replaceExisting.current = false
      setMessage('CV saved successfully.')
    } catch (error) {
      setStatus('save-error')
      setMessage(`Could not save your CV: ${error.message}. Your edits are still here; try Save CV again.`)
    } finally {
      saving.current = false
    }
  }

  async function handleLogout() {
    if (dirty && !window.confirm('Log out and discard unsaved changes?')) return
    setStatus('logging-out')
    try {
      await logOut()
      onLoggedOut()
    } catch (error) {
      setStatus('logout-error')
      setMessage(`Could not log out: ${error.message}`)
    }
  }

  const busy = status === 'logging-out' || status === 'loading' || status === 'saving' || status === 'load-error'

  return (
    <>
      <header className="cv-toolbar">
        <h1>My CV</h1>
        <p>{user ? `Logged in as ${user.getUsername()}` : "Build your CV first. Create an account when you are ready to save."}</p>
        {user ? <button onClick={handleLogout} disabled={status === "saving" || status === "logging-out"}>Log out</button> : <button onClick={() => onRequireAuth(dirty ? { generalInfo, education, experience } : null)} disabled={busy}>Create account / Log in</button>}
        <button onClick={handleSave} disabled={busy}>
          {status === 'saving' ? 'Saving...' : 'Save CV'}
        </button>
        <p role={status.endsWith('error') ? 'alert' : 'status'}>{message}</p>
        <p>Save CV saves submitted changes only. Submit each section to include its edits.</p>
        <p>{user ? "Your saved CV is private to your account." : "Guest work stays on this page until you sign in and save. Refreshing clears it."}</p>
      </header>
      <fieldset className="cv-sections" disabled={busy}>
        <GeneralInfo info={generalInfo} setInfo={value => change(setGeneralInfo, generalInfo, value)} />
        <Education entries={education} setEntries={value => change(setEducation, education, value)} />
        <Experience entries={experience} setEntries={value => change(setExperience, experience, value)} />
      </fieldset>
    </>
  )
}

export default CVEditor
