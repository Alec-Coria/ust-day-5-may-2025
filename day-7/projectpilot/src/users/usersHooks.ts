import { useState } from 'react';
import { usersAPI } from './api/usersAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
  
} from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { User } from './User';

export function useUsers() {
  //estado local para la pagina
  const [page, setPage] = useState(0);
  //uso de React Query
  let queryInfo = useQuery({
    //clave unica para este query, que es diferente para cada pagina
    queryKey: ['users', page],
    //llamado a la API
    queryFn: () => usersAPI.get(page + 1),
    //mantener los datos anteriores mientras carga el fetch a la API
    placeholderData: (previousData) => previousData,
  });
  //devuelve todo lo que tenga Query, ademas de retornar page y setPage
  //as UseQueryResult<user[]> & { isPreviousData: boolean } -> es un type assertion para enriquecer el tipo de queryInfo.
  return { ...(queryInfo as UseQueryResult<User[]> & { isPreviousData: boolean }), page, setPage };
}

export function useSaveUsers() {
  const queryClient = useQueryClient();
  //Mutation de React Query es una operacion que modifica datos en el servidor (CRUD)
  //Mutation ofrece metodos para hacer la operacion y gestionar el estado de la peticion (loading, exito, error)
  return useMutation({
    mutationFn: (user: User) => 
      user.isNew ? usersAPI.post(user) : usersAPI.patch(user),
    //actualiza de forma global los proyectos, haciendo fetch otra vez a backend invalidando su cache
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
}

export function useDeleteUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) =>
      usersAPI.delete(user),
    //actualiza de forma global los proyectos, haciendo fetch otra vez a backend invalidando su cache
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
}