import React from 'react';
import { useToast } from './use-toast';

export const Toaster: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-2">
      {toasts.map((toast, index) => (
        <div key={index} className="bg-gray-800 text-white p-3 rounded">
          <strong>{toast.title}</strong>
          <p>{toast.description}</p>
          {toast.action}
        </div>
      ))}
    </div>
  );
}; 