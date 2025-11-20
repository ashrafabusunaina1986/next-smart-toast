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
export declare const ToastContext: React.Context<ToastContextProps | undefined>;
export declare const ToastProvider: ({ children, maxQueue }: {
    children: ReactNode;
    maxQueue?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useToast: () => ToastContextProps;
export {};
