import { useState, useEffect } from 'react';
import { projectAPI } from './projectAPI';
import ProjectList from "./ProjectList";
import { Project } from './Project';

function ProjectsPage() {
  // Hook de estado para la lista de proyectos, inicializado con MOCK_PROJECTS (tipo Project[])
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

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

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      {/* Carga de lista de proyectos */}
      <ProjectList onSave={saveProject} projects = {projects}/>

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;