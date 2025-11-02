"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { DialogProps } from "./types";
import DialogComponent from "../../components/dialog-component/DialogComponent";

// تعریف تایپ برای Context
interface DialogContextType {
  show: (
    title: string,
    content: string | React.ReactNode,
    options?: Partial<
      Pick<
        DialogProps,
        | "maxWidth"
        | "confirmText"
        | "cancelText"
        | "onConfirm"
        | "onCancel"
        | "titleTextAlign"
      >
    >
  ) => void;
  hide: () => void;
}

// ایجاد Context
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// هوک برای دسترسی به Context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

// تعریف تایپ برای props مربوط به DialogProvider
interface DialogProviderProps {
  children: React.ReactNode;
}

// کامپوننت DialogProvider
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialog, setDialog] = useState<DialogProps | null>(null);

  const show = useCallback(
    (
      title: string,
      content: string | React.ReactNode,
      options: Partial<
        Pick<
          DialogProps,
          | "maxWidth"
          | "confirmText"
          | "cancelText"
          | "onConfirm"
          | "onCancel"
          | "titleTextAlign"
        >
      > = {}
    ) => {
      if (!content) {
        console.warn("Dialog content cannot be empty");
        return;
      }
      // اطمینان از اینکه onConfirm و onCancel همیشه تابع معتبر هستند
      const finalOnConfirm = options.onConfirm || (() => {});
      const finalOnCancel = options.onCancel || (() => setDialog(null));

      setDialog({
        title,
        content,
        open: true,
        maxWidth: options.maxWidth || "sm",
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        onConfirm: finalOnConfirm,
        onCancel: finalOnCancel,
        titleTextAlign: options.titleTextAlign || "center", 
      });
    },
    []
  );

  const hide = useCallback(() => {
    setDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ show, hide }}>
      {children}
      {dialog && (
        <DialogComponent
          open={dialog.open}
          title={dialog.title}
          titleTextAlign={dialog.titleTextAlign}
          content={dialog.content}
          maxWidth={dialog.maxWidth}
          confirmText={dialog.confirmText}
          cancelText={dialog.cancelText}
          onConfirm={dialog.onConfirm || (() => {})} // همیشه تابع
          onCancel={dialog.onCancel || (() => setDialog(null))} // همیشه تابع
        />
      )}
    </DialogContext.Provider>
  );
};
