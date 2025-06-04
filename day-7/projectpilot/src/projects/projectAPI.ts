import { Project } from './Project';
import { checkStatus, parseJSON } from '../utils/apiUtils';
// const baseUrl = 'http://localhost:4000';
// Backend URL para NestJS
const baseUrl = 'http://localhost:3001'
const url = `${baseUrl}/projects`;

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
    // get(page = 1, limit = 10) {
    //     return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
    //         //.then(delay(2000))
    //         //interpreta el status de la peticion HTTP
    //         .then(checkStatus)
    //         //convierte la respuesta a JSON
    //         .then(parseJSON)
    //         //Convierte los items a modelos que puede interpretar Typescript
    //         .then(convertToProjectModels)
    //         .catch((error: TypeError) => {
    //             console.log('log client error' + error);
    //             throw new Error(
    //                 'There was an error retrieving the projects. Please try again.'
    //             );
    //         }
    //     );
    // },

    async get(page = 1, limit = 10) {
        const response = await fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`);
        // const delayedResponse = await delay(2000)(response);
        
        const checkedResponse = checkStatus(response); // 'response' es un objeto Response
        const data = await parseJSON(checkedResponse); // 'parseJSON' devuelve una Promise<any>
        return convertToProjectModels(data);
    },
    
    async put(project: Project) {
        const response = await fetch(`${url}/${project._id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const checkedResponse = checkStatus(response);
        return await parseJSON(checkedResponse);
    },
    
    async find(id: string) {
        const response = await fetch(`${url}/${id}`);
        const checkedResponse = checkStatus(response);
        const data = await parseJSON(checkedResponse);
        if (!data || !data.existingProject) {
            throw new Error("Estructura de respuesta inválida desde el backend");
        }
        return convertToProjectModel(data.existingProject);
    },
    
    async post(project: Project) {
        const response = await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const checkedResponse = checkStatus(response);
        return await parseJSON(checkedResponse);
    },
    
    async delete(project: Project) {
        const response = await fetch(`${url}/${project._id}`, {
            method: 'DELETE'
        });
        const checkedResponse = checkStatus(response);
        return await parseJSON(checkedResponse);
    }


    // put(project: Project) {
    //     return fetch(`${url}/${project._id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(project),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })//.then(delay(2000))
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .catch((error) => {
    //             console.log('log client error' + error);
    //             throw new Error(
    //                 `There was an error updating the project ${project.name}. Please try again.`
    //             );
    //         })
    // },
    // find(id: string) {
    //     return fetch(`${url}/${id}`)
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .then((data) => {
    //             if (!data || !data.existingProject) {
    //                 throw new Error("Invalid response structure from backend");
    //             }
    //             return convertToProjectModel(data.existingProject)
    //         })
    // },
    // post(project: Project) {
    //     return fetch(`${url}`, {
    //         method: 'POST',
    //         body: JSON.stringify(project),
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .catch((error) => {
    //             console.log('log client error' + error);
    //             throw new Error(
    //                 `There was an error creating the project ${project.name}. Please try again.`
    //             );
    //         })
    // },
    // delete(project: Project) {
    //     return fetch(`${url}/${project._id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .catch((error) => {
    //             console.log('log client error' + error);
    //             throw new Error(
    //                 `There was an error deleting the project ${project.name}. Please try again.`
    //             );
    //         })
    // }
};

export { projectAPI };