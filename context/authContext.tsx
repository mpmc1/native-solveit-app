import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/user/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";
import { login } from "../services/auth";
import { LoginResponse } from "../types/auth";
import { setUser } from "../redux/user/userSlice";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.UserData);
    const [isSessionActive, setIsSessionActive] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        init();
    }, [])

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
                // Token inválido, no hacer nada
            }
            setIsLoading(false);
        }
    }

    const signin = async (email, password) => {
        try {
            const response = await login(email, password);
            const json: LoginResponse = await response.json();
            if (response.status >= 200 && response.status < 300 && json.token?.length > 0) {
                dispatch(setUser({
                    token: json.token,
                    username: json.username,
                    password: password,
                    email: json.email,
                    nombreCompleto: json.nombreCompleto,
                    numeroIdentificacion: json.numeroIdentificacion,
                    tipoIdentificacion: json.tipoIdentificacion,
                    descripcionPerfil: json.descripcionPerfil,
                    telefono: json.telefono
                }));
                Alert.alert("Inicio de sesión", "inicio de sesión exitoso", [{ text: "OK" }]);
                router.push("/home");
            } else {
                Alert.alert("Inicio de sesión", "Error al iniciar sesión", [{ text: "OK" }]);
            }


        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo iniciar sesión. Por favor, verifica tus credenciales.");
        }
    }
    const signout = () => {

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
