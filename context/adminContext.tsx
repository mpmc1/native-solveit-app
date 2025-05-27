import { createContext, useContext, useEffect, useCallback } from "react";
import { RootState } from "../redux/user/userStore";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {

    const { role } = useSelector((state: RootState) => state.UserData);
    const router = useRouter();

    const checkRole = useCallback(async () => {
        if (role === undefined || role === null) return;
        console.log(role);

        if (role !== "ADMIN") {
            router.back();
        }
    }, [role, router]);

    useEffect(() => {
        checkRole();
    }, [role, checkRole]);

    const contextData = { checkRole }

    return (
        <AdminContext.Provider value={contextData}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AdminContext);
}