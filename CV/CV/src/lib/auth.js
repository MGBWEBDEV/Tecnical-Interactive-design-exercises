import { getBack4App } from './back4app'

export async function getSession() {
  return getBack4App().User.currentAsync()
}

export function isAnonymous(user) {
  return Boolean(user && getBack4App().AnonymousUtils.isLinked(user) && !user.get('hasPasswordAccount'))
}

export async function signUp(username, password) {
  const Parse = getBack4App()
  const current = await getSession()
  const user = isAnonymous(current) ? current : new Parse.User()
  if (current && !isAnonymous(current)) throw new Error('Log out before creating another account.')
  const previousUsername = user.getUsername()
  try {
    return await user.signUp({ username: username.trim(), password, hasPasswordAccount: true })
  } catch (error) {
    if (previousUsername) user.set('username', previousUsername)
    user.unset('hasPasswordAccount')
    user.unset('password')
    throw error
  }
}

export function logIn(username, password) {
  return getBack4App().User.logIn(username.trim(), password)
}

export function logOut() {
  return getBack4App().User.logOut()
}
