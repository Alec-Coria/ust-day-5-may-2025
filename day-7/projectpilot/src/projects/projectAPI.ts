import { Project } from './Project';
import { checkStatus, parseJSON } from '../utils/apiUtils';
// const baseUrl = 'http://localhost:4000';
// Backend URL para NestJS
const baseUrl = 'http://localhost:3001'
const url = `${baseUrl}/projects`;

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
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
        const response = await fetch(
            `${url}?_page=${page}&_limit=${limit}&_sort=name`,
            { headers: getAuthHeaders() }
        );
        // const delayedResponse = await delay(2000)(response);
        
        const checkedResponse = checkStatus(response); // 'response' es un objeto Response
        const data = await parseJSON(checkedResponse); // 'parseJSON' devuelve una Promise<any>
        return convertToProjectModels(data);
    },
    
    async put(project: Project) {
        const response = await fetch(`${url}/${project._id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: getAuthHeaders(),
        });
        const checkedResponse = checkStatus(response);
        return await parseJSON(checkedResponse);
    },
    
    async find(id: string) {
        const response = await fetch(
            `${url}/${id}`,
            { headers: getAuthHeaders() }
        );
        const checkedResponse = checkStatus(response);
        const data = await parseJSON(checkedResponse);
        if (!data || !data.existingProject) {
            throw new Error('Unexpected data structure');
        }
        return convertToProjectModel(data.existingProject);
    },
    
    async post(project: Project) {
        const response = await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: getAuthHeaders(),
        });
        const checkedResponse = checkStatus(response);
        return await parseJSON(checkedResponse);
    },
    
    async delete(project: Project) {
        const response = await fetch(`${url}/${project._id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        const checkedResponse = checkStatus(response);
        return await parseJSON(checkedResponse);
    }
};

export { projectAPI };