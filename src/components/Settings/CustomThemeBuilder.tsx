import React, { useState, useEffect } from 'react'
import { animations } from '../../utils/animations'
import { useToast } from '../ui/toast'

interface CustomTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    error: string
    warning: string
  }
  fonts: {
    body: string
    heading: string
  }
  borderRadius: string
  shadows: {
    small: string
    medium: string
    large: string
  }
}

interface CustomThemeBuilderProps {
  currentTheme: CustomTheme
  onUpdate: (theme: CustomTheme) => void
  onSave: (theme: CustomTheme) => void
}

export function CustomThemeBuilder({ 
  currentTheme, 
  onUpdate, 
  onSave 
}: CustomThemeBuilderProps) {
  const [theme, setTheme] = useState(currentTheme)
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light')
  const { toast } = useToast()

  const updateColor = (key: keyof CustomTheme['colors'], value: string) => {
    setTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value }
    }))
  }

  const updateFont = (key: keyof CustomTheme['fonts'], value: string) => {
    setTheme(prev => ({
      ...prev,
      fonts: { ...prev.fonts, [key]: value }
    }))
  }

  const handleSave = () => {
    onSave(theme)
    toast({
      title: 'Theme Saved',
      message: 'Your custom theme has been saved successfully',
      type: 'success'
    })
  }

  const previewStyles = {
    '--primary': theme.colors.primary,
    '--secondary': theme.colors.secondary,
    '--background': theme.colors.background,
    '--surface': theme.colors.surface,
    '--text': theme.colors.text,
    '--text-secondary': theme.colors.textSecondary,
    '--border': theme.colors.border,
    '--success': theme.colors.success,
    '--error': theme.colors.error,
    '--warning': theme.colors.warning,
    '--font-body': theme.fonts.body,
    '--font-heading': theme.fonts.heading,
    '--border-radius': theme.borderRadius,
  } as React.CSSProperties

  return (
    <div className={`space-y-6 ${animations.fadeIn}`}>
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={theme.name}
          onChange={(e) => setTheme(prev => ({ ...prev, name: e.target.value }))}
          className="text-xl font-bold bg-transparent border-b-2 border-transparent 
            focus:border-blue-500 outline-none"
          placeholder="Theme Name"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(prev => prev === 'light' ? 'dark' : 'light')}
            className="px-3 py-1 text-sm border rounded-md"
          >
            Toggle Preview Mode
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
          >
            Save Theme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Colors</h3>
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <label className="text-sm w-32">{key}</label>
              <input
                type="color"
                value={value}
                onChange={(e) => updateColor(key as keyof CustomTheme['colors'], e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateColor(key as keyof CustomTheme['colors'], e.target.value)}
                className="flex-1 px-2 py-1 text-sm border rounded"
              />
            </div>
          ))}

          <h3 className="font-medium mt-6">Typography</h3>
          {Object.entries(theme.fonts).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <label className="text-sm w-32">{key}</label>
              <select
                value={value}
                onChange={(e) => updateFont(key as keyof CustomTheme['fonts'], e.target.value)}
                className="flex-1 px-2 py-1 text-sm border rounded"
              >
                <option value="system-ui">System UI</option>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          ))}

          <h3 className="font-medium mt-6">Border Radius</h3>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="20"
              value={parseInt(theme.borderRadius)}
              onChange={(e) => setTheme(prev => ({
                ...prev,
                borderRadius: `${e.target.value}px`
              }))}
              className="flex-1"
            />
            <span className="text-sm w-16">{theme.borderRadius}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Preview</h3>
          <div 
            className={`p-6 rounded-lg ${previewMode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
            style={previewStyles}
          >
            {/* Preview content */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading">Sample Heading</h4>
              <p className="font-body">This is sample text to preview the theme.</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-[var(--primary)] text-white rounded">
                  Primary Button
                </button>
                <button className="px-3 py-1 bg-[var(--secondary)] text-white rounded">
                  Secondary Button
                </button>
              </div>
              <div className="p-4 bg-[var(--surface)] rounded border border-[var(--border)]">
                <p className="text-[var(--text)]">Surface Content</p>
                <p className="text-[var(--text-secondary)]">Secondary Text</p>
              </div>
              <div className="flex gap-2">
                <div className="p-2 bg-[var(--success)] text-white rounded">Success</div>
                <div className="p-2 bg-[var(--error)] text-white rounded">Error</div>
                <div className="p-2 bg-[var(--warning)] text-white rounded">Warning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 