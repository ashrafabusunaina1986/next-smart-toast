import React, { ReactNode } from 'react';
import { ToastType, ToastPosition } from './ToastMessage';
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
export declare const ToastContext: React.Context<ToastContextProps | undefined>;
export declare const ToastProvider: ({ children, maxQueue, overflowStrategy }: {
    children: ReactNode;
    maxQueue?: number;
    overflowStrategy?: QueueOverflowStrategy;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useToast: () => ToastContextProps;
export {};
