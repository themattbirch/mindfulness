import React from 'react';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4 z-50">
      {toasts.map(({ id, title, description }) => (
        <div
          key={id}
          className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
        >
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm text-gray-500">{description}</div>}
        </div>
      ))}
    </div>
  );
} 