import { User } from '../../users/User';
import type { Auth } from '../Auth';
// const baseUrl = 'http://localhost:4000';
// Backend URL para NestJS
const baseUrl = 'http://localhost:3001'
const url = `${baseUrl}/auth`;

function translateStatusToErrorMessage(status: number) {
    //Interpreta los errores cuando existan
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the User(s).';
        default:
            return 'Auth failed. Please try again.';
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

// function convertToUserModels(data: any): User[] {
//     // asegura de que `UsersData` exista y sea un array
//     if(!data || !Array.isArray(data.UsersData)) {
//         console.warn('Unexpected data structure: ', data);
//         return [];
//     }
//     return data.UsersData.map(convertToUserModel);
// }

function convertToUserModel(item: any): User {
    return new User(item);
}

const authAPI = {
    put(user: User) {
        return fetch(`${url}/${user._id}`, {
            method: 'PUT',
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
    //sign up
    signUp(user: User) {
        return fetch(`${url}/singup`, {
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
                    `There was an error creating the user ${user.username}. Please try again.`
                );
            })
    },
    //sign in
    signIn(auth: Auth) {
        return fetch(`${url}/singin`, {
            method: 'POST',
            body: JSON.stringify(auth),
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
                console.log('log client error' + error);
                throw new Error(
                    `There was an error logging. Please try again.`
                );
            })
    },
};

export { authAPI };