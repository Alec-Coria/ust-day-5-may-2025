import { Project } from './Project';
import { Link } from 'react-router';

function formatDescription(description: string): string {
    return description.substring(0,60) + '...';
}

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}

//Componente individual para Card
function ProjectCard(props: ProjectCardProps) {
    const { project, onEdit, onDelete } = props;
    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited);
    }
    return (
        <div className="card">
          <img src={project.imageUrl} alt={project.name} />
          <section className="section dark">
            <Link to={'/projects/' + project._id}> 
              <h5 className="strong">
                <strong>{project.name}</strong>
              </h5>
              <p>{formatDescription(project.description)}</p>
              <p>Budget : {project.budget.toLocaleString()}</p>
            </Link>
            <button 
                className="bordered"
                    onClick={() => {
                        handleEditClick(project);
                    }}>
              <span role="img" aria-label="edit">✏️</span>
              Edit
            </button>
            <button 
                className="bordered"
                    onClick={() => {
                        onDelete(project);
                    }}>
              <span role="img" aria-label="delete">🗑️</span>
              Delete
            </button>
          </section>
        </div>
    );
}

export default ProjectCard;