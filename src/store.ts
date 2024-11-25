// chrome.storage.local

type StorageKey = "Twitter ID" | "Bluesky ID" | "Bluesky App Password"

function setStorage(key: StorageKey, value: string) {
  chrome.storage.local.set({ [key]: value })
}

function getStorage(key: StorageKey) {
  return chrome.storage.local.get(key)
}

export { setStorage, getStorage }