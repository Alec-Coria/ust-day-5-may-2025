import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

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
    //funcionalidad de boton cancelar en ProjectForm, borra el project del state, cambiando el renderizado de componentes
    const cancelEditing = () => {
        setprojectBeingEdited({});
    }
    return (
        <div className="row">
            {projects.map((project) => (
                <div key={project.id} className="cols-sm">
                    {/* Uso de state (Hook) para renderizar un componente u otro de acuerdo a condicion ternaria */}
                    {/* Click en edit cambia uno u otro*/}
                    {project === projectBeingEdited ? (
                        <ProjectForm
                            onCancel={cancelEditing}
                            project={project}
                        />
                    ) : (
                        <ProjectCard
                        //Valores que se setean y se pasan a traves de props al child ProjectCard, donde se usan y retornan el valor hacia aca
                            project={project} onEdit={handleEdit}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProjectList;