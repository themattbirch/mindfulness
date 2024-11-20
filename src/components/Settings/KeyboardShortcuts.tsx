import React, { useState, useEffect } from 'react'
import { animations } from '../../utils/animations'

interface Shortcut {
  id: string
  action: string
  keys: string[]
  enabled: boolean
}

interface KeyboardShortcutsProps {
  shortcuts: Shortcut[]
  onUpdate: (shortcuts: Shortcut[]) => void
}

export function KeyboardShortcuts({ shortcuts, onUpdate }: KeyboardShortcutsProps) {
  const [recordingFor, setRecordingFor] = useState<string | null>(null)
  const [keys, setKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!recordingFor) return

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      setKeys(prev => new Set([...prev, e.key]))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.size > 0) {
        const newShortcuts = shortcuts.map(shortcut =>
          shortcut.id === recordingFor
            ? { ...shortcut, keys: Array.from(keys) }
            : shortcut
        )
        onUpdate(newShortcuts)
        setKeys(new Set())
        setRecordingFor(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [recordingFor, keys, shortcuts, onUpdate])

  return (
    <div className={`space-y-4 ${animations.fadeIn}`}>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Click 'Record' and press the desired key combination
      </div>

      <div className="space-y-2">
        {shortcuts.map(shortcut => (
          <div
            key={shortcut.id}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div>
              <div className="font-medium">{shortcut.action}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {shortcut.keys.join(' + ')}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={shortcut.enabled}
                  onChange={(e) => {
                    const newShortcuts = shortcuts.map(s =>
                      s.id === shortcut.id
                        ? { ...s, enabled: e.target.checked }
                        : s
                    )
                    onUpdate(newShortcuts)
                  }}
                  className="rounded"
                />
                <span className="text-sm">Enabled</span>
              </label>
              <button
                onClick={() => setRecordingFor(shortcut.id)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${recordingFor === shortcut.id
                    ? 'bg-blue-500 text-white'
                    : 'border hover:bg-gray-50'
                  }
                `}
              >
                {recordingFor === shortcut.id ? 'Recording...' : 'Record'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <h4 className="font-medium mb-2">Default Shortcuts</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Space: Start/Pause timer</li>
          <li>R: Reset timer</li>
          <li>F: Toggle focus mode</li>
          <li>S: Open settings</li>
          <li>Esc: Close modals</li>
        </ul>
      </div>
    </div>
  )
} 