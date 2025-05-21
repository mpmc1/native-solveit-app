import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import CustomDropdown from "../components/Dropdown/customDorpdown";
import { GLOBAL_STYLES } from "../styles/styles";
import { DefaultScreen } from "../components/defaultScreen";
import { register } from "../services/auth";
import { useNavigation, useRouter } from "expo-router";
import { ErrorResponse, RegisterResponse } from "../types/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";


export default function Register() {
    const [selectedIdType, setSelectedIdType] = useState<string>(null);
    const [fullName, setFullName] = useState<string>(null);
    const [email, setEmail] = useState<string>(null);
    const [phone, setPhone] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const [confirmPassword, setConfirmPassword] = useState<string>(null);
    const [idNumber, setIdNumber] = useState<string>(null);
    const [description, setDescription] = useState<string>(null);

    const dispatch = useDispatch();

    const router = useRouter();

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setFullName(null);
            setEmail(null);
            setPhone(null);
            setPassword(null);
            setConfirmPassword(null);
            setIdNumber(null);
            setDescription(null);
            setSelectedIdType(null);
        });
        return unsubscribe;
    }, [navigation]);

    const userRegister = async () => {


        if (!fullName || fullName === "" || !email || email == "" || !phone || phone === "" || !password || password === "" || !confirmPassword || confirmPassword === "" || !idNumber || idNumber === "" || !selectedIdType || selectedIdType === "") {
            Alert.alert("Por favor, completa todos los campos.", "Asegúrate de que no haya campos vacíos.", [
                { text: "OK" },
            ]);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Las contraseñas no coinciden.", "Por favor, verifica e intenta de nuevo.", [
                { text: "OK", onPress: () => setConfirmPassword("") },
            ]);
            return;
        }
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

        const isValid = regex.test(password);

        if (!isValid) {
            Alert.alert("La contraseña no cumple con las condiciones", "La contraseña debe tener mínimo un número, una letra en mayúscula, un caracter especial (*,!,\",#,$,%,$,@,^,(,). y por lo menos 8 caracteres)", [{ text: "Ok" }]);
            return;
        }

        const bodyRequest = {
            username: email,
            password: password,
            email: email,
            nombreCompleto: fullName,
            numeroIdentificacion: idNumber,
            tipoIdentificacion: selectedIdType,
            descripcionPerfil: description,
            telefono: phone,
        }
        await register(bodyRequest).then(async (response) => {
            const json = await response.json();

            if (response.status >= 200 && response.status < 300 && json.token) {
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
                Alert.alert("Usuario registrado con éxito", '', [{ text: 'OK' }]);
                router.push("/home");
            } else {
                Alert.alert("Error al registrar el usuario.", json.message, [{ text: 'OK' }]);
                return;
            }

        }).catch((error) => {
            console.log(error);
            Alert.alert("Error al registrar el usuario.", " Por favor, inténtalo de nuevo más tarde.", [{ text: 'OK' }]);
        });
    }


    return (
        <DefaultScreen>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={GLOBAL_STYLES.title}>Regístrate</Text>
                    <TextInput value={fullName} onChangeText={setFullName} style={GLOBAL_STYLES.input} placeholder="Nombre Completo" autoComplete="name" />
                    <TextInput value={email} onChangeText={setEmail} style={GLOBAL_STYLES.input} placeholder="Correo electrónico" autoComplete="email" inputMode="email" />
                    <TextInput value={phone} onChangeText={setPhone} style={GLOBAL_STYLES.input} placeholder="Número de contacto" keyboardType="numeric" inputMode="tel" />
                    <TextInput value={password} onChangeText={setPassword} style={GLOBAL_STYLES.input} placeholder="Contraseña" secureTextEntry={true} autoComplete="new-password" />
                    <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={GLOBAL_STYLES.input} placeholder="Confirmar contraseña" secureTextEntry={true} autoComplete="new-password" />
                    <CustomDropdown
                        options={['Cédula de ciudadanía', 'Cédula de extranjería', 'Pasaporte', 'PPT', 'PEP', 'DIE']}
                        selected={selectedIdType}
                        onSelect={(value) => setSelectedIdType(value)}
                        placeholder="Tipo de identificación"
                    />
                    <TextInput value={idNumber} onChangeText={setIdNumber} style={GLOBAL_STYLES.input} placeholder="Número de identificación" keyboardType="numeric" />
                    <TextInput value={description} onChangeText={setDescription} style={GLOBAL_STYLES.input} placeholder="Descripción" />
                    <Pressable style={GLOBAL_STYLES.button} onPress={userRegister} ><Text style={GLOBAL_STYLES.buttonText}> Registrar </Text></Pressable>
                </View>
            </ScrollView>
        </DefaultScreen>

    )
}
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
        minHeight: 550,
        width: 300,
        borderRadius: 10,
        padding: 20,
    },
});