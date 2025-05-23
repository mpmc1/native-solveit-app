import { UpdateUserRQ } from '../types/user';
import { post, put } from '../utils/requests';

const complementURL = 'usuarios'

export async function rateUser() {
    return await post(`${complementURL}/calificar`);
}

export async function updateUserInfo(body: UpdateUserRQ) {
    return await put(`${complementURL}/calificar`, body);
}