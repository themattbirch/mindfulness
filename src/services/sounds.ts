const SOUND_FILES = {
  notification: "sounds/gentle-bell.mp3",
  success: "sounds/success.mp3",
  error: "sounds/error.mp3"
}

type SoundType = keyof typeof SOUND_FILES

class SoundService {
  private audio: HTMLAudioElement | null = null

  async play(type: SoundType) {
    try {
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
      }

      this.audio = new Audio(SOUND_FILES[type])
      await this.audio.play()
    } catch (error) {
      console.error('Failed to play sound:', error)
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }
}

export const sounds = new SoundService() 