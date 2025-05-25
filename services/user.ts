import { UpdateUserRQ } from '../types/user';
import { post, put } from '../utils/requests';

const complementURL = 'usuarios'

export async function rateUser(body: { id: number, calificacion: number }) {
    return await post(`${complementURL}/calificar`, body);
}

export async function updateUserInfo(body: UpdateUserRQ) {
    return await put(`${complementURL}/perfil`, body);
}