import { userStore } from "../redux/user/userStore";

export function getProtectedHeaders(): HeadersInit {

    const token = userStore.getState().UserData.token;

    if (token) return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    else return {
        'Content-Type': 'application/json'
    };
};