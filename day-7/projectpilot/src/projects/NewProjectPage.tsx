import CreateProjectPage from './CreateProjectPage';
import { Toaster } from 'react-hot-toast';

function NewProjectPage () {
    return (
        <div>
            <h1>Create New Project</h1>
            <Toaster position = "top-center" />
            <CreateProjectPage/>
        </div>
    )
}

export default NewProjectPage;