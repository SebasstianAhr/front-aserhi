export interface ToastProps {
  variantAlert: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  show: boolean;
}