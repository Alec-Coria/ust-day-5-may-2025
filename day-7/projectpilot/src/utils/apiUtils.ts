
/**
 * Traduce el código de estado HTTP a un mensaje de error amigable.
 * @param status El código de estado HTTP.
 * @returns Un mensaje de error descriptivo.
 */
function translateStatusToErrorMessage(status: number): string {
    switch (status) {
        case 400:
            return 'Invalid request. Please verify your details.';
        case 401:
            return 'Unauthorized. Please log in again.';
        case 403:
            return 'Prohibited. You do not have permission to perform this action.';
        case 404:
            return 'Resource not found.';
        case 409: // Conflict, útil para casos como registro de usuario existente
            return 'Data conflict. The resource already exists or there is an integrity issue.';
        case 429: // Too Many Requests
            return 'Too many requests. Please wait a moment and try again.';
        case 500:
            return 'Internal server error. Please try again later.';
        case 503: // Service Unavailable
            return 'Service unavailable. The server is temporarily down.';
        default:
            return `An unexpected error has occurred (Code: ${status}). Please try again.`;
    }
}

/**
 * Verifica el estado de la respuesta HTTP. Si no es exitosa (response.ok es false),
 * lanza un error con un mensaje traducido.
 * @param response La respuesta fetch.
 * @returns La respuesta si es exitosa.
 * @throws Un Error con un mensaje amigable si la respuesta no es exitosa.
 */
function checkStatus(response: Response): Response {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.error(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

/**
 * Parsea la respuesta fetch a JSON.
 * @param response La respuesta fetch.
 * @returns La promesa que resuelve con el objeto JSON.
 */
function parseJSON(response: Response) {
    return response.json();
}

/**
 * Una función utilitaria para introducir un retraso artificial en las promesas.
 * Útil para simular latencia de red en desarrollo.
 * @param ms Milisegundos de retraso.
 * @returns Una función que retorna una promesa que resuelve después del retraso.
 */
function delay(ms: number) {
    return function <T>(x: T): Promise<T> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

export { translateStatusToErrorMessage, checkStatus, parseJSON, delay };