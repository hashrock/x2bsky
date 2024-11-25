// chrome.storage.local
type StorageKey = "Twitter ID" | "Bluesky ID" | "Bluesky App Password"

function setStorage(key: StorageKey, value: string) {
  chrome.storage.local.set({ [key]: value })
}

async function getStorage(key: StorageKey): Promise<string> {
  return (await chrome.storage.local.get(key))[key]
}

export { setStorage, getStorage }