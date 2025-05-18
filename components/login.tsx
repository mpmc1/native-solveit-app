import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";

export default function Login() {
    return (
        <>
            <View style={styles.container}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={GLOBAL_STYLES.title}>Bienvenido a SolveIt</Text>
                    <TextInput style={GLOBAL_STYLES.input} placeholder="Correo" keyboardType="email-address" autoComplete="email" inputMode="email" />
                    <TextInput style={GLOBAL_STYLES.input} placeholder="Contraseña" secureTextEntry={true} autoComplete="password" inputMode="text" />
                    <Pressable style={GLOBAL_STYLES.button} onPress={() => { }} ><Text style={GLOBAL_STYLES.buttonText}> Iniciar sesión </Text></Pressable>
                </View>
                <View>
                    <Text>¿No tienes cuenta? <Link href="/register" asChild ><Text style={{ color: '#007BFF' }}>Regístrate</Text></Link></Text>

                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 300,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,

    }
});