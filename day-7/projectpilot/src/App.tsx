import './App.css'
import ProjectsPage from './projects/ProjectsPage'
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from './projects/NewProjectPage';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './home/HomePage';
import LoginPage from './auth/LoginForm';
import { Toaster } from 'react-hot-toast';

import AuthPage from './auth/AuthPage';
import PrivateRoute from './auth/PrivateRoute'; // Componente para rutas protegidas
import { useLogout } from './auth/authHooks';

function App() {
  const { mutate: logout } = useLogout();

  const isAuthenticated = !!localStorage.getItem('accessToken');

    const handleLogout = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      logout(accessToken);
    }
  };

  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/home" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/projects" className="button rounded">
              Projects
            </NavLink>
            <NavLink to="/create-project" className="button rounded">
              New Project
            </NavLink>
          </>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="button rounded">
            Logout
          </button>
        ) : (
          <NavLink to="/auth" className="button rounded">
            Login / Register
          </NavLink>
        )}
      </header>
      <div className="container">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />}/>
            <Route path="/create-project" element={<NewProjectPage />}/>
          </Route>
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
