import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import CustomDropdown from "../components/Dropdown/customDorpdown";
import { GLOBAL_STYLES } from "../styles/styles";
import { DefaultScreen } from "../components/defaultScreen";
import { register } from "../services/auth";
import { useNavigation, useRouter } from "expo-router";

export default function Register() {
    const [selectedIdType, setSelectedIdType] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [idNumber, setIdNumber] = useState(null);
    const [description, setDescription] = useState(null);

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
        // Validate inputs
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
        
        if (!fullName || fullName === "" || !email || email == "" || !phone || phone === "" || !password || password === "" || !confirmPassword || confirmPassword === "" || !idNumber || idNumber === "" || !selectedIdType || selectedIdType === "") {
            Alert.alert("Por favor, completa todos los campos.", "Asegúrate de que no haya campos vacíos.", [
                { text: "OK" },
            ]);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Las contraseñas no coinciden.","Por favor, verifica e intenta de nuevo.", [
                { text: "OK", onPress: () => setConfirmPassword("") },
            ]);
            return;
        }
        
        await register(bodyRequest).then((response) => {
            
            if (response.status>=200 && response.status<300) {
                Alert.alert("Usuario registrado con éxito", '', [{ text: 'OK' }]);
                router.push("/");
            } else {
                Alert.alert("Error al registrar el usuario."," Por favor, inténtalo de nuevo más tarde.", '', [{ text: 'OK' }]);
                return;
            }
            
        }).catch((error) => {
            console.log(error);
            Alert.alert("Error al registrar el usuario."," Por favor, inténtalo de nuevo más tarde.", [{ text: 'OK' }]);
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
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    minHeight: 550,
    width: 300,
    borderRadius: 10,
    padding: 20,
    },
});