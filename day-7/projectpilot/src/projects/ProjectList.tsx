import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

//Componente reutilizable para parsear lista de proyectos
//Interface con la lista de proyectos
interface ProjectListProps {
    projects: Project[];
    onDeleteClick: (project: Project) => void;
}

//function donde se muestra la lista de proyectos en su componente
function ProjectList({ projects, onDeleteClick }: ProjectListProps) {
    //useState para manipular el Hook del DOM
    const [projectBeingEdited, setprojectBeingEdited] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (project: Project) => {
        //seteo de project en constante de Hook
        setprojectBeingEdited(project);
    }

    //funcionalidad de boton cancelar en ProjectForm, borra el project del state, cambiando el renderizado de componentes
    const cancelEditing = () => {
        setprojectBeingEdited({});
    }

    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const clearSearch = () => {
        setSearchTerm('');
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flexGrow: 1, padding: '0.5rem', fontSize: '1rem' }}
              />
              <button
                onClick={clearSearch}
                style={{
                  marginLeft: '0.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Clean
              </button>
            </div>
            <div className="row">
                {filteredProjects.map((project) => (
                    <div key={project._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
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
                                project={project} onEdit={handleEdit} onDelete={() => onDeleteClick(project)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProjectList;