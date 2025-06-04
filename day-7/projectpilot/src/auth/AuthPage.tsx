// src/auth/AuthPage.tsx

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom'; // Asegúrate de que este import sea de 'react-router-dom'

function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Después de un login/registro exitoso, redirige al usuario a la página de proyectos
    navigate('/projects');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {showRegister ? (
            <RegisterForm
              onRegisterSuccess={handleAuthSuccess}
              onNavigateToLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm
              onLoginSuccess={handleAuthSuccess}
              onNavigateToRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;