import Constants from 'expo-constants';
import { PROTECTED_API_HEADRES } from './consts/protectedApiHeader';

const API_URL = "api/v1/publicaciones"
const { REQUESTS_URI } = Constants.expoConfig.extra;


export async function listar() {
    return await fetch(REQUESTS_URI + API_URL, { method: 'GET', headers: PROTECTED_API_HEADRES })
}