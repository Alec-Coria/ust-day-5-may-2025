import { useProjects } from './projectHooks';
import ProjectList from "./ProjectList";

function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    setCurrentPage,
    saveProject,
    saving,
    //savingError
  } = useProjects();

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  return (
    <>
      <h1>Projects</h1>

      {saving && <span className="toast">Saving...</span>}

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