import { userStore } from "../redux/user/userStore";

export function getProtectedHeaders(justAuth?: boolean): HeadersInit {

    const token = userStore.getState().UserData.token;

    if (justAuth && token) return { 'Authorization': `Bearer ${token}` };
    if (token) return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    else return {
        'Content-Type': 'application/json'
    };
};