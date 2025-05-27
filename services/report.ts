import { get, post } from "../utils/requests"

const complementURL = "reportes"

export async function adminList() {
    return await get(complementURL);
}

export async function disablePost(postId: string) {
    return await post(`${complementURL}/publicacion/${postId}/bloquear`);
}

export async function enablePost(postId: string) {
    return await post(`${complementURL}/publicacion/${postId}/habilitar`);
}

export async function getReportById(reportId: string) {
    return await get(`${complementURL}/${reportId}`);
}