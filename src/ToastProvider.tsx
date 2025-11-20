import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import ToastMessage, { ToastType, ToastPosition } from './ToastMessage';

export interface ToastItem {
  id: number;
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  direction?: 'rtl' | 'ltr';
}

interface ToastContextProps {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({
  children,
  maxQueue = 5
}: {
  children: ReactNode;
  maxQueue?: number;
}) => {
  const [queue, setQueue] = useState<ToastItem[]>([]);
  const [current, setCurrent] = useState<ToastItem | null>(null);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    setQueue(prev => [...prev, { ...toast, id: Date.now() }].slice(-maxQueue));
  }, [maxQueue]);

  React.useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [queue, current]);

  const handleClose = () => setCurrent(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {current && (
        <ToastMessage
          message={current.message}
          type={current.type}
          position={current.position}
          duration={current.duration}
          direction={current.direction}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
