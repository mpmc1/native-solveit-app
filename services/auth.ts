import { UserModel } from "../types/auth";
import { PROTECTED_API_HEADRES } from "./protectedApiHeader";
import Constants from 'expo-constants';

const { REQUESTS_URI } = Constants.expoConfig.extra;

export async function login(username: string, password: string) {
    return await fetch(REQUESTS_URI + 'api/v1/auth/login', { method: 'POST', body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } })
}

export async function register(body: UserModel) {
    return await fetch(REQUESTS_URI + 'api/v1/auth/register', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })

}

export async function logout() {
    return await fetch(REQUESTS_URI + 'api/v1/auth/logout', { method: 'POST', headers: PROTECTED_API_HEADRES })
}