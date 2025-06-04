import { type SyntheticEvent, useState } from 'react';
import { useSignup } from './authHooks';
import { type UserRegistration } from './api/authAPI';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  onNavigateToLogin?: () => void;
}

function RegisterForm({ onRegisterSuccess, onNavigateToLogin }: RegisterFormProps) {
  const [newUser, setNewUser] = useState<UserRegistration>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { mutate: signup, isPending } = useSignup();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prev: UserRegistration) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = (data: UserRegistration) => {
    let newErrors: typeof errors = { name: '', email: '', password: '' };
    if (!data.name.trim()) {
      newErrors.name = 'El nombre es requerido.';
    } else if (data.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'El email no es válido.';
    }

    if (!data.password.trim()) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (data.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    return newErrors;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newErrors = validate(newUser);
    if (newErrors.name || newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    signup(newUser, {
      onSuccess: () => {
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      },
    });
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      {isPending && <span className="toast">Registrando usuario...</span>}
      <h2>Registrarse</h2>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        value={newUser.name}
        onChange={handleChange}
      />
      {errors.name && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="tu@email.com"
        value={newUser.email}
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
        value={newUser.password}
        onChange={handleChange}
      />
      {errors.password && (
        <div className="card error">
          <p>{errors.password}</p>
        </div>
      )}

      <div className="input-group">
        <button type="submit" className="primary bordered medium">
          <span role="img" aria-label="register">✅</span>
          Registrarse
        </button>
      </div>
      {onNavigateToLogin && (
        <p className="mt-2">
          ¿Ya tienes una cuenta?{' '}
          <button type="button" className="link-button" onClick={onNavigateToLogin}>
            Inicia sesión aquí
          </button>
        </p>
      )}
    </form>
  );
}

export default RegisterForm;