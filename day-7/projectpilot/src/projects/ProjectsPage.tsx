import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Project } from './Project';
import { useDeleteProject } from './projectHooks';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ProjectsPage() {
  const {
    data,
    isPending,
    error,
    isError,
    isFetching,
    page,
    setPage,
  } = useProjects();
  const query = useProjects();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const confirmDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setPopupOpen(true);
  }

      //Mutate es la funcion para ejecutar la mutacion en projectHooks
    //isPending indica si el proceso esta en progreso, se setea a isDeleting
    const { mutate: deleteProject, isPending: isDeleting} = useDeleteProject();
    const handleDeletedConfirmed = () => {
      if(!projectToDelete) return;
        deleteProject(projectToDelete, {
            onSuccess: () => {
                toast.success(`Project ${projectToDelete.name} deleted successfully!`);
                setPopupOpen(false);
                setProjectToDelete(null);
            },
            onError:(error: any) => {
                toast.error(error.message || `Error deleting project ${projectToDelete.name}`);
            }
        });
    }

  return (
    <>
      <h1>Projects</h1>
      <Modal
        isOpen={isPopupOpen}
        onRequestClose={() => setPopupOpen(false)}
        contentLabel='Confirm delete'
        className="popup"
        overlayClassName="popup-background">
        {isDeleting && <span className="toast">Deleting...</span>}
        <h2>Are you sure to delete project {projectToDelete?.name}?</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button style={{ backgroundColor: 'red', color: 'white'}} disabled={isDeleting} onClick={handleDeletedConfirmed}>Delete</button>
          <button disabled={isDeleting} onClick={() => setPopupOpen(false)}>Cancel</button>
        </div>
      </Modal>
      

      {data ? (
        <>
          {isFetching && !isPending && (
            <span className="toast">Refreshing...</span>
          )}
          <Toaster position = "top-center" />
          <ProjectList projects={data} onDeleteClick={confirmDeleteProject} />
          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (!query.isPreviousData) {
                      query.setPage((oldPage) => oldPage + 1);
                    }
                  }}
                  disabled={data.length != 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isPending ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProjectsPage;

// this commented code is unnecessary it's just here to show you the pattern
// return (
//   <>
//     <h1>Header</h1>
//     {data ? (
//       <p>data</p>
//     ) : isLoading ? (
//       <p>Loading...</p>
//     ) : isError ? (
//       <p>Error Message</p>
//     ) : null}
//   </>
// );