interface CircularProgressProps {
  progress: number;
}

export function CircularProgress({ progress }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 90; // radius = 90

  return (
    <svg className="w-48 h-48 transform -rotate-90">
      <circle
        className="text-gray-200"
        strokeWidth="4"
        stroke="currentColor"
        fill="transparent"
        r="90"
        cx="96"
        cy="96"
      />
      <circle
        className="text-blue-600 transition-all duration-300 ease-in-out"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * ((100 - progress) / 100)}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="90"
        cx="96"
        cy="96"
      />
    </svg>
  )
} 