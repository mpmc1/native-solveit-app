import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import CustomDropdown from "../components/Dropdown/customDorpdown";
import { GLOBAL_STYLES } from "../styles/styles";
import { Link } from "expo-router";

export default function Register() {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <View style={styles.container}>
            <View style={{width:'100%', alignItems: 'flex-start', paddingLeft: 15, paddingTop: 15, marginBottom: 20}}>
                <Link href="/" asChild><Text style={{color: '#007BFF'}}> &lt; Regresar</Text></Link>
            </View>
            <Text style={GLOBAL_STYLES.title}>Regístrate</Text>
            <TextInput style={GLOBAL_STYLES.input} placeholder="Nombre" autoComplete="name" />
            <TextInput style={GLOBAL_STYLES.input} placeholder="Correo electrónico" autoComplete="email" inputMode="email" />
            <TextInput style={GLOBAL_STYLES.input} placeholder="Número telefónico" keyboardType="numeric" inputMode="tel" />
            <TextInput style={GLOBAL_STYLES.input} placeholder="Contraseña" secureTextEntry={true} autoComplete="new-password" />
            <TextInput style={GLOBAL_STYLES.input} placeholder="Confirmar contraseña" secureTextEntry={true} autoComplete="new-password" />
            <CustomDropdown
                options={['Jardinería', 'Hogar']}
                selected={selectedOption}
                onSelect={(value) => setSelectedOption(value)}
                placeholder="Elige una opción"
            />
            <Button title="Registrar" onPress={() => { }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
        backgroundColor: '#f5fcff',
        maxHeight: 500,
        width: 300,
        borderRadius: 10,
    },
  });