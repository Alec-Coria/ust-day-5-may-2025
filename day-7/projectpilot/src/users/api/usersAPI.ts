import { User } from '../User';
// const baseUrl = 'http://localhost:4000';
// Backend URL para NestJS
const baseUrl = 'http://localhost:3001'
const url = `${baseUrl}/users`;

function translateStatusToErrorMessage(status: number) {
    //Interpreta los errores cuando existan
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the User(s).';
        default:
            return 'There was an error retrieving the User(s). Please try again.';
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

function convertToUserModels(data: any): User[] {
    // asegura de que `UsersData` exista y sea un array
    if(!data || !Array.isArray(data.UsersData)) {
        console.warn('Unexpected data structure: ', data);
        return [];
    }
    return data.UsersData.map(convertToUserModel);
}

function convertToUserModel(item: any): User {
    return new User(item);
}

const usersAPI = {
    get(page = 1, limit = 10) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            //.then(delay(2000))
            //interpreta el status de la peticion HTTP
            .then(checkStatus)
            //convierte la respuesta a JSON
            .then(parseJSON)
            //Convierte los items a modelos que puede interpretar Typescript
            .then(convertToUserModels)
            .catch((error: TypeError) => {
                console.log('log client error' + error);
                throw new Error(
                    'There was an error retrieving the Users. Please try again.'
                );
            });
    },
    patch(user: User) {
        return fetch(`${url}/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })//.then(delay(2000))
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
                console.log('log client error' + error);
                throw new Error(
                    `There was an error updating the User ${user.username}. Please try again.`
                );
            })
    },
    find(id: string) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                if (!data || !data.existingUser) {
                    throw new Error("Invalid response structure from backend");
                }
                return convertToUserModel(data.existingUser)
            })
    },
    post(user: User) {
        return fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
                console.log('log client error' + error);
                throw new Error(
                    `There was an error creating the User ${user.username}. Please try again.`
                );
            })
    },
    delete(user: User) {
        return fetch(`${url}/${user._id}`, {
            method: 'DELETE'
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
                console.log('log client error' + error);
                throw new Error(
                    `There was an error deleting the User ${user.username}. Please try again.`
                );
            })
    }
};

export { usersAPI };

// **Sugerencia:** Crea un nuevo archivo src/users/userAPI.ts si la lógica de usuario crece.
// Por ahora, se puede mantener aquí para simplificar, pero considera separarlo.
// const userAPI = {
//   /**
//    * Obtiene los detalles de un usuario por su ID.
//    * @param id El ID del usuario.
//    * @param accessToken El token de acceso para la ruta protegida.
//    * @returns Los datos del usuario.
//    */
//   async getUserById(id: string, accessToken: string): Promise<any> {
//     const response = await fetch(`${usersUrl}/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`, // Ruta protegida
//       },
//     });
//     const checkedResponse = checkStatus(response);
//     return await parseJSON(checkedResponse);
//   },
// };