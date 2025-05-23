import { useState, useEffect } from 'react';
import { projectAPI } from './projectAPI';
import { Project } from './Project';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [saving, setSaving] = useState(false);
    const [savingError, setSavingError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if(currentPage === 1){
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]); //concatena los proyectos del state con los nuevos gracias a la paginacion
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
    //al momento de modificar el valor de currentPage, se recarga useEffect
  }, [currentPage]);

 const saveProject = (project: Project) => {
    setSaving(true);
  //Especificar que p es de tipo Project
  //Crear nueva lista de proyectos, reemplazando el proyecto que tiene el mismo id
  projectAPI
    .put(project)
    .then((updatedProject) => {
      let updatedProjects = projects.map((p) => {
        return p.id === project.id ? new Project(updatedProject) : p;
      });
      setProjects(updatedProjects);
    })
    .catch((e) => {
      setSavingError(e.message);
    })
    .finally(() => setSaving(false));
  };

  return {
    projects,
    loading,
    error,
    currentPage,
    setCurrentPage,
    saving,
    savingError,
    saveProject
  }
}