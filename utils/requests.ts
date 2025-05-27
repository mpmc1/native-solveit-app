import { requestUri } from "../services/const/constants";
import CustomAlert from "./CustomAlert";
import { getProtectedHeaders } from "./protectedApiHeader";
import { userStore } from "../redux/user/userStore";
import { clearUser } from "../redux/user/userSlice";


export async function unauthorizationRequest(urlComplement: string, body: any, headers?: HeadersInit) {
    const response = await fetch(requestUri + urlComplement, { method: 'POST', body: JSON.stringify(body), headers: { ...headers } });
    return await responseCleaning(response);
}

export async function get(urlComplement: string) {
    const response = await fetch(requestUri + urlComplement, { method: 'GET', headers: getProtectedHeaders() });
    return await responseCleaning(response);
}

export async function post(urlComplement: string, body?: any, headers?: HeadersInit, convertToJson = true) {
    const response = await fetch(requestUri + urlComplement, { method: 'POST', body: convertToJson ? JSON.stringify(body) : body, headers: headers ? { ...getProtectedHeaders(true), ...headers } : getProtectedHeaders() });
    return await responseCleaning(response);
}

export async function put(urlComplement: string, body: any, headers?: HeadersInit, convertToJson = true) {
    const response = await fetch(requestUri + urlComplement, { method: 'PUT', body: convertToJson ? JSON.stringify(body) : body, headers: headers ? { ...getProtectedHeaders(true), ...headers } : getProtectedHeaders() });
    return await responseCleaning(response);
}

export async function del(urlComplement: string) {
    const response = await fetch(requestUri + urlComplement, { method: 'DELETE', headers: getProtectedHeaders() });
    return await responseCleaning(response);
}

async function responseCleaning(response: Response) {
    if (response.status === 403) {
        userStore.dispatch(clearUser());
        CustomAlert("Error", "Hubo un error en la autorización, vuelve a iniciar sesión. Si el error persiste, contacta a un administrador", "Hubo un error en la autorización, vuelve a iniciar sesión. Si el error persiste, contacta a un administrador");

        return;
    }
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