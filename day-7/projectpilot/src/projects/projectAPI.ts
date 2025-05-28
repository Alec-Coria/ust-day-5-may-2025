import { Project } from './Project';
// const baseUrl = 'http://localhost:4000';
// Backend URL para NestJS
const baseUrl = 'http://localhost:3001'
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
    //Interpreta los errores cuando existan
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

function checkStatus(response: any){
    //Recupera el status de la peticion y la interpreta
    if (response.ok){
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
        //manda llamar el traductor de errores, solo envia el status
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) {
    return response.json();
}

function convertToProjectModels(data: any): Project[] {
    // asegura de que `projectsData` exista y sea un array
    if(!data || !Array.isArray(data.projectsData)) {
        console.warn('Unexpected data structure: ', data);
        return [];
    }
    return data.projectsData.map(convertToProjectModel);
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
}

const projectAPI = {
    get(page = 1, limit = 10) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            //.then(delay(2000))
            //interpreta el status de la peticion HTTP
            .then(checkStatus)
            //convierte la respuesta a JSON
            .then(parseJSON)
            //Convierte los items a modelos que puede interpretar Typescript
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                console.log('log client error' + error);
                throw new Error(
                    'There was an error retrieving the projects. Please try again.'
                );
            });
    },
    put(project: Project) {
        return fetch(`${url}/${project._id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })//.then(delay(2000))
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
                console.log('log client error' + error);
                throw new Error(
                    `There was an error updating the project ${project.name}. Please try again.`
                );
            })
    },
    find(id: string) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                if (!data || !data.existingProject) {
                    throw new Error("Invalid response structure from backend");
                }
                return convertToProjectModel(data.existingProject)
            })
    },
    post(project: Project) {
        return fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
                console.log('log client error' + error);
                throw new Error(
                    `There was an error creating the project ${project.name}. Please try again.`
                );
            })
    },
};

export { projectAPI };