import { UserModel } from "../types/autuh";

export function login(username: string, password: string) {
    return fetch('http://192.168.20.29:9595/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } })
}

export function register(body: UserModel) {
    return fetch('http://192.168.20.29:9595/api/v1/auth/register', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })

}