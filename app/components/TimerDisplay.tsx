import React from 'react';

function TimerDisplay({ time, isRunning }) {
  const progress = (time % 900) / 900 * 100; // Progress for 15 minutes cycle

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex justify-center items-center">
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
          strokeDasharray={565.48}
          strokeDashoffset={565.48 * ((100 - progress) / 100)}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="90"
          cx="96"
          cy="96"
        />
      </svg>
      <div className="absolute text-4xl font-bold tabular-nums transition-all duration-300 ease-in-out" aria-live="polite">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default TimerDisplay; 