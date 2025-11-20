import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default function ToastMessage({ message, type = 'success', position = 'top', duration = 3000, direction = 'ltr', onClose }) {
    const [msg, setMsg] = useState(message);
    useEffect(() => {
        setMsg(message);
    }, [message]);
    useEffect(() => {
        if (!msg)
            return;
        const timer = setTimeout(() => {
            setMsg('');
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [msg, duration, onClose]);
    const typeStyles = {
        success: { background: '#d1fae5', color: '#065f46' },
        error: { background: '#fee2e2', color: '#991b1b' },
        warning: { background: '#fef3c7', color: '#78350f' },
        info: { background: '#dbeafe', color: '#1e40af' }
    };
    // العنصر الأب يغطي الشاشة لتحديد الموضع
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: position === 'center'
            ? 'center'
            : position === 'top'
                ? 'flex-start'
                : 'flex-end',
        paddingTop: position === 'top' ? '30px' : 0,
        paddingBottom: position === 'bottom' ? '30px' : 0,
        pointerEvents: 'none', // يسمح بالتفاعل مع باقي الصفحة
        zIndex: 9999
    };
    const toastStyle = Object.assign(Object.assign({ display: 'inline-block', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }, typeStyles[type]), { pointerEvents: 'auto', maxWidth: '90vw', textAlign: 'center' });
    if (!msg)
        return null;
    return (_jsx("div", { style: containerStyle, children: _jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0, y: position === 'bottom' ? 50 : -50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: position === 'bottom' ? 50 : -50 }, transition: { duration: 0.25 }, dir: direction, style: toastStyle, children: msg }) }) }));
}
