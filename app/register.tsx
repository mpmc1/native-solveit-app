import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import CustomDropdown from "../components/Dropdown/customDorpdown";
import { GLOBAL_STYLES } from "../styles/styles";
import { DefaultScreen } from "../components/defaultScreen";
import { register } from "../services/auth";
import { useNavigation, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import CustomAlert from "../utils/CustomAlert";


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

        if (!fullName || fullName === "" || !email || email === "" || !phone || phone === "" || !password || password === "" || !confirmPassword || confirmPassword === "" || !idNumber || idNumber === "" || !selectedIdType || selectedIdType === "") {
            const alertTitleEmptyFields = "Por favor, completa todos los campos.";
            const alertMessageEmptyFields = "Asegúrate que no haya campos vacíos.";
            CustomAlert(alertTitleEmptyFields, alertMessageEmptyFields, alertMessageEmptyFields);
            return;
        }

        if (password !== confirmPassword) {
            const differentPasswordsAlertTitle = "Las contraseñas no coinciden."
            const differentPasswordsAlertMessage = "Por favor, verifica e intenta de nuevo.";
            CustomAlert(differentPasswordsAlertTitle, differentPasswordsAlertMessage, differentPasswordsAlertMessage);
            return;
        }
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

        const isValid = regex.test(password);

        if (!isValid) {
            const passwordConditionsAlertTitle = "La contraseña no cumple con las condiciones";
            const passwordConditionsAlertMessage = "La contraseña debe tener mínimo un número, una letra en mayúscula, un caracter especial (*,!,\",#,$,%,$,@,^,(,). y por lo menos 8 caracteres)"
            CustomAlert(passwordConditionsAlertTitle, passwordConditionsAlertMessage, passwordConditionsAlertMessage);
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
        const response = await register(bodyRequest);

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
                telefono: response.telefono
            }));
            const successUserSignUpAlertTitle = "Usuario registrado con éxito";
            const successUserSignUpAlertMessage = "Bienvenido a SolveIt";
            CustomAlert(successUserSignUpAlertTitle, successUserSignUpAlertMessage, successUserSignUpAlertMessage);
            router.push("/home");
        }
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