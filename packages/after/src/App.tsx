import React from "react";
import { Header } from "@/components/header";
import { ManagementPage } from "./pages/ManagementPage";
import { ThemeProvider } from "./components/theme-provider";
import "./styles/index.css";

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
