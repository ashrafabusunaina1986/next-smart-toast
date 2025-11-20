import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastMessage from './ToastMessage';
export const ToastContext = createContext(undefined);
export const ToastProvider = ({ children, maxQueue = 5 }) => {
    const [queue, setQueue] = useState([]);
    const [current, setCurrent] = useState(null);
    const showToast = useCallback((toast) => {
        setQueue(prev => [...prev, Object.assign(Object.assign({}, toast), { id: Date.now() })].slice(-maxQueue));
    }, [maxQueue]);
    React.useEffect(() => {
        if (!current && queue.length > 0) {
            setCurrent(queue[0]);
            setQueue(prev => prev.slice(1));
        }
    }, [queue, current]);
    const handleClose = () => setCurrent(null);
    return (_jsxs(ToastContext.Provider, { value: { showToast }, children: [children, current && (_jsx(ToastMessage, { message: current.message, type: current.type, position: current.position, duration: current.duration, direction: current.direction, onClose: handleClose }))] }));
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error('useToast must be used within ToastProvider');
    return context;
};
