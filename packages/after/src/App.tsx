import React from "react";
import { Header } from "@/components/header";
import { ManagementPage } from "./pages/ManagementPage";
import "./styles/index.css";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
