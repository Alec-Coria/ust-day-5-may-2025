// src/auth/AuthPage.tsx
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {showRegister ? (
            <RegisterForm
              onRegisterSuccess={onLoginSuccess}
              onNavigateToLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm
              onLoginSuccess={onLoginSuccess}
              onNavigateToRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
