// Remove unused React import
// import React from 'react'

interface CircularProgressProps {
  progress: number
}

export function CircularProgress({ progress }: CircularProgressProps) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <svg className="w-32 h-32 transform -rotate-90">
      <circle
        className="stroke-gray-200"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx="64"
        cy="64"
      />
      <circle
        className="stroke-primary transition-all duration-300 ease-in-out"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx="64"
        cy="64"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  )
} 