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
      newErrors.email = 'Email is required.';
    }
    if (!data.password.trim()) {
      newErrors.password = 'Password is required.';
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
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Login</h2>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {errors.email && (
              <div className="alert alert-danger mt-1">{errors.email}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && (
              <div className="alert alert-danger mt-1">{errors.password}</div>
            )}
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" disabled={isPending}>
              {isPending && <span className="spinner-border spinner-border-sm mr-2"></span>}
              Login
            </button>
          </div>
          
          {onNavigateToRegister && (
            <p className="mt-3 text-center">
              Don't have an account?{' '}
              <button type="button" className="btn btn-link" onClick={onNavigateToRegister}>
                Sign up here
              </button>
            </p>
          )}
        </form>
      </div>
    </div>

  );
}

export default LoginForm;