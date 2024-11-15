import { storage } from './services/storage'

chrome.runtime.onInstalled.addListener(() => {
  // Initialize default settings
  storage.getSettings()
})

// Handle alarm for notifications
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'mindfulness-reminder') {
    const settings = await storage.getSettings()
    
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Mindfulness Reminder',
      message: 'Time to take a mindful break!',
      buttons: [
        { title: 'Take Break' },
        { title: 'Snooze' }
      ],
      requireInteraction: true
    })
  }
})

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // Take Break
    chrome.runtime.sendMessage({ type: 'TAKE_BREAK' })
  } else {
    // Snooze
    chrome.alarms.create('mindfulness-reminder', {
      delayInMinutes: 5 // Snooze for 5 minutes
    })
  }
  
  chrome.notifications.clear(notificationId)
})

// Update timer state
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_TIMER') {
    storage.saveTimer(message.timer)
  }
  sendResponse({})
  return true
}) 