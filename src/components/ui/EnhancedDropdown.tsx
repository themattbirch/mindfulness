import React, { useState, useRef, useEffect, memo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useOptimization } from '../../hooks/useOptimization'
import { enhancedAnimations } from '../../utils/enhancedAnimations'
import { performanceMonitor } from '../../utils/performance'

interface DropdownOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface EnhancedDropdownProps {
  options: DropdownOption[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  searchable?: boolean
  virtualized?: boolean
  loading?: boolean
  error?: string
  placeholder?: string
  className?: string
  maxHeight?: number
  disabled?: boolean
}

export const EnhancedDropdown = memo(({
  options,
  value,
  onChange,
  multiple = false,
  searchable = false,
  virtualized = false,
  loading = false,
  error,
  placeholder = 'Select...',
  className = '',
  maxHeight = 300,
  disabled = false
}: EnhancedDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Performance tracking
  useEffect(() => {
    performanceMonitor.trackComponentRender('EnhancedDropdown')
  })

  // Optimized search
  const { execute: filterOptions } = useOptimization(
    (query: string) => {
      return options.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase()) ||
        option.description?.toLowerCase().includes(query.toLowerCase())
      )
    },
    { debounceMs: 150, cacheSize: 20 }
  )

  const filteredOptions = searchable ? filterOptions(searchQuery) : options

  // Virtualization for large lists
  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => dropdownRef.current,
    estimateSize: () => 40,
    overscan: 5
  })

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        setIsOpen(prev => !prev)
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        if (!isOpen) setIsOpen(true)
        break
    }
  }

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const values = Array.isArray(value) ? value : []
      const newValue = values.includes(optionValue)
        ? values.filter(v => v !== optionValue)
        : [...values, optionValue]
      onChange(newValue)
    } else {
      onChange(optionValue)
      setIsOpen(false)
    }
  }

  const renderOption = (option: DropdownOption) => (
    <div
      key={option.value}
      className={`
        px-4 py-2 cursor-pointer flex items-center gap-2
        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
        ${Array.isArray(value) 
          ? value.includes(option.value) 
          : value === option.value 
            ? 'bg-blue-50 dark:bg-blue-900/20' 
            : ''
        }
      `}
      onClick={() => !option.disabled && handleOptionClick(option.value)}
    >
      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{option.label}</div>
        {option.description && (
          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {option.description}
          </div>
        )}
      </div>
      {Array.isArray(value) && value.includes(option.value) && (
        <span className="text-blue-500">✓</span>
      )}
    </div>
  )

  return (
    <div className={`relative ${className}`}>
      <div
        ref={dropdownRef}
        className={`
          w-full border rounded-md shadow-sm
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full outline-none bg-transparent"
              placeholder="Search..."
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className={!value ? 'text-gray-500' : ''}>
              {multiple
                ? (value as string[]).map(v => 
                    options.find(o => o.value === v)?.label
                  ).join(', ') || placeholder
                : options.find(o => o.value === value)?.label || placeholder
              }
            </span>
          )}
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {isOpen && (
        <div
          className={`
            absolute z-50 w-full mt-1 bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700 rounded-md shadow-lg
            ${enhancedAnimations.slideInFromTop}
          `}
          style={{ maxHeight }}
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No options found</div>
          ) : virtualized ? (
            <div
              ref={dropdownRef}
              style={{
                height: Math.min(maxHeight, filteredOptions.length * 40),
                overflow: 'auto'
              }}
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative'
                }}
              >
                {rowVirtualizer.getVirtualItems().map(virtualRow => (
                  <div
                    key={virtualRow.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`
                    }}
                  >
                    {renderOption(filteredOptions[virtualRow.index])}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ maxHeight, overflow: 'auto' }}>
              {filteredOptions.map(renderOption)}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-1 text-sm text-red-500">{error}</div>
      )}
    </div>
  )
})

EnhancedDropdown.displayName = 'EnhancedDropdown' 