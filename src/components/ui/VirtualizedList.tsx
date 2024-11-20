import React, { useRef, useEffect, useState, memo, useCallback } from 'react'
import { useOptimization } from '../../hooks/useOptimization'

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight: number
  containerHeight: number
  overscan?: number
  onEndReached?: () => void
  endReachedThreshold?: number
  className?: string
}

export const VirtualizedList = memo(<T extends any>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 3,
  onEndReached,
  endReachedThreshold = 0.8,
  className = ''
}: VirtualizedListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  // Calculate visible range
  const totalHeight = items.length * itemHeight
  const visibleItems = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  )

  // Optimize scroll handler
  const { execute: handleScroll } = useOptimization(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement
      setScrollTop(target.scrollTop)

      // Check if end is reached
      if (onEndReached) {
        const scrolledPercentage = 
          (target.scrollTop + target.clientHeight) / target.scrollHeight
        if (scrolledPercentage >= endReachedThreshold) {
          onEndReached()
        }
      }
    },
    { debounceMs: 16 } // ~60fps
  )

  // Optimize scroll state management
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScrollStart = () => {
      setIsScrolling(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsScrolling(false), 150)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScrollStart)
      return () => {
        container.removeEventListener('scroll', handleScrollStart)
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Render only visible items
  const visibleItemsToRender = items
    .slice(startIndex, endIndex)
    .map((item, index) => (
      <div
        key={startIndex + index}
        style={{
          height: itemHeight,
          transform: `translateY(${(startIndex + index) * itemHeight}px)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transition: isScrolling ? 'none' : 'transform 0.2s'
        }}
      >
        {renderItem(item, startIndex + index)}
      </div>
    ))

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflow: 'auto', position: 'relative' }}
      className={className}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItemsToRender}
      </div>
    </div>
  )
})

VirtualizedList.displayName = 'VirtualizedList' 