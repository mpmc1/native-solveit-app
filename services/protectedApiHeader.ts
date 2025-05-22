import { userStore } from "../redux/user/userStore";

const token = userStore.getState().UserData.token;
export const PROTECTED_API_HEADRES = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
};