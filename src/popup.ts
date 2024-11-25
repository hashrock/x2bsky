const twitterId = document.getElementById('twitterId') as HTMLInputElement
const blueskyId = document.getElementById('blueskyId') as HTMLInputElement
const blueskyAppPassword = document.getElementById('blueskyAppPassword') as HTMLInputElement

import { setStorage, getStorage } from './store'

twitterId.addEventListener('input', () => {
  setStorage('Twitter ID', twitterId.value)
})
blueskyId.addEventListener('input', () => {
  setStorage('Bluesky ID', blueskyId.value)
})
blueskyAppPassword.addEventListener('input', () => {
  setStorage('Bluesky App Password', blueskyAppPassword.value)
})

async function main() {
  const storage1 = await getStorage('Twitter ID')
  twitterId.value = storage1
  const storage2 = await getStorage('Bluesky ID')
  blueskyId.value = storage2
  const storage3 = await getStorage('Bluesky App Password')
  blueskyAppPassword.value = storage3
}

main()
