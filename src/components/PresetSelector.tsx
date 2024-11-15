import { useState, useEffect } from 'react'
import { storage, TimerPreset } from '../services/storage'

interface PresetSelectorProps {
  onSelect: (duration: number) => void;
}

export default function PresetSelector({ onSelect }: PresetSelectorProps) {
  const [presets, setPresets] = useState<TimerPreset[]>([])

  useEffect(() => {
    storage.getSettings().then(settings => setPresets(settings.presets))
  }, [])

  return (
    <div className="flex space-x-2 mb-4">
      {presets.map(preset => (
        <button
          key={preset.id}
          onClick={() => onSelect(preset.duration)}
          className="px-3 py-1 text-sm rounded-full bg-blue-100 
                     dark:bg-blue-900 hover:bg-blue-200 
                     dark:hover:bg-blue-800 transition-colors"
        >
          {preset.name}
        </button>
      ))}
    </div>
  )
} 