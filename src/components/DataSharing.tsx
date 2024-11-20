import { useState, useEffect } from 'react'
import { animations } from '../utils/animations'
import { useToast } from './ui/toast'
import { dataManagement } from '../services/dataManagement'
import { Settings, Statistics, Achievements, Theme } from '../types/data'

interface ShareOptions {
  settings: boolean
  statistics: boolean
  achievements: boolean
  themes: boolean
}

interface ExportData {
  settings?: Settings
  statistics?: Statistics
  achievements?: Achievements
  themes?: Theme[]
}

export function DataSharing() {
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    settings: false,
    statistics: false,
    achievements: false,
    themes: false
  })
  const [shareableLink, setShareableLink] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [userData, setUserData] = useState<{
    settings?: Settings
    statistics?: Statistics
    achievements?: Achievements
    themes?: Theme[]
  }>({})
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsInitialLoading(true)
        const [settings, statistics, achievements, themes] = await Promise.all([
          dataManagement.getSettings(),
          dataManagement.getStatistics(),
          dataManagement.getAchievements(),
          dataManagement.getThemes()
        ])

        setUserData({
          settings,
          statistics,
          achievements,
          themes
        })
      } catch (error) {
        toast({
          title: 'Error',
          message: 'Failed to load user data',
          type: 'error'
        })
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchUserData()
  }, [toast])

  if (isInitialLoading) {
    return (
      <div className={`space-y-6 ${animations.fadeIn}`}>
        <h2 className="text-xl font-bold">Share Your Data</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"
              />
            ))}
          </div>
          <div className="h-10 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    if (!Object.values(shareOptions).some(Boolean)) {
      toast({
        title: 'Selection Required',
        message: 'Please select at least one item to share',
        type: 'error'
      })
      return
    }

    try {
      setLoading(true)
      const exportData: ExportData = {
        ...(shareOptions.settings && { settings: userData.settings }),
        ...(shareOptions.statistics && { statistics: userData.statistics }),
        ...(shareOptions.achievements && { achievements: userData.achievements }),
        ...(shareOptions.themes && { themes: userData.themes })
      }

      const link = await dataManagement.shareData(exportData)
      setShareableLink(link)
      
      toast({
        title: 'Share Link Generated',
        message: 'Your shareable link has been generated',
        type: 'success'
      })
    } catch (error) {
      toast({
        title: 'Share Failed',
        message: 'Failed to generate share link. Please try again.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      toast({
        title: 'Copied',
        message: 'Link copied to clipboard',
        type: 'success'
      })
    } catch (error) {
      toast({
        title: 'Copy Failed',
        message: 'Failed to copy link. Please try manually.',
        type: 'error'
      })
    }
  }

  return (
    <div className={`space-y-6 ${animations.fadeIn}`}>
      <h2 className="text-xl font-bold">Share Your Data</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(shareOptions).map(([key, value]) => (
            <label
              key={key}
              className={`flex items-center gap-2 p-3 border rounded-md
                hover:bg-gray-50 cursor-pointer
                ${!userData[key as keyof typeof userData] ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setShareOptions(prev => ({
                  ...prev,
                  [key]: e.target.checked
                }))}
                disabled={!userData[key as keyof typeof userData]}
                className="rounded"
              />
              <div>
                <div className="font-medium capitalize">{key}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {userData[key as keyof typeof userData] 
                    ? `Share your ${key.toLowerCase()}`
                    : `No ${key.toLowerCase()} data available`}
                </div>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleShare}
          disabled={loading || !Object.values(shareOptions).some(Boolean)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-blue-600 transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Link...
            </span>
          ) : (
            'Generate Share Link'
          )}
        </button>

        {shareableLink && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md animate-fadeIn">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 
                  border rounded-md"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 text-sm text-blue-500 hover:bg-blue-50
                  rounded-md transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 