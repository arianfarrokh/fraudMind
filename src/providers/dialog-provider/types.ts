export interface DialogProps {
    open: boolean;
    title: string;
    titleTextAlign?:"start" | "center" | "end"
    content: string | React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}