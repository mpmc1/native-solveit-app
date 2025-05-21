import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { DefaultScreen } from "../../../components/defaultScreen";
import { GLOBAL_STYLES } from "../../../styles/styles";
import CustomDropdown from "../../../components/Dropdown/customDorpdown";

export default function CreatePost() {
    const [titulo, setTitulo] = useState<string>(null);
    const [descripcion, setDescripcion] = useState<string>(null);
    const [tipoPublicacion, setTipoPublicacion] = useState<string>(null);
    const [categoriaServicio, setCategoriaServicio] = useState<string>(null);
    const [ubicacion, setUbicacion] = useState<string>(null);

    const router = useRouter();

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setTitulo(null);
            setDescripcion(null);
            setTipoPublicacion(null);
            setCategoriaServicio(null);
            setUbicacion(null);

        });
        return unsubscribe;
    }, [navigation]);




    return (
        <DefaultScreen>
            <ScrollView >
                <View style={styles.globContainer}>
                    <View style={[styles.formContainer, { gap: 10 }]}>
                        <Text style={GLOBAL_STYLES.title}>Crear publicación</Text>
                        <TextInput
                            style={GLOBAL_STYLES.input}
                            placeholder="Título"
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <TextInput
                            style={[GLOBAL_STYLES.input, { height: 80 }]}
                            placeholder="Descripción"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            multiline
                        />

                        <CustomDropdown
                            options={['Oferta', 'Solicitud']}
                            selected={tipoPublicacion}
                            onSelect={(value) => setTipoPublicacion(value)}
                            placeholder="Tipo de publicación"
                        />

                        <CustomDropdown
                            options={['Jardinería', 'Hogar']}
                            selected={categoriaServicio}
                            onSelect={(value) => setCategoriaServicio(value)}
                            placeholder="Categoría de servicio"
                        />

                        <TextInput
                            style={GLOBAL_STYLES.input}
                            placeholder="Ubicación"
                            value={ubicacion}
                            onChangeText={setUbicacion}
                        />
                        <Pressable style={GLOBAL_STYLES.button} onPress={() => {
                            Alert.alert("Publicación creada con éxito", "Tu publicación ha sido creada exitosamente.", [{ text: "OK" }]);
                            router.push("/home");
                        }}>
                            <Text style={GLOBAL_STYLES.buttonText}>Crear publicación</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
        maxHeight: 500,
        width: 300,
        borderRadius: 10,
        padding: 20,
    },
    globContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 700,
    },
})