"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "@/store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            color: "#0F172A",
            border: "1px solid #E2E8F0",
          },
        }}
      />
    </Provider>
  );
}

