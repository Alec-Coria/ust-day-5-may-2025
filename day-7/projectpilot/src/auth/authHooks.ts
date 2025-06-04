// src/auth/authHooks.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI, type UserCredentials, type UserRegistration } from './api/authAPI';
import { Auth } from './Auth';
import toast from 'react-hot-toast';

/**
 * Hook para la mutación de registro de usuario.
 */
export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserRegistration) => authAPI.signup(user),
    onSuccess: (data: Auth) => {
      // Almacenar tokens (localStorage, Context, Recoil, Redux, etc.)
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('¡Registro exitoso! Sesión iniciada.');
      queryClient.invalidateQueries({ queryKey: ['user'] }); // Invalida los datos del usuario para recargar
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al registrar usuario.');
    },
  });
}

/**
 * Hook para la mutación de inicio de sesión.
 */
export function useSignin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: UserCredentials) => authAPI.signin(credentials),
    onSuccess: (data: Auth) => {
      // Almacenar tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('¡Inicio de sesión exitoso!');
      queryClient.invalidateQueries({ queryKey: ['user'] }); // Invalida los datos del usuario
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
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
      toast.success('Sesión cerrada correctamente.');
      queryClient.invalidateQueries({ queryKey: ['user'] }); // Invalida los datos del usuario
      queryClient.removeQueries({ queryKey: ['user'] }); // Opcional: remover completamente los datos del usuario de la caché
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al cerrar sesión.');
    },
  });
}

// Hook para obtener detalles del usuario
// export function useUser(id: string | null) {
//     return useQuery({
//         queryKey: ['user', id],
//         queryFn: async () => {
//             if (!id) throw new Error('ID de usuario no proporcionado.');
//             const accessToken = localStorage.getItem('accessToken');
//             if (!accessToken) throw new Error('No se encontró token de acceso.');
//             return userAPI.getUserById(id, accessToken);
//         },
//         enabled: !!id && !!localStorage.getItem('accessToken'), // Solo se ejecuta si hay ID y token
//         staleTime: 5 * 60 * 1000, // Los datos se consideran "frescos" por 5 minutos
//     });
// }