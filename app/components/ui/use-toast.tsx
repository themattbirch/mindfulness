import { useState } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = (newToast) => {
    setToasts([...toasts, newToast]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.slice(1));
    }, newToast.duration || 3000);
  };

  return { toast, toasts };
}; 