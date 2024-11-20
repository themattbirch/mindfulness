import { storage } from './storage'

export interface Goal {
  id: string
  type: 'daily' | 'weekly' | 'monthly'
  target: number
  metric: 'minutes' | 'sessions'
  progress: number
  completed: boolean
  createdAt: string
}

export interface Reminder {
  id: string
  time: string // HH:mm format
  days: number[] // 0-6 (Sunday-Saturday)
  enabled: boolean
  message?: string
}

class GoalsService {
  async getGoals(): Promise<Goal[]> {
    const goals = await storage.get('goals') || []
    return goals
  }

  async addGoal(goal: Omit<Goal, 'id' | 'progress' | 'completed' | 'createdAt'>): Promise<void> {
    const goals = await this.getGoals()
    const newGoal: Goal = {
      ...goal,
      id: crypto.randomUUID(),
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString()
    }
    await storage.set('goals', [...goals, newGoal])
  }

  async updateProgress(statistics: Statistics): Promise<Goal[]> {
    const goals = await this.getGoals()
    const updatedGoals = goals.map(goal => {
      const progress = this.calculateProgress(goal, statistics)
      return {
        ...goal,
        progress,
        completed: progress >= goal.target
      }
    })
    await storage.set('goals', updatedGoals)
    return updatedGoals.filter(goal => goal.completed)
  }

  private calculateProgress(goal: Goal, stats: Statistics): number {
    // Implementation based on goal type and metric
    return 0 // Placeholder
  }
}

export const goals = new GoalsService() 