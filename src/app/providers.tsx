"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { store } from "@/store";
import { ChatBotWidget } from "@/components/chat/ChatBotWidget";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <ChatBotWidget />
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
      </ThemeProvider>
    </Provider>
  );
}

