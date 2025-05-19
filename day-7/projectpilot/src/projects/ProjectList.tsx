import { Project } from './Project';
import ProjectCard from './ProjectCard';

//Componente reutilizable para parsear lista de proyectos
//Interface con la lista de proyectos
interface ProjectListProps {
    projects: Project[]
}

//function donde se muestra la lista de proyectos en su componente
function ProjectList({ projects }: ProjectListProps) {
    return (
        <div className="row">
            {projects.map((project) => (
                <div key={project.id} className="cols-sm">
                    <ProjectCard project={project}/>
                </div>
            ))}
        </div>
    );
}

export default ProjectList;