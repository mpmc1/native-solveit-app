import { CreatePolicyRQ } from "../types/policy";
import { del, get, post, put } from "../utils/requests";
import { requestUri } from "./const/constants";
import { getProtectedHeaders } from "../utils/protectedApiHeader";

const complementURL = "polizas"

export async function createPolicy(body: CreatePolicyRQ, archivo: Blob) {

    const formData = new FormData();
    const jsonBody = await JSON.stringify(body);
    formData.append("poliza", new Blob([jsonBody], { type: "application/json" }));

    if (archivo) {
        formData.append("archivo", archivo, "archivo.pdf");
    }

    return await post(`${complementURL}`, formData, { ...getProtectedHeaders(true) }, false);
}

export async function getSelfPolicy() {
    return await get(`${complementURL}/mis-polizas`)
}

export async function getPolicyById(id: string) {
    return await get(`${complementURL}/${id}`)
}

export async function getPolicyByUserId(idUsuario: string) {
    return await get(`${complementURL}/usuario/${idUsuario}`)
}

export async function updatePolicy(id: string, body: CreatePolicyRQ, archivo?: Blob) {
    const formData = new FormData();
    const jsonBody = await JSON.stringify(body);
    formData.append("poliza", new Blob([jsonBody], { type: "application/json" }));
    if (archivo) {
        formData.append("archivo", archivo, "archivo.pdf");
    }
    return await put(`${complementURL}/${id}`, formData, { ...getProtectedHeaders(true) }, false);
}

export async function deletePolicy(id) {
    return await del(`${complementURL}/${id}`)
}

export async function downloadPolicy(id: string) {
    return await fetch(`${requestUri}${complementURL}/${id}/descargar`, { method: 'GET', headers: getProtectedHeaders(true) }).then(response => {
        if (!response.ok) {
            throw new Error("Error al descargar el archivo");
        }

        // Extraer nombre de archivo del header
        const disposition = response.headers.get("Content-Disposition");
        let filename = "archivo.pdf"; // valor por defecto

        if (disposition && disposition.includes("filename=")) {
            const match = disposition.match(/filename="?(.+)"?/);
            if (match.length > 1) {
                filename = match[1];
            }
        }

        return response.blob().then(blob => ({ blob, filename }));
    })
}