import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';
export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ToastProps {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
  direction?: 'rtl' | 'ltr';
}

export default function ToastMessage({
  message,
  type = 'success',
  position = 'top',
  duration = 3000,
  direction = 'ltr',
  onClose
}: ToastProps) {
  const [msg, setMsg] = useState(message);

  useEffect(() => {
    setMsg(message);
  }, [message]);

  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => {
      setMsg('');
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [msg, duration, onClose]);

  const typeStyles: Record<ToastType, React.CSSProperties> = {
    success: { background: '#d1fae5', color: '#065f46' },
    error: { background: '#fee2e2', color: '#991b1b' },
    warning: { background: '#fef3c7', color: '#78350f' },
    info: { background: '#dbeafe', color: '#1e40af' }
  };

  // العنصر الأب يغطي الشاشة لتحديد الموضع
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems:
      position === 'center'
        ? 'center'
        : position === 'top'
        ? 'flex-start'
        : 'flex-end',
    paddingTop: position === 'top' ? '30px' : 0,
    paddingBottom: position === 'bottom' ? '30px' : 0,
    pointerEvents: 'none', // يسمح بالتفاعل مع باقي الصفحة
    zIndex: 9999
  };

  const toastStyle: React.CSSProperties = {
    display: 'inline-block', // فقط بالحجم الطبيعي للنص
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    ...typeStyles[type],
    pointerEvents: 'auto', // يسمح بالتفاعل مع الرسالة نفسها
    maxWidth: '90vw',
    textAlign: 'center'
  };

  if (!msg) return null;

  return (
    <div style={containerStyle}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: position === 'bottom' ? 50 : -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'bottom' ? 50 : -50 }}
          transition={{ duration: 0.25 }}
          dir={direction}
          style={toastStyle}
        >
          {msg}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
