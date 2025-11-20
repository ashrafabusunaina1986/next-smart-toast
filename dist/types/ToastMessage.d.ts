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
export default function ToastMessage({ message, type, position, duration, direction, onClose }: ToastProps): import("react/jsx-runtime").JSX.Element | null;
