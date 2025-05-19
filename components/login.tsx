import { Link, useNavigation, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";
import { DefaultScreen } from "./defaultScreen";
import { useEffect, useState } from "react";
import { login } from "../services/auth";

export default function Login() {

    const [email, setEmail] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const router = useRouter();

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail(null);
            setPassword(null);
        });
        return unsubscribe;
    }, [navigation]);

    const loginFetch = async () => {
        await login(email, password).then(response => {
            console.log("\n\n\n\n", response, "\n\n\n\n");
            if (response.status >= 200 && response.status < 300) {
                Alert.alert("Inicio de sesión", "inicio de sesión exitoso", [{ text: "OK", onPress: () => console.log("") }]);
                router.push("/home");
            } else {
                Alert.alert("Inicio de sesión", "Error al iniciar sesión", [{ text: "OK", onPress: () => console.log("") }]);
            }

        })

    }
    return (
        <>
            <DefaultScreen>
                <View style={styles.formContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={GLOBAL_STYLES.title}>Bienvenido a SolveIt</Text>
                        <TextInput value={email} onChangeText={setEmail} style={GLOBAL_STYLES.input} placeholder="Correo" keyboardType="email-address" autoComplete="email" inputMode="email" />
                        <TextInput value={password} onChangeText={setPassword} style={GLOBAL_STYLES.input} placeholder="Contraseña" secureTextEntry={true} autoComplete="password" inputMode="text" />
                        <Pressable style={GLOBAL_STYLES.button} onPress={loginFetch} ><Text style={GLOBAL_STYLES.buttonText}> Iniciar sesión </Text></Pressable>
                    </View>
                    <View>
                        <Text>¿No tienes cuenta? <Link href="/register" asChild ><Text style={{ color: '#007BFF' }}>Regístrate</Text></Link></Text>

                    </View>
                </View>
            </DefaultScreen>
        </>
    )

}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        maxHeight: 300,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
});