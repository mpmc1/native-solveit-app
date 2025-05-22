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
        try {
            const response = await login(email, password);
            const json = await response.json();
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
                setIsSessionActive(true);
                if (Platform.OS === "web") alert("Inicio de sesión exitoso")
                else Alert.alert("Inicio de sesión", "Inicio de sesión exitoso", [{ text: "OK" }]);
                router.push("/home");
            } else {
                if (Platform.OS === "web") alert(json.message)
                else Alert.alert("Error al iniciar sesión", json.message, [{ text: "OK" }]);
            }


        } catch (error) {
            console.error(error);
            if (Platform.OS === "web") alert("Hubo un error inesperado. Vuelve a intentarlo")
            Alert.alert("Hubo un error inesperado.", "Vuelve a intentarlo.");
        }
    }
    const signout = async () => {
        try {
            const response = await logout();
            const json = await response.json();
            console.log(json);

            if (json.success) {
                dispatch(clearUser());
                setIsSessionActive(false);
                router.push('/')
            }
            else {
                if (Platform.OS === 'web') alert('Error al cerrar sesión: ' + json.message);
                else Alert.alert('Error al cerrar sesión', json.message);
            }

        } catch (e) {
            console.log(e);
            if (Platform.OS === 'web') alert('Hubo un error inesperado al cerrar sesión');
            else Alert.alert('Hubo un error inesperado al cerrar sesión');
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
