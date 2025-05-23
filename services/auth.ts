import { UserModel } from "../types/auth";
import { post, unauthorizationRequest } from "../utils/requests";


export async function login(username: string, password: string) {
    return await unauthorizationRequest("auth/login", { username, password }, { "Content-Type": "application/json" })
}

export async function register(body: UserModel) {
    return await unauthorizationRequest("auth/register", body, { "Content-Type": "application/json" })

}

export async function logout() {
    return await post("auth/logout")
}