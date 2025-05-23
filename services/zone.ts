import { CreateZone } from '../types/zone';
import { get, post, put } from '../utils/requests';

const complementURL = `zonas`

export async function getZone() {
    return await get(complementURL);
}

export async function getZoneById(id: string) {
    return await get(`${complementURL}/${id}`)
}

export async function createZone(body: CreateZone) {
    return await post(complementURL, body)
}

export async function updateZone(body: CreateZone) {
    return await put(complementURL, body)
}
