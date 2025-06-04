import { type SyntheticEvent, useState } from 'react';
import { useSignin } from './authHooks';
import { type UserCredentials } from './api/authAPI'; // Import the interface

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onNavigateToRegister?: () => void;
}

function LoginForm({ onLoginSuccess, onNavigateToRegister }: LoginFormProps) {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const { mutate: signin, isPending } = useSignin();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev: UserCredentials) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = (data: UserCredentials) => {
    let newErrors: typeof errors = { email: '', password: '' };
    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido.';
    }
    if (!data.password.trim()) {
      newErrors.password = 'La contraseña es requerida.';
    }
    return newErrors;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newErrors = validate(credentials);
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    
    signin(credentials, {
      onSuccess: () => {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      },
    });
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      {isPending && <span className="toast">Iniciando sesión...</span>}
      <h2>Iniciar Sesión</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="tu@email.com"
        value={credentials.email}
        onChange={handleChange}
      />
      {errors.email && (
        <div className="card error">
          <p>{errors.email}</p>
        </div>
      )}

      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        name="password"
        placeholder="tu contraseña"
        value={credentials.password}
        onChange={handleChange}
      />
      {errors.password && (
        <div className="card error">
          <p>{errors.password}</p>
        </div>
      )}

      <div className="input-group">
        <button type="submit" className="primary bordered medium">
          <span role="img" aria-label="login">🚪</span>
          Login
        </button>
      </div>
      {onNavigateToRegister && (
        <p className="mt-2">
          ¿No tienes una cuenta?{' '}
          <button type="button" className="link-button" onClick={onNavigateToRegister}>
            Regístrate aquí
          </button>
        </p>
      )}
    </form>
  );
}

export default LoginForm;