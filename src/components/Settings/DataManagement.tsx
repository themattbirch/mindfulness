import React, { useState, useRef } from 'react'
import { animations } from '../../utils/animations'
import { useToast } from '../ui/toast'
import { dataManagement } from '../../services/dataManagement'

export function DataManagement() {
  const [backups, setBackups] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  React.useEffect(() => {
    loadBackups()
  }, [])

  const loadBackups = async () => {
    const backupList = await dataManagement.getBackups()
    setBackups(backupList)
  }

  const handleExport = async () => {
    try {
      setLoading(true)
      const url = await dataManagement.exportData()
      
      // Create download link
      const a = document.createElement('a')
      a.href = url
      a.download = `mindfulness-data-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Export Successful',
        message: 'Your data has been exported successfully',
        type: 'success'
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        message: 'Failed to export data. Please try again.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      await dataManagement.importData(file)
      toast({
        title: 'Import Successful',
        message: 'Your data has been imported successfully',
        type: 'success'
      })
      await loadBackups()
    } catch (error) {
      toast({
        title: 'Import Failed',
        message: 'Failed to import data. Please check the file format.',
        type: 'error'
      })
    } finally {
      setLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRestore = async (backupId: string) => {
    try {
      setLoading(true)
      await dataManagement.restoreBackup(backupId)
      toast({
        title: 'Restore Successful',
        message: 'Your backup has been restored successfully',
        type: 'success'
      })
    } catch (error) {
      toast({
        title: 'Restore Failed',
        message: 'Failed to restore backup. Please try again.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`space-y-6 ${animations.fadeIn}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Data Management</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export Data
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="px-3 py-1 text-sm border border-blue-500 text-blue-500 
              rounded-md hover:bg-blue-50 disabled:opacity-50 
              disabled:cursor-not-allowed"
          >
            Import Data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Backups</h3>
        {backups.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No backups available
          </p>
        ) : (
          <div className="space-y-2">
            {backups.map(backupId => (
              <div
                key={backupId}
                className="flex items-center justify-between p-3 
                  border rounded-md hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">
                    {new Date(backupId.split('_')[1]).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Backup ID: {backupId}
                  </div>
                </div>
                <button
                  onClick={() => handleRestore(backupId)}
                  disabled={loading}
                  className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 
                    rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <h4 className="font-medium mb-2">About Data Management</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Export your data to create a backup</li>
          <li>Import previously exported data</li>
          <li>Automatic backups are created before imports</li>
          <li>Restore previous backups if needed</li>
        </ul>
      </div>
    </div>
  )
} 