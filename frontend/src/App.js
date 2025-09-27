import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatProvider } from "./contexts/ChatContext";
import LoginScreen from "./components/auth/LoginScreen";
import MainLayout from "./components/layout/MainLayout";
import { Toaster } from "./components/ui/toaster";

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#0088cc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Telegram...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout /> : <LoginScreen />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <div className="App">
            <AppContent />
            <Toaster />
          </div>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
