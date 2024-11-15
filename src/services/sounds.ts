export const sounds = {
  notification: new Audio(chrome.runtime.getURL('sounds/notification.mp3')),
  tick: new Audio(chrome.runtime.getURL('sounds/tick.mp3')),
  complete: new Audio(chrome.runtime.getURL('sounds/complete.mp3')),

  async play(sound: 'notification' | 'tick' | 'complete') {
    const settings = await storage.getSettings()
    const audio = this[sound]
    audio.volume = settings.volume
    await audio.play()
  }
} 