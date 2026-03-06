import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '@/features/toast/models/useToastStore';

// 전역으로 띄워지는 Toast UI 컴포넌트입니다.
export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            onClick={() => removeToast(toast.id)}
            style={{
              background:
                toast.type === 'success'
                  ? '#4caf50'
                  : toast.type === 'error'
                    ? '#f44336'
                    : '#2196f3',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
