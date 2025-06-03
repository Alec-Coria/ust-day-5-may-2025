import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from './api/authAPI';

// Función de validación (ejemplo básico, se puede mejorar con librerías)
const validateRequired = (value: string): string | undefined => {
  if (!value) {
    return 'Este campo es requerido.';
  }
  return undefined;
};

interface LoginProps {
  // Si tu componente va a recibir props, defínelas aquí.
  // En este caso, no parece que reciba props directamente,
  // pero el `withRouter` anterior inyectaba `router`,
  // que ahora manejamos con `useNavigate`.
}

const LoginPage: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Estados para manejar errores de validación individuales
  const [usernameError, setUsernameError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  // No necesitamos refs para el formulario o el CheckButton si validamos manualmente
  // o con librerías modernas de formulario.
  // const formRef = useRef<HTMLFormElement>(null);
  // const checkBtnRef = useRef<any>(null); // El CheckButton de react-validation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setLoading(true);
    setUsernameError(undefined);
    setPasswordError(undefined);

    // Validación manual
    const usernameValidation = validateRequired(username);
    const passwordValidation = validateRequired(password);

    if (usernameValidation) {
      setUsernameError(usernameValidation);
    }
    if (passwordValidation) {
      setPasswordError(passwordValidation);
    }

    // Si hay errores de validación, detener el proceso
    if (usernameValidation || passwordValidation) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.authAPI.signIn('/auth/login', { username, password }); // Ajusta la ruta y los campos si es diferente en tu NestJS
      const { access_token } = response.data; // Asumiendo que tu backend devuelve un `access_token`
      localStorage.setItem('token', access_token);
      navigate('/dashboard'); // O a la ruta que sea tu perfil o dashboard
      // window.location.reload(); // Generalmente no es necesario en React Router si el estado se maneja correctamente
    } catch (error: any) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <div className="alert alert-danger" role="alert">
                {usernameError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="alert alert-danger" role="alert">
                {passwordError}
              </div>
            )}
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
        <p>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;