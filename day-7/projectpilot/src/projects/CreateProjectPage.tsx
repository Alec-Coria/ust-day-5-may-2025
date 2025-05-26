import ProjectForm from './ProjectForm';
import { Project } from './Project';

function CreateProjectPage () {
    const project = new Project({
        id: undefined,
        name: '',
        description: '',
        budget: 0,
        isActive: false
    });

    return (
        <div>
            <ProjectForm
                project={project}
                isNew={true}
            />
        </div>
    )
}

export default CreateProjectPage;