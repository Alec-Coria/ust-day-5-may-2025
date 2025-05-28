import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useDeleteProject } from './projectHooks';
import toast from 'react-hot-toast';

//Componente reutilizable para parsear lista de proyectos
//Interface con la lista de proyectos
interface ProjectListProps {
    projects: Project[]
}

//function donde se muestra la lista de proyectos en su componente
function ProjectList({ projects }: ProjectListProps) {
    //useState para manipular el Hook del DOM
    const [projectBeingEdited, setprojectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        //seteo de project en constante de Hook
        setprojectBeingEdited(project);
    }

    //Mutate es la funcion para ejecutar la mutacion en projectHooks
    //isPending indica si el proceso esta en progreso
    const { mutate: deleteProject, isPending } = useDeleteProject();
    const onClickDeleteProject = (project: Project) => {
        deleteProject(project, {
            onSuccess: () => {
                toast.success(`Project ${project.name} deleted successfully!`);
            },
            onError:(error: any) => {
                toast.error(error.message || `Error deleting project ${project.name}`);
            }
        });
    }
    //funcionalidad de boton cancelar en ProjectForm, borra el project del state, cambiando el renderizado de componentes
    const cancelEditing = () => {
        setprojectBeingEdited({});
    }
    return (
        <>
            {isPending && <span className="toast">Deleting...</span>}
            <div className="row">
                {projects.map((project) => (
                    <div key={project._id} className="cols-sm">
                        {/* Uso de state (Hook) para renderizar un componente u otro de acuerdo a condicion ternaria */}
                        {/* Click en edit cambia uno u otro*/}
                        {project === projectBeingEdited ? (
                            <>
                                <ProjectForm
                                    onCancel={cancelEditing}
                                    project={project}
                                />
                            </>
                        ) : (
                            <ProjectCard
                            //Valores que se setean y se pasan a traves de props al child ProjectCard, donde se usan y retornan el valor hacia aca
                                project={project} onEdit={handleEdit} onDelete={onClickDeleteProject}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProjectList;