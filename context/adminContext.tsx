import { createContext, useContext, useEffect } from "react";
import { RootState } from "../redux/user/userStore";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {

    const { role } = useSelector((state: RootState) => state.UserData);
    const router = useRouter();

    useEffect(() => {
        checkRole();
    })

    const checkRole = async () => {
        console.log(role);

        if (role !== "ADMIN") {
            router.back();
        }
    }

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