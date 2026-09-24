import { getBack4App } from './back4app'

async function getOwner() {
  const Parse = getBack4App()
  const current = await Parse.User.currentAsync()
  if (!current || (Parse.AnonymousUtils.isLinked(current) && !current.get('hasPasswordAccount'))) {
    throw new Error('Log in to access your CV.')
  }
  return current
}

export async function loadCV() {
  const Parse = getBack4App()
  const owner = await getOwner()
  return new Parse.Query('CV').equalTo('owner', owner).descending('updatedAt').first()
}

export async function saveCV(record, data) {
  const Parse = getBack4App()
  const owner = await getOwner()
  const cv = record || await loadCV() || new Parse.Object('CV')
  if (cv.id && cv.get('owner')?.id !== owner.id) {
    throw new Error('This CV belongs to another account.')
  }
  cv.setACL(new Parse.ACL(owner))
  cv.set('owner', owner)
  cv.set('generalInfo', data.generalInfo)
  cv.set('education', data.education)
  cv.set('experience', data.experience)
  return cv.save()
}
