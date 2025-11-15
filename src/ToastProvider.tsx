
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

type QueueOverflowStrategy = 'reject' | 'drop-oldest' | 'drop-latest';

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({
  children,
  maxQueue = 5,
  overflowStrategy = 'drop-oldest'
}: {
  children: ReactNode;
  maxQueue?: number;
  overflowStrategy?: QueueOverflowStrategy;
}) => {

  const [queue, setQueue] = useState<ToastItem[]>([]);
  const [current, setCurrent] = useState<ToastItem | null>(null);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      setQueue(prev => {
        if (prev.length < maxQueue) {
          return [...prev, { ...toast, id: Date.now() }];
        }
        if (overflowStrategy === 'reject') {
          return prev;
        }
        if (overflowStrategy === 'drop-oldest') {
          return [...prev.slice(1), { ...toast, id: Date.now() }];
        }
        if (overflowStrategy === 'drop-latest') {
          return [...prev.slice(0, prev.length - 1), { ...toast, id: Date.now() }];
        }
        return prev;
      });
    },
    [maxQueue, overflowStrategy]
  );

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
          state={current.position}
          viewDuration={current.duration}
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
