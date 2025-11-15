import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default function ToastMessage({ message, type = 'success', state = 'top', viewDuration = 3000, direction = 'ltr', onClose }) {
    const [msg, setMsg] = useState(message);
    useEffect(() => {
        setMsg(message);
    }, [message]);
    const typeStyles = {
        success: 'bg-green-100 text-green-600 shadow-green-200',
        error: 'bg-red-100 text-red-600 shadow-red-200',
        warning: 'bg-yellow-100 text-yellow-600 shadow-yellow-200',
        info: 'bg-blue-100 text-blue-600 shadow-blue-200'
    };
    const positionMessage = {
        top: 'top-5',
        bottom: 'bottom-5',
        center: 'top-1/2 -translate-y-1/2'
    };
    useEffect(() => {
        if (!msg)
            return;
        const timer = setTimeout(() => {
            setMsg('');
            if (onClose)
                onClose();
        }, viewDuration);
        return () => clearTimeout(timer);
    }, [msg, viewDuration, onClose]);
    return (_jsx(AnimatePresence, { children: msg && (_jsx(motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -50 }, transition: { duration: 0.25 }, dir: direction, className: `
            fixed
            ${positionMessage[state]}
            left-1/2 transform -translate-x-1/2
            px-4 py-3 rounded-xl shadow-lg font-medium text-base z-50
            ${typeStyles[type]}
          `, children: msg })) }));
}
