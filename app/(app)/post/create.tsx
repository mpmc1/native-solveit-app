import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { DefaultScreen } from "../../../components/defaultScreen";
import { GLOBAL_STYLES } from "../../../styles/styles";
import CustomDropdown from "../../../components/Dropdown/customDorpdown";
import { createPost } from "../../../services/post";
import { PostType } from "../../../types/Posts";
import { ZoneModel } from "../../../types/zone";
import { getZone } from "../../../services/zone";
import CustomAlert from "../../../utils/CustomAlert";

export default function CreatePost() {
    const [titulo, setTitulo] = useState<string>(null);
    const [descripcion, setDescripcion] = useState<string>(null);
    const [tipoPublicacion, setTipoPublicacion] = useState<PostType>(null);
    const [categoriaServicio, setCategoriaServicio] = useState<string>(null);
    const [zonaId, setZonaId] = useState<number>(null);
    const [zonas, setZonas] = useState<ZoneModel[]>([]);

    const router = useRouter();
    const navigation = useNavigation();

    const createPost = async () => {
        const result = await createPost({ categoriaServicio, descripcion, tipoPublicacion, titulo, zonaId });

        if (result) {
            CustomAlert("Publicación creada con éxito", "Tu publicación ha sido creada exitosamente.", "Tu publicación ha sido creada exitosamente.");
            router.push("/home");
        }
    }

    const getZonas = async () => {
        const response = await getZone();
        if (response) {
            setZonas(response);
        }

    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setTitulo(null);
            setDescripcion(null);
            setTipoPublicacion(null);
            setCategoriaServicio(null);
            setZonaId(null);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getZonas();
    }, []);




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
                            options={[PostType.OFERTA, PostType.DEMANDA]}
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

                        <CustomDropdown
                            options={zonas}
                            selected={zonaId}
                            onSelect={(value) => setZonaId(value)}
                            placeholder="Ubicación"
                            withId={true}
                            isZone={true}
                        />
                        <Pressable style={GLOBAL_STYLES.button} onPress={createPost}>
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