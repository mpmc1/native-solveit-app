import { reqURI } from './../globContst';
const API_URL = reqURI + "api/v1/publicaciones"

export async function listar() {
    return await fetch(API_URL, { method: 'GET' })
}