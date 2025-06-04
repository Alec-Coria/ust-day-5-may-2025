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
      newErrors.name = 'Name required.';
    } else if (data.name.trim().length < 3) {
      newErrors.name = 'The name must have at least 3 characters.';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'The email is not valid.';
    }

    if (!data.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (data.password.length < 6) {
      newErrors.password = 'The password must be at least 6 characters.';
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
    <div className="col-md-12">
  <div className="card card-container">
    <img
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="profile-img-card"
    />

    <form onSubmit={handleSubmit}>
      <h2 className="text-center">Sign up</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        {errors.name && (
          <div className="alert alert-danger mt-1">{errors.name}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={newUser.email}
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
          value={newUser.password}
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
          Sign up
        </button>
      </div>

      {onNavigateToLogin && (
        <p className="mt-3 text-center">
          Already have an account?{' '}
          <button type="button" className="btn btn-link" onClick={onNavigateToLogin}>
            Sign in here
          </button>
        </p>
      )}
    </form>
  </div>
</div>

  );
}

export default RegisterForm;