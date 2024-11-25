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
  console.log(storage1)
  twitterId.value = storage1
  const storage2 = await getStorage('Bluesky ID')
  console.log(storage2)
  blueskyId.value = storage2
  const storage3 = await getStorage('Bluesky App Password')
  console.log(storage3)
  blueskyAppPassword.value = storage3
}

main()
