'use client';

import * as React from 'react';
import { Toaster, toast as hotToast, ToastOptions } from 'react-hot-toast';

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'toast-luxury',
        style: {
          background: 'var(--ivory)',
          color: 'var(--noir)',
          border: '1px solid rgba(140, 123, 107, 0.2)', // mink/20
          borderRadius: '2px',
          padding: '16px 20px',
          fontFamily: 'Raleway, sans-serif',
          fontSize: '14px',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
        },
        success: {
          iconTheme: {
            primary: 'var(--gold)',
            secondary: 'var(--ivory)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ba1a1a', // error
            secondary: 'var(--ivory)',
          },
        },
      }}
    />
  );
};

// Export wrapper for toast to use elsewhere easily
export const toast = {
  success: (message: string, options?: ToastOptions) => hotToast.success(message, options),
  error: (message: string, options?: ToastOptions) => hotToast.error(message, options),
  loading: (message: string, options?: ToastOptions) => hotToast.loading(message, options),
  custom: (message: string, options?: ToastOptions) => hotToast(message, options),
  dismiss: (toastId?: string) => hotToast.dismiss(toastId),
};
