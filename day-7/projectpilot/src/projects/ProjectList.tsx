import { Project } from './Project';

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
                    <div className="card">
                        <img src={project.imageUrl} alt={project.name}/>
                        <section className="section dark">
                            <h5 className="strong">
                                <strong>{project.name}</strong>
                            </h5>
                            <p>{project.description}</p>
                            <p>Budget : {project.budget.toLocaleString()}</p>
                        </section>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectList;