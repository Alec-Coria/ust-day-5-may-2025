import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from './projects/NewProjectPage';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import HomePage from './home/HomePage';
import { Toaster } from 'react-hot-toast';

import AuthPage from './auth/AuthPage';
import PrivateRoute from './auth/PrivateRoute';
import { useLogout } from './auth/authHooks';
import { useState } from 'react';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('accessToken')
  );
  const location = useLocation(); //Para saber en qué ruta estamos

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      logout(accessToken);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const isAuthRoute = location.pathname === '/auth';

  return (
    <>
      {!isAuthRoute && (
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          {isAuthenticated ? (
            <>
              <NavLink to="/home" className="button rounded">
                <span className="icon-home"></span> Home
              </NavLink>
              <NavLink to="/projects" className="button rounded">
                Projects
              </NavLink>
              <NavLink to="/create-project" className="button rounded">
                New Project
              </NavLink>
              <button onClick={handleLogout} className="button rounded">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" className="button rounded">
              Login / Register
            </NavLink>
          )}
        </header>
      )}

      <div className="container">
        <Routes>
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <AuthPage onLoginSuccess={handleAuthSuccess} />
              )
            }
          />

          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/create-project" element={<NewProjectPage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Route>

          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default AppWrapper;
