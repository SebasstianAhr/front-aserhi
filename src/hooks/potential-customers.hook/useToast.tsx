import { useState } from 'react';

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');

  const showToastMessage = (message: string, variant: 'success' | 'danger') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return { showToast, toastMessage, toastVariant, showToastMessage };
};

export default useToast;
