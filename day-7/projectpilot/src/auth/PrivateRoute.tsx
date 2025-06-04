import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Aquí es donde verificas si el usuario está autenticado.
  // Por ahora, usaremos localStorage para simplificar.
  const isAuthenticated = !!localStorage.getItem('accessToken');

  // Si está autenticado, renderiza las rutas hijas (<Outlet />).
  // Si no, redirige a la página de autenticación.
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;