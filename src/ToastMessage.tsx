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

  const typeStyles: Record<ToastType, string> = {
    success: 'background:#d1fae5;color:#065f46;',
    error: 'background:#fee2e2;color:#991b1b;',
    warning: 'background:#fef3c7;color:#78350f;',
    info: 'background:#dbeafe;color:#1e40af;'
  };

  const positionStyles: Record<ToastPosition, string> = {
    top: 'top:20px;',
    bottom: 'bottom:20px;',
    center: 'top:50%;transform:translateY(-50%);'
  };

  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => {
      setMsg('');
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [msg, duration, onClose]);

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.25 }}
          dir={direction}
          style={{
            position: 'fixed',
            left: '50%',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 9999,
            transform: 'translateX(-50%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            ...parseStyle(typeStyles[type]),
            ...parseStyle(positionStyles[position])
          }}
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper function لتحويل CSS string إلى object صالح لـ React.CSSProperties
function parseStyle(css: string): React.CSSProperties {
  const style: React.CSSProperties = {};
  css.split(';')
    .filter(Boolean)
    .forEach(line => {
      const [key, value] = line.split(':');
      if (key && value) {
        // حل مشكلة TS7053
        (style as any)[key.trim()] = value.trim();
      }
    });
  return style;
}
