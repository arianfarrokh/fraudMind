"use client";
import { RTLThemeProvider } from "@/components/rtl-layout/RTLThemeProvider";
import React, { ReactNode } from "react";
import { TranslationProvider } from "./translation";
import { DialogProvider } from "./dialog-provider/DialogProvider";
import { AlertProvider } from "./alert-provider/AlertProvider";
import { ApolloWrapper } from "@/apollo-wrapper";
import MUIThemeProvider from "@/theme/ThemeContext";
import { Provider } from "react-redux";
import store from "@/store";

type Props = {
  children: ReactNode;
};

function RootProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <RTLThemeProvider>
        <MUIThemeProvider>
          <TranslationProvider initialLocale="fa">
            <ApolloWrapper>
              <DialogProvider>
                <AlertProvider>{children}</AlertProvider>
              </DialogProvider>
            </ApolloWrapper>
          </TranslationProvider>
        </MUIThemeProvider>
      </RTLThemeProvider>
    </Provider>
  );
}

export default RootProvider;
