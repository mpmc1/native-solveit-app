import { del, get, put } from "../utils/requests";

const complementURL = "polizas"

export async function getSelfPolicy() {
    return await get(`${complementURL}/mis-polizas`)
}

export async function getPolicyById(id: string) {
    return await get(`${complementURL}/${id}`)
}

export async function getPolicyByUserId(idUsuario: string) {
    return await get(`${complementURL}/usuario/${idUsuario}`)
}

export async function updatePolicy(id: string, body) {
    return await put(`${complementURL}/${id}`, body)
}

export async function deletePolicy(id) {
    return await del(`${complementURL}/${id}`)
}

export async function downloadPolicy(id: string) {
    return await get(`${complementURL}/${id}/descargar`)
}