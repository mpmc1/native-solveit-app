import { CreateRequestRQ } from "../types/request";
import { get, post } from "../utils/requests";

const complementURL = "solicitud";

export async function createRequest(body: CreateRequestRQ) {
    return await post(complementURL, body);
}
export async function listRecievedRequests() {
    return await get(`${complementURL}/mis-publicaciones`);
}
export async function listSendRequests() {
    return await get(`${complementURL}/mis-solicitud`);
}
export async function listRequestsByPostId(postId: string) {
    return await get(`${complementURL}/publicacion/${postId}`);
}
export async function getRequestById(requestId: string) {
    return await get(`${complementURL}/${requestId}`);
}
export async function acceptRequest(requestId: string) {
    return await get(`${complementURL}/${requestId}/aceptar`);
}
export async function rejectRequest(requestId: string) {
    return await get(`${complementURL}/${requestId}/rechazar`);
}
export async function finishRequest(requestId: string) {
    return await get(`${complementURL}/${requestId}/finalizar`);
}