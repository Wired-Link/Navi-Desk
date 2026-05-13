import React from "react";
import "./index.css";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <AppProvider>
      <Dashboard />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#050812",
            border: "1px solid #00f0ff",
            color: "#e0ffff",
            fontFamily: "Space Mono, monospace",
            borderRadius: 0,
          },
        }}
      />
    </AppProvider>
  );
}

export default App;
