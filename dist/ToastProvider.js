import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastMessage from './ToastMessage';
export const ToastContext = createContext(undefined);
export const ToastProvider = ({ children, maxQueue = 5, overflowStrategy = 'drop-oldest' }) => {
    const [queue, setQueue] = useState([]);
    const [current, setCurrent] = useState(null);
    const showToast = useCallback((toast) => {
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
    }, [maxQueue, overflowStrategy]);
    React.useEffect(() => {
        if (!current && queue.length > 0) {
            setCurrent(queue[0]);
            setQueue(prev => prev.slice(1));
        }
    }, [queue, current]);
    const handleClose = () => setCurrent(null);
    return (_jsxs(ToastContext.Provider, { value: { showToast }, children: [children, current && (_jsx(ToastMessage, { message: current.message, type: current.type, state: current.position, viewDuration: current.duration, direction: current.direction, onClose: handleClose }))] }));
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error('useToast must be used within ToastProvider');
    return context;
};
