import { useCallback, useRef, useEffect, useMemo, useState } from 'react'

interface UseOptimizationOptions {
  debounceMs?: number
  memoizeDeps?: any[]
  cacheSize?: number
}

export function useOptimization<T extends (...args: any[]) => any>(
  callback: T,
  options: UseOptimizationOptions = {}
) {
  const {
    debounceMs = 0,
    memoizeDeps = [],
    cacheSize = 10
  } = options

  // Debouncing
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastArgsRef = useRef<Parameters<T>>()

  // Caching
  const cacheRef = useRef<Map<string, ReturnType<T>>>(new Map())
  const [cacheHits, setCacheHits] = useState(0)

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Cache management
  const manageCache = useCallback((key: string, value: ReturnType<T>) => {
    if (cacheRef.current.size >= cacheSize) {
      const firstKey = cacheRef.current.keys().next().value
      cacheRef.current.delete(firstKey)
    }
    cacheRef.current.set(key, value)
  }, [cacheSize])

  // Memoized callback with caching
  const optimizedCallback = useCallback((...args: Parameters<T>) => {
    // Generate cache key
    const cacheKey = JSON.stringify(args)

    // Check cache
    if (cacheRef.current.has(cacheKey)) {
      setCacheHits(prev => prev + 1)
      return cacheRef.current.get(cacheKey)
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Store current args
    lastArgsRef.current = args

    // Debounce execution
    return new Promise<ReturnType<T>>((resolve) => {
      timeoutRef.current = setTimeout(async () => {
        if (lastArgsRef.current === args) {
          const result = await callback(...args)
          manageCache(cacheKey, result)
          resolve(result)
        }
      }, debounceMs)
    })
  }, [callback, debounceMs, manageCache, ...memoizeDeps])

  const stats = useMemo(() => ({
    cacheSize: cacheRef.current.size,
    cacheHits,
    maxCacheSize: cacheSize
  }), [cacheHits, cacheSize])

  return {
    execute: optimizedCallback,
    stats,
    clearCache: () => {
      cacheRef.current.clear()
      setCacheHits(0)
    }
  }
} 