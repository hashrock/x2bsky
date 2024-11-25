interface Tweet {
  text: string;
  author: string;
}
import { AtpAgent } from "@atproto/api";
import { getStorage } from "./store";

async function sendBluesky(tweet: Tweet) {
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });

  const storage = await getStorage("Bluesky ID");
  const storage2 = await getStorage("Bluesky App Password");
  await agent.login({
    identifier: await storage,
    password: await storage2,
  });

  return await agent.post({
    text: tweet.text,
  });
}

async function tweetToObj(): Promise<Tweet[]> {
  const result: Tweet[] = [];

  const articles = document.querySelectorAll('article[data-testid="tweet"]');
  for (const article of articles) {
    // data-testid="tweetText"
    const text = article.querySelector(
      '[data-testid="tweetText"]'
    )?.textContent;
    const spans = article.querySelectorAll("span");
    let author = "";
    for (const span of spans) {
      if (span.textContent?.startsWith("@")) {
        author = span.textContent?.slice(1);
      }
    }

    if (author === (await getStorage("Twitter ID"))) {
      // data-testid="bookmark"
      const bookmark = article.querySelector('[data-testid="bookmark"]');
      // append button after bookmark
      if (bookmark?.nextElementSibling?.classList.contains("sendBluesky")) {
        // already has button
      } else {
        const button = document.createElement("button");
        button.style.backgroundColor = "transparent";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.classList.add("sendBluesky");
        button.textContent = "🦋";

        button.addEventListener("click", async () => {
          const storage = await getStorage("Bluesky ID");
          const storage2 = await getStorage("Bluesky App Password");

          if (!storage || !storage2) {
            alert("Please set Bluesky ID and Bluesky App Password");
            return;
          }

          if (text) {
            try {
              const result = await sendBluesky({
                text: text,
                author: author,
              });
              if (result) {
                console.log(result);
                button.textContent = "✅Saved";
              }
            } catch (error) {
              console.error(error);
            }
          }
        });
        bookmark?.after(button);
      }
    }

    // find span with start with @
    if (text && author) {
      result.push({ text, author });
    }
  }
  return result;
}

let documentHeight = document.documentElement.scrollHeight;

function checkDocumentHeightChange() {
  const newDocumentHeight = document.documentElement.scrollHeight;
  if (newDocumentHeight !== documentHeight) {
    documentHeight = newDocumentHeight;
    return true;
  }
  return false;
}

setInterval(() => {
  if (checkDocumentHeightChange()) {
    onDocumentHeightChange();
  }
}, 1000);

async function onDocumentHeightChange() {
  await tweetToObj();
}
