"use client";

import { useState } from "react";
import { Button } from "antd";
import LoginModal from "./components/LoginModal";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </AuthProvider>
  );
}

function ClientLayoutContent({ children }: ClientLayoutProps) {
  const [isLoginModalVisible, setIsLoginModalVisible] =
    useState<boolean>(false);
  const { user, logout } = useAuth(); // Add this hook

  const handleLoginModalVisibility = (visible: boolean) => () => {
    setIsLoginModalVisible(visible);
  };

  const handleLogin = (email: string, password: string): void => {
    // TODO: Implement login logic
    console.log("Login attempt:", email, password);
    handleLoginModalVisibility(false)();
  };

  const handleGoogleLoginSuccess = (name: string) => {
    handleLoginModalVisibility(false)();
  };

  return (
    <>
      <div className="flex flex-1 h-screen  overflow-hidden">
        <main className="flex-1 flex flex-col">
          <Header
            onLoginClick={handleLoginModalVisibility(true)}
            user={user}
            onLogout={logout}
          />
          <div className="flex-1">{children}</div>
        </main>
      </div>
      <LoginModal
        isVisible={isLoginModalVisible}
        onClose={handleLoginModalVisibility(false)}
        onLogin={handleLogin}
        onGoogleLoginSuccess={handleGoogleLoginSuccess}
      />
    </>
  );
}

interface HeaderProps {
  onLoginClick: () => void;
  user: string | null;
  onLogout: () => void;
}

function Header({ onLoginClick, user, onLogout }: HeaderProps) {
  return (
    <header className="h-16 bg-gray-100 flex justify-end items-center px-4">
      {user ? (
        <div className="flex items-center">
          <span className="mr-4">{user}</span>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      ) : (
        <Button type="primary" onClick={onLoginClick}>
          Sign In
        </Button>
      )}
    </header>
  );
}
