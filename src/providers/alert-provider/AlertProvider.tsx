"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from "react";
import { BaseSnackbar } from "@/components";
import { SnackbarProps } from "@/components/snack-bar/BaseSnackbar";

// تعریف تایپ برای Context
interface AlertContextType {
  show: (snackbar: SnackbarProps) => void;
  hide: () => void;
}

// ایجاد Context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// هوک برای دسترسی به Context
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

// کامپوننت AlertProvider
export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [alertQueue, setAlertQueue] = useState<SnackbarProps[]>([]);
  const [currentAlert, setCurrentAlert] = useState<SnackbarProps | null>(null);

  // اضافه کردن پیام جدید به صف
  const show = useCallback((snackbar: SnackbarProps) => {
    setAlertQueue((prevQueue) => [...prevQueue, snackbar]);
  }, []);

  // مخفی کردن آلرت فعلی
  const hide = useCallback(() => {
    setCurrentAlert(null);
  }, []);

  // مدیریت نمایش پیام‌ها از صف
  useEffect(() => {
    if (alertQueue.length > 0 && !currentAlert) {
      const [nextAlert] = alertQueue;
      setCurrentAlert(nextAlert);
      // حذف پیام از صف بعد از نمایش
      setAlertQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [alertQueue, currentAlert]);

  // مخفی کردن خودکار آلرت بعد از ۳ ثانیه (اختیاری)
  useEffect(() => {
    if (currentAlert) {
      const timer = setTimeout(() => {
        hide();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [currentAlert, hide]);

  return (
    <AlertContext.Provider value={{ show, hide }}>
      {children}
      {currentAlert && <BaseSnackbar {...currentAlert} />}
    </AlertContext.Provider>
  );
};