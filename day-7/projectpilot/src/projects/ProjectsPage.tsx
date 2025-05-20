import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from './Project';

function ProjectsPage() {
  const saveProject = (project: Project) => {
    console.log('Saving project: ', project);
  }
  return (
    <>
      <h1>Projects</h1>
      {/* Carga de lista de proyectos */}
      <ProjectList onSave={saveProject} projects = {MOCK_PROJECTS}/>
    </>
  );
}

export default ProjectsPage;