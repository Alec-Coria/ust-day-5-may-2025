import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI, type UserCredentials, type UserRegistration } from './api/authAPI';
import { Auth } from './Auth';
import toast from 'react-hot-toast';

//Registro de usuario con mutation
export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserRegistration) => authAPI.signup(user),
    onSuccess: (data: Auth) => {
      // Almacenar tokens (localStorage)
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('Sign up success! Signed in...');
      queryClient.invalidateQueries({ queryKey: ['user'] }); //Recarga las queries
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error registering user.');
    },
  });
}

 //Hook para la mutación de inicio de sesión.
export function useSignin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: UserCredentials) => authAPI.signin(credentials),
    onSuccess: (data: Auth) => {
      // Almacenar tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('Login successful!');
      queryClient.invalidateQueries({ queryKey: ['user'] }); // Invalida los datos del usuario
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    },
  });
}

/**
 * Hook para la mutación de cierre de sesión.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accessToken: string) => authAPI.logout(accessToken),
    onSuccess: () => {
      // Limpiar tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      toast.success('Session closed successfully.');
      queryClient.invalidateQueries({ queryKey: ['user'] }); // Invalida los datos del usuario
      queryClient.removeQueries({ queryKey: ['user'] }); // Remover completamente los datos del usuario de la caché
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error logging out.');
    },
  });
}
