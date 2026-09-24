import Parse from 'parse'

const applicationId = import.meta.env.VITE_BACK4APP_APPLICATION_ID
const javascriptKey = import.meta.env.VITE_BACK4APP_JAVASCRIPT_KEY

export const isBack4AppConfigured = Boolean(applicationId && javascriptKey)

if (isBack4AppConfigured) {
  Parse.initialize(applicationId, javascriptKey)
  Parse.serverURL = import.meta.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com/'
}

export function getBack4App() {
  if (!isBack4AppConfigured) {
    throw new Error('Set the Back4App Application ID and JavaScript Key in .env.local, then restart Vite.')
  }

  return Parse
}
