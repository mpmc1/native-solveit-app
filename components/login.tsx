import { Link, Redirect, useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";
import { DefaultScreen } from "./defaultScreen";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

export default function Login() {

    const [email, setEmail] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);

    const navigation = useNavigation();

    const { signin, isSessionActive } = useAuth();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail(null);
            setPassword(null);
        });
        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        signin(email, password);
    }

    if (isSessionActive) return (<Redirect href="/home" />);

    return (
        <>
            <DefaultScreen>
                <View style={styles.formContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={GLOBAL_STYLES.title}>Bienvenido a SolveIt</Text>
                        <TextInput value={email} onChangeText={setEmail} style={GLOBAL_STYLES.input} placeholder="Correo" keyboardType="email-address" autoComplete="email" inputMode="email" />
                        <TextInput value={password} onChangeText={setPassword} style={GLOBAL_STYLES.input} placeholder="Contraseña" secureTextEntry={true} autoComplete="password" inputMode="text" />
                        <Pressable style={GLOBAL_STYLES.button} onPress={handleLogin} ><Text style={GLOBAL_STYLES.buttonText}> Iniciar sesión </Text></Pressable>
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