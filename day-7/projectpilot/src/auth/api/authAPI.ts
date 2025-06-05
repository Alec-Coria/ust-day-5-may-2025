import {
  //translateStatusToErrorMessage,
  checkStatus,
  parseJSON,
} from '../../utils/apiUtils';
import { Auth } from '../Auth';

const baseUrl = 'http://localhost:3000';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  name: string;
}

const authUrl = `${baseUrl}/auth`;

const authAPI = {
  // Registra un nuevo usuario.
  async signup(user: UserRegistration): Promise<Auth> {
    const response = await fetch(`${authUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const checkedResponse = checkStatus(response);
    return await parseJSON(checkedResponse);
  },

  //Login
  async signin(credentials: UserCredentials): Promise<Auth> {
    const response = await fetch(`${authUrl}/signin`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const checkedResponse = checkStatus(response);
    return await parseJSON(checkedResponse);
  },

  //Token refresh
  async refresh(refreshToken: string): Promise<Auth> {
    const response = await fetch(`${authUrl}/refresh`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const checkedResponse = checkStatus(response);
    return await parseJSON(checkedResponse);
  },

  //Logout
  async logout(accessToken: string): Promise<boolean> {
    console.log(accessToken);
    const response = await fetch(`${authUrl}/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Envía el token de acceso para cerrar sesion
      },
    });
    const checkedResponse = checkStatus(response);
    return await parseJSON(checkedResponse);
  },
};

export { authAPI };