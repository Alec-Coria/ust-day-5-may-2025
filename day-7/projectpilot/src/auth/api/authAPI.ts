// src/auth/authAPI.ts

// Asegúrate de que estas funciones utilitarias estén en un archivo compartido, por ejemplo, src/utils/apiUtils.ts
// Así podrás importarlas y reutilizarlas en projectAPI.ts también.
import {
  //translateStatusToErrorMessage,
  checkStatus,
  parseJSON,
} from '../../utils/apiUtils';
import { Auth } from '../Auth';

const baseUrl = 'http://localhost:3001';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  name: string;
}

const authUrl = `${baseUrl}/auth`;
//const usersUrl = `${baseUrl}/users`; // URL para operaciones relacionadas con usuarios (find by id)

const authAPI = {
  /**
   * Registra un nuevo usuario.
   * @param user Datos del usuario para el registro (nombre, email, contraseña).
   * @returns La respuesta de autenticación con tokens y datos del usuario.
   */
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

  /**
   * Inicia sesión de un usuario existente.
   * @param credentials Credenciales del usuario (email, contraseña).
   * @returns La respuesta de autenticación con tokens y datos del usuario.
   */
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

  /**
   * Refresca los tokens de acceso y refresco.
   * @param refreshToken El token de refresco actual.
   * @returns La nueva respuesta de autenticación con tokens actualizados.
   */
  async refresh(refreshToken: string): Promise<Auth> {
    const response = await fetch(`${authUrl}/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const checkedResponse = checkStatus(response);
    return await parseJSON(checkedResponse);
  },

  /**
   * Cierra la sesión de un usuario.
   * @param accessToken El token de acceso del usuario.
   * @returns Verdadero si la sesión se cerró exitosamente.
   */
  async logout(accessToken: string): Promise<boolean> {
    const response = await fetch(`${authUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Envía el token de acceso para cerrar sesión
      },
    });
    // El logout normalmente devuelve un estado de éxito o un simple 'true'.
    // Asumimos que parseJSON manejará cualquier respuesta de éxito como 'true'.
    const checkedResponse = checkStatus(response);
    return await parseJSON(checkedResponse);
  },
};

export { authAPI };

// --- src/utils/apiUtils.ts (Ejemplo de cómo se vería el archivo de utilidades) ---
// Idealmente, estas funciones deberían estar en un archivo separado para ser reutilizables.
// Por ahora, se incluyen aquí para que veas el código completo de authAPI.ts.