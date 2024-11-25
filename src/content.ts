interface Tweet {
  text: string
  author: string
}
import { AtpAgent } from '@atproto/api'
import { getStorage } from './store'

const agent = new AtpAgent({
  service: 'https://bsky.social',
})
const storage = await getStorage('Bluesky ID')
const storage2 = await getStorage('Bluesky App Password')
await agent.login({
  identifier: await storage,
  password: await storage2,
})

async function sendBluesky(tweet: Tweet) {
  return await agent.post({
    text: tweet.text,
  })
}


async function tweetToObj() : Promise<Tweet[]> {
  const result: Tweet[] = []

  const articles = document.querySelectorAll('article[data-testid="tweet"]')
  for (const article of articles) {
    // data-testid="tweetText"
    const text = article.querySelector('[data-testid="tweetText"]')?.textContent
    const spans = article.querySelectorAll('span')
    let author = ''
    for (const span of spans) {
      if (span.textContent?.startsWith('@')) {
        author = span.textContent?.slice(1)
      }
    }

    if(author === await getStorage('Twitter ID')) {
      // data-testid="bookmark"
      const bookmark = article.querySelector('[data-testid="bookmark"]')
      // append button after bookmark
      if (bookmark?.nextElementSibling?.classList.contains('sendBluesky')) {
        // already has button
      } else{
        const button = document.createElement('button')
        button.classList.add('sendBluesky')
        button.textContent = 'bsky'
        button.addEventListener('click', async () => {
          if (text) {
            const result = await sendBluesky({
              text: text ,
              author: author,
            })
            if(result) {
              button.textContent = '✅Saved'
            }
          }
        })
        bookmark?.after(button)
      }
    }

    // find span with start with @
    if (text && author) {
      result.push({ text, author })
    }
  }
  return result

}

let documentHeight = document.documentElement.scrollHeight


function checkDocumentHeightChange() {
  const newDocumentHeight = document.documentElement.scrollHeight
  if (newDocumentHeight !== documentHeight) {
    documentHeight = newDocumentHeight
    return true
  }
  return false
}

setInterval(() => {
  if (checkDocumentHeightChange()) {
    onDocumentHeightChange()
  }
}, 1000)



async function onDocumentHeightChange() {
  const tweets = await tweetToObj()
  console.log(tweets);
}


// // document.addEventListener('DOMContentLoaded', removeAllArticles);
// setTimeout(() => {
//   const tweets = tweetToObj()
//   console.log(tweets);
//   // removeAllArticles()e
// }, 4000);

console.log('content script loaded');