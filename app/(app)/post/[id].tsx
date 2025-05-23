import { Alert, Pressable, ScrollView, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { PostModelResponse, PostStatus } from "../../../types/Posts";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { DefaultScreen } from "../../../components/defaultScreen";
import React, { useEffect, useState } from "react";
import CustomDropdown from "../../../components/Dropdown/customDorpdown";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getPostById } from "../../../services/post";
import { getZoneById } from "../../../services/zone";
import { ZoneModel } from "../../../types/zone";

export default function PostDetail() {
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportDescription, setReportDescription] = useState(null);
    const [reportReason, setReportReason] = useState("");
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [post, setPost] = useState<PostModelResponse>(null);
    const [rating, setRating] = useState(0);
    const [zona, setZona] = useState<ZoneModel>(null);


    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();

    const getPost = React.useCallback(async () => {
        const response = await getPostById(id);
        setPost(response);
        const responseZone = await getZoneById(response.zonaId);
        setZona(responseZone);
    }, [id]);

    function openReportModal() {
        setReportModalVisible(true);
    }

    function closeReportModal() {
        setReportModalVisible(false);
        setReportDescription("");
    }
    function openRatingModal() {
        setRatingModalVisible(true);
    }

    function closeRatingModal() {
        setRatingModalVisible(false);
        setRating(0);
    }

    function handleSetRating(value: number) {
        setRating(value);
    }

    function handleSubmitRating() {
        if (Platform.OS === 'web') alert(`Calificación enviada: ${rating} estrellas`)
        else Alert.alert("¡Gracias!", `Calificación enviada: ${rating} estrellas`);
        closeRatingModal();
    }


    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            getPost();
        });

        return focus;
    }, [navigation, getPost]);



    return (
        <DefaultScreen>
            <ScrollView>
                {post && zona &&
                    <View style={styles.card}>
                        <Text style={styles.title}>{post.titulo}</Text>
                        <Text style={styles.label}>Descripción:</Text>
                        <Text style={styles.text}>{post.descripcion}</Text>
                        <View style={styles.line} />
                        <Text style={styles.label}>Publicado por:</Text>
                        <Text style={styles.text}>{post.nombreUsuario}</Text>
                        <Text style={styles.label}>Tipo:</Text>
                        <Text style={styles.text}>{post.tipoPublicacion}</Text>
                        <Text style={styles.label}>Categoría:</Text>
                        <Text style={styles.text}>{post.categoriaServicio}</Text>
                        <Text style={styles.label}>Zona:</Text>
                        <Text style={styles.text}>{`${zona.ciudad || zona.municipio || zona.corregimiento}, ${zona.departamento}, ${zona.pais}`}</Text>
                        <Text style={styles.label}>Estado:</Text>
                        <Text style={styles.text}>{PostStatus[post.estado]}</Text>
                        <Text style={styles.label}>Creado:</Text>
                        <Text style={styles.text}>{new Date(post.fechaCreacion).toLocaleDateString()}</Text>
                        <Text style={styles.label}>Actualizado:</Text>
                        <Text style={styles.text}>{new Date(post.fechaActualizacion).toLocaleDateString()}</Text>
                        <View style={{ height: 10 }} />
                        {post.estado === PostStatus.COMPLETADA && (
                            <View style={styles.buttonContainer}>
                                <Pressable style={GLOBAL_STYLES.button} onPress={openRatingModal}>
                                    <Text style={GLOBAL_STYLES.buttonText}> Calificar </Text>
                                </Pressable>
                            </View>
                        )}
                        {/* {id !== post.usuarioId && post.estado === PostStatus.PUBLICADA && ( */}
                        <View style={styles.buttonContainer}>
                            <Pressable style={GLOBAL_STYLES.button} ><Text style={GLOBAL_STYLES.buttonText}> Generar solicitud </Text></Pressable>
                            <View style={{ height: 10 }} />
                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} onPress={openReportModal} ><Text style={GLOBAL_STYLES.buttonText}> Reportar publicación </Text></Pressable>
                        </View>
                        {/* {id === post.usuarioId && post.estado === PostStatus.PUBLICADA && (
                        <View style={styles.buttonContainer}>
                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} ><Text style={GLOBAL_STYLES.buttonText}> Eliminar publicación </Text></Pressable>
                        </View>)
                    } */}
                    </View>
                }
            </ScrollView>
            <Modal
                visible={ratingModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeRatingModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.ratingModalContent}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16, textAlign: "center" }}>
                            Califica el servicio
                        </Text>
                        <View style={styles.starsRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => handleSetRating(star)}>
                                    <Image
                                        source={
                                            rating >= star
                                                ? require("../../../assets/star-filled.png")
                                                : require("../../../assets/star-outline.png")
                                        }
                                        style={styles.starIcon}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
                            <Pressable
                                style={[GLOBAL_STYLES.button, { flex: 1, marginRight: 8 }]}
                                onPress={handleSubmitRating}
                                disabled={rating === 0}
                            >
                                <Text style={GLOBAL_STYLES.buttonText}>Calificar</Text>
                            </Pressable>
                            <Pressable
                                style={[GLOBAL_STYLES.button, { backgroundColor: "#aaa", flex: 1, marginLeft: 8 }]}
                                onPress={closeRatingModal}
                            >
                                <Text style={GLOBAL_STYLES.buttonText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={reportModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeReportModal}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 20,
                        width: "85%",
                        elevation: 5
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Razón</Text>
                        <CustomDropdown
                            options={['Spam', 'Estafa', 'Otro']}
                            selected={reportReason}
                            onSelect={(value) => setReportReason(value)}
                            placeholder="Escoge una razón"
                        />
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Descripción</Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#e3e4e8",
                                backgroundColor: "#ebeded",
                                borderRadius: 6,
                                minHeight: 80,
                                padding: 10,
                                marginBottom: 20,
                                textAlignVertical: "top"
                            }}
                            multiline
                            numberOfLines={4}
                            placeholder="Describe el motivo del reporte..."
                            value={reportDescription}
                            onChangeText={setReportDescription}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Pressable
                                style={[GLOBAL_STYLES.button, { flex: 1, marginRight: 8 }]}
                                onPress={() => {
                                    if (Platform.OS === "web") alert("Reporte enviado. Gracias por ayudarnos a mantener la comunidad segura.");
                                    else Alert.alert("Reporte enviado", "Gracias por ayudarnos a mantener la comunidad segura.");
                                    closeReportModal();
                                }}
                            >
                                <Text style={GLOBAL_STYLES.buttonText}>Enviar reporte</Text>
                            </Pressable>
                            <Pressable
                                style={[GLOBAL_STYLES.button, { backgroundColor: "#aaa", flex: 1, marginLeft: 8 }]}
                                onPress={closeReportModal}
                            >
                                <Text style={GLOBAL_STYLES.buttonText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        width: 350,
        borderRadius: 8,
        padding: 16,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 24,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    label: {
        fontWeight: "bold",
        marginTop: 8,
        color: "#555",
    },
    text: {
        fontSize: 16,
        color: "#444",
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        marginVertical: 12,
    },
    buttonContainer: {
        marginTop: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    ratingModalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 24,
        width: "85%",
        elevation: 5,
        alignItems: "center"
    },
    starsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
    },
    starIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 4,
    },
});