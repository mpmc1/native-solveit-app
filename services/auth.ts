import { UserModel } from "../types/auth";

export async function login(username: string, password: string) {
    return await fetch(process.env.REQUESTS_URI + 'api/v1/auth/login', { method: 'POST', body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } })
}

export async function register(body: UserModel) {
    return await fetch(process.env.REQUESTS_URI + 'api/v1/auth/register', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })

}

export async function logout() {

}