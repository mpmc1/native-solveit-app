import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/user/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Platform, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";
import { login, logout } from "../services/auth";
import { clearUser, setUser } from "../redux/user/userSlice";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.UserData);
    const [isSessionActive, setIsSessionActive] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        init();
    })

    const init = () => {
        if (token) {
            try {

                const decoded: { exp?: number } = jwtDecode(token);
                if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                    setIsSessionActive(true);
                } else {
                    setIsSessionActive(false);
                }
            } catch (e) {
                console.error(e);

            }
        }
        else {
            setIsSessionActive(false);
        }
        setIsLoading(false);
    }

    const signin = async (email, password) => {
        const response = await login(email, password);

        if (response) {
            dispatch(setUser({
                token: response.token,
                username: response.username,
                password: password,
                email: response.email,
                nombreCompleto: response.nombreCompleto,
                numeroIdentificacion: response.numeroIdentificacion,
                tipoIdentificacion: response.tipoIdentificacion,
                descripcionPerfil: response.descripcionPerfil,
                telefono: response.telefono,
                role: response.role
            }));
            setIsSessionActive(true);
            if (Platform.OS === "web") alert("Inicio de sesión exitoso")
            else Alert.alert("Inicio de sesión", "Inicio de sesión exitoso", [{ text: "OK" }]);
            router.push("/home");
        }
    }
    const signout = async () => {
        const response = await logout();

        if (response) {
            dispatch(clearUser());
            setIsSessionActive(false);
            router.push('/')
        }
    }

    const contextData = { signin, signout, isSessionActive }

    return (
        <AuthContext.Provider value={contextData}>
            {isLoading
                ? <SafeAreaView>
                    <View style={{ width: '100%', height: "100%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={GLOBAL_STYLES.title}>Cargando ...</Text>
                    </View>
                </SafeAreaView>
                : children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}
