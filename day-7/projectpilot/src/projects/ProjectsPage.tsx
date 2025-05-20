import { useState } from 'react';
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from './Project';

function ProjectsPage() {
  // Hook de estado para la lista de proyectos, inicializado con MOCK_PROJECTS (tipo Project[])
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

 const saveProject = (project: Project) => {
  //Especificar que p es de tipo Project
  //Crear nueva lista de proyectos, reemplazando el proyecto que tiene el mismo id
  let updatedProjects = projects.map((p: Project) => {
    return p.id === project.id ? project : p;
  });
  setProjects(updatedProjects);
 }
  return (
    <>
      <h1>Projects</h1>
      {/* Carga de lista de proyectos */}
      <ProjectList onSave={saveProject} projects = {projects}/>
    </>
  );
}

export default ProjectsPage;