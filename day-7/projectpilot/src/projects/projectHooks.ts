import { useState } from 'react';
import { projectAPI } from './projectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
  
} from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { Project } from './Project';

export function useProjects() {
  //estado local para la pagina
  const [page, setPage] = useState(0);
  //uso de React Query
  let queryInfo = useQuery({
    //clave unica para este query, que es diferente para cada pagina
    queryKey: ['projects', page],
    //llamado a la API
    queryFn: () => projectAPI.get(page + 1),
    //mantener los datos anteriores mientras carga el fetch a la API
    placeholderData: (previousData) => previousData,
  });
  //devuelve todo lo que tenga Query, ademas de retornar page y setPage
  //as UseQueryResult<Project[]> & { isPreviousData: boolean } -> es un type assertion para enriquecer el tipo de queryInfo.
  return { ...(queryInfo as UseQueryResult<Project[]> & { isPreviousData: boolean }), page, setPage };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  //Mutation de React Query es una operacion que modifica datos en el servidor (CRUD)
  //Mutation ofrece metodos para hacer la operacion y gestionar el estado de la peticion (loading, exito, error)
  return useMutation({
    mutationFn: (project: Project) => 
      project.isNew ? projectAPI.post(project) : projectAPI.put(project),
    //actualiza de forma global los proyectos, haciendo fetch otra vez a backend invalidando su cache
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] })
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) =>
      projectAPI.delete(project),
    //actualiza de forma global los proyectos, haciendo fetch otra vez a backend invalidando su cache
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] })
  });
}