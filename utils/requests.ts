import { requestUri } from "../services/const/constants";
import CustomAlert from "./CustomAlert";
import { getProtectedHeaders } from "./protectedApiHeader";


export async function unauthorizationRequest(urlComplement: string, body: any, headers?: HeadersInit) {
    const response = await fetch(requestUri + urlComplement, { method: 'POST', body: JSON.stringify(body), headers: { ...headers } });
    return await responseCleaning(response);
}

export async function get(urlComplement: string) {
    const response = await fetch(requestUri + urlComplement, { method: 'GET', headers: getProtectedHeaders() });
    return await responseCleaning(response);
}

export async function post(urlComplement: string, body?: any) {
    const response = await fetch(requestUri + urlComplement, { method: 'POST', body: JSON.stringify(body), headers: getProtectedHeaders() });
    return await responseCleaning(response);
}

export async function put(urlComplement: string, body: any) {
    const response = await fetch(requestUri + urlComplement, { method: 'PUT', body: JSON.stringify(body), headers: getProtectedHeaders() });
    return await responseCleaning(response);
}

export async function del(urlComplement: string) {
    const response = await fetch(requestUri + urlComplement, { method: 'DELETE', headers: getProtectedHeaders() });
    return await responseCleaning(response);
}

async function responseCleaning(response: Response) {
    try {
        const json = await response.json();
        if (response.status >= 200 && response.status < 300) {
            return json;
        } else {
            CustomAlert("Ocurrió un error durante la petición", json.message, json.message)
            return;
        }
    } catch (error) {
        console.error(error);
        CustomAlert("Error", "Ocurrió un error. por favor contacte a un administrador", "Hubo un error. por favor contacte a un administrador");
        return
    }

}