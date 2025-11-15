import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type ToastType = 'success' | 'info' | 'warning' | 'error';
type ToastPosition = 'top' | 'bottom' | 'center';
interface ToastProps {
    message: string;
    type?: ToastType;
    state?: ToastPosition;
    viewDuration?: number;
    onClose?: () => void;
    direction?: 'rtl' | 'ltr';
}
declare function ToastMessage({ message, type, state, viewDuration, direction, onClose }: ToastProps): react_jsx_runtime.JSX.Element;

interface ToastItem {
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
declare const ToastProvider: ({ children, maxQueue, overflowStrategy }: {
    children: ReactNode;
    maxQueue?: number;
    overflowStrategy?: QueueOverflowStrategy;
}) => react_jsx_runtime.JSX.Element;
declare const useToast: () => ToastContextProps;

export { ToastMessage, ToastProvider, useToast };
export type { ToastPosition, ToastProps, ToastType };
