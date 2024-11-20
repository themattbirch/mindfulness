interface PerformanceMetrics {
  componentRenders: Map<string, number>
  timeToFirstPaint: number | null
  timeToFirstContentfulPaint: number | null
  largestContentfulPaint: number | null
  firstInputDelay: number | null
  cumulativeLayoutShift: number | null
  longTasks: Performance[]
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    componentRenders: new Map(),
    timeToFirstPaint: null,
    timeToFirstContentfulPaint: null,
    largestContentfulPaint: null,
    firstInputDelay: null,
    cumulativeLayoutShift: null,
    longTasks: []
  }

  private observers: Set<(metrics: PerformanceMetrics) => void> = new Set()

  constructor() {
    this.initializeObservers()
  }

  private initializeObservers() {
    // Performance Observer for Long Tasks
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        this.metrics.longTasks = [...this.metrics.longTasks, ...entries]
        this.notifyObservers()
      })

      longTaskObserver.observe({ entryTypes: ['longtask'] })

      // Core Web Vitals
      const webVitalsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-paint') {
                this.metrics.timeToFirstPaint = entry.startTime
              } else if (entry.name === 'first-contentful-paint') {
                this.metrics.timeToFirstContentfulPaint = entry.startTime
              }
              break
            case 'largest-contentful-paint':
              this.metrics.largestContentfulPaint = entry.startTime
              break
            case 'first-input':
              this.metrics.firstInputDelay = entry.processingStart - entry.startTime
              break
            case 'layout-shift':
              if (!this.metrics.cumulativeLayoutShift) {
                this.metrics.cumulativeLayoutShift = 0
              }
              this.metrics.cumulativeLayoutShift += (entry as any).value
              break
          }
          this.notifyObservers()
        })
      })

      webVitalsObserver.observe({ 
        entryTypes: [
          'paint',
          'largest-contentful-paint',
          'first-input',
          'layout-shift'
        ]
      })
    }
  }

  public trackComponentRender(componentName: string) {
    const current = this.metrics.componentRenders.get(componentName) || 0
    this.metrics.componentRenders.set(componentName, current + 1)
    this.notifyObservers()
  }

  public subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.observers.add(callback)
    return () => this.observers.delete(callback)
  }

  private notifyObservers() {
    this.observers.forEach(callback => callback(this.metrics))
  }

  public getMetrics() {
    return this.metrics
  }
}

export const performanceMonitor = new PerformanceMonitor() 