import { useState, useEffect } from 'react'
import { storage } from '../services/storage'

interface Session {
  date: string;
  duration: number;
  completed: boolean;
}

export default function SessionHistory() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all')

  useEffect(() => {
    storage.getSessionHistory().then(setSessions)
  }, [])

  const filteredSessions = sessions.filter(session => {
    if (filter === 'completed') return session.completed
    if (filter === 'incomplete') return !session.completed
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Session History</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="px-2 py-1 rounded border"
        >
          <option value="all">All Sessions</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredSessions.map((session, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-lg ${session.completed 
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-red-50 dark:bg-red-900/20'
              }
            `}
          >
            <div className="flex justify-between">
              <span>{new Date(session.date).toLocaleDateString()}</span>
              <span>{Math.floor(session.duration / 60)} minutes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 