import { CreatePostRequest, UpdatePostRequest } from '../types/Posts';
import { get, post, put } from '../utils/requests';

const complementURL = `publicaciones`

export async function listPost() {
    return await get(complementURL)
}

export async function createPostRQ(rqBody: CreatePostRequest) {
    return await post(complementURL, rqBody)
}
export async function updatePost(rqBody: UpdatePostRequest) {
    return await put(complementURL, rqBody)
}

export async function getSelfPost() {
    return await get(`${complementURL}/mis-publicaciones`)
}

export async function getPostById(id: string) {
    return await get(`${complementURL}/${id}`)
}

export async function reportPost(id: string, reason: string) {
    return await post(`${complementURL}/${id}/reportar`, { motivo: reason })
}

export async function cancelPost(id: string) {
    return await post(`${complementURL}/${id}/cancelar`)
}

export async function getRateByEmail(email: string) {
    return await get("calificaciones?" + new URLSearchParams({ email: email }).toString())
}