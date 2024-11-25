interface Tweet {
  text: string
  author: string
}

function tweetToObj() : Tweet[] {
  const result: Tweet[] = []

  const articles = document.querySelectorAll('article[data-testid="tweet"]')
  for (const article of articles) {
    // data-testid="tweetText"
    const text = article.querySelector('[data-testid="tweetText"]')?.textContent
    const spans = article.querySelectorAll('span')
    let author = ''
    for (const span of spans) {
      if (span.textContent?.startsWith('@')) {
        author = span.textContent
      }
    }

    if(author === "@hashedrock") {
      // data-testid="bookmark"
      const bookmark = article.querySelector('[data-testid="bookmark"]')
      // append button after bookmark
      if (bookmark?.nextElementSibling?.classList.contains('sendBluesky')) {
        // already has button
      } else{
        const button = document.createElement('button')
        button.classList.add('sendBluesky')
        button.textContent = 'Save'
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



function onDocumentHeightChange() {
  const tweets = tweetToObj()
  console.log(tweets);
}


// // document.addEventListener('DOMContentLoaded', removeAllArticles);
// setTimeout(() => {
//   const tweets = tweetToObj()
//   console.log(tweets);
//   // removeAllArticles()e
// }, 4000);

console.log('content script loaded');