import { Pressable, ScrollView, StyleSheet, Text, View, Modal, TextInput } from "react-native";
import { PostModelResponse, PostStatus } from "../../../types/Posts";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { DefaultScreen } from "../../../components/defaultScreen";
import React, { useEffect, useState } from "react";
import CustomDropdown from "../../../components/Dropdown/customDorpdown";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { cancelPost, getPostById, reportPost } from "../../../services/post";
import { createRequest } from "../../../services/request";
import CustomAlert from "../../../utils/CustomAlert";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/user/userStore";
import { jwtDecode } from "jwt-decode";
import { CreateRequestRQ } from "../../../types/requests";

export default function PostDetail() {
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportDescription, setReportDescription] = useState(null);
    const [reportReason, setReportReason] = useState("");
    const [post, setPost] = useState<PostModelResponse>(null);
    const [requestDescription, setRequestDescription] = useState<string>(null);
    const [myToken, setMyToken] = useState<string>(null);
    const [showRequestModal, setShowRequestModal] = useState<boolean>(null);


    const { id } = useLocalSearchParams<{ id: string }>();
    const { token } = useSelector((state: RootState) => state.UserData)
    const navigation = useNavigation();
    const router = useRouter();

    const getPost = React.useCallback(async () => {
        const response = await getPostById(id);
        setPost(response);
    }, [id]);

    function openReportModal() {
        setReportModalVisible(true);
    }

    function closeReportModal() {
        setReportModalVisible(false);
        setReportDescription("");
    }

    const handleGenerateRequest = async () => {
        const bodyRequest: CreateRequestRQ = {
            descripcion: requestDescription,
            publicacionId: id,
            titulo: post.titulo,
        }
        const response = createRequest(bodyRequest);
        if (response) {
            CustomAlert("Solicitud generada", "Tu solicitud ha sido generada con éxito", "Tu solicitud ha sido generada con éxito");
        }
    }

    const handleCancelPost = async () => {
        const response = await cancelPost(id);
        if (response) {
            CustomAlert("Publicación eliminada", "Tu publicación ha sido eliminada con éxito", "Tu publicación ha sido eliminada con éxito");
            router.push("/home");
        }
    }

    const handleReportPost = async () => {

        const response = await reportPost(post.id.toString(), reportDescription)

        if (response) CustomAlert("Reporte enviado", "Gracias por ayudarnos a mantener la comunidad segura", "Reporte enviado. Gracias por ayudarnos a mantener la comunidad segura.");
        closeReportModal();
    }


    useEffect(() => {
        const focus = navigation.addListener('focus', () => {

            const decodedToken = jwtDecode(token);
            //@ts-ignore
            setMyToken(decodedToken.UserId);

            getPost();
        });

        return focus;
    }, [navigation, getPost, token]);



    return (
        <DefaultScreen>
            <ScrollView>
                {post &&
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
                        <Text style={styles.text}>{post.ubicacionCompleta}</Text>
                        <Text style={styles.label}>Estado:</Text>
                        <Text style={styles.text}>{PostStatus[post.estado]}</Text>
                        <Text style={styles.label}>Creado:</Text>
                        <Text style={styles.text}>{new Date(post.fechaCreacion).toLocaleDateString()}</Text>
                        <Text style={styles.label}>Actualizado:</Text>
                        <Text style={styles.text}>{new Date(post.fechaActualizacion).toLocaleDateString()}</Text>
                        <View style={{ height: 10 }} />
                        {Number(myToken) !== post.usuarioId && post.estado === PostStatus.PUBLICADA && (
                            <View style={styles.buttonContainer}>
                                <Pressable style={GLOBAL_STYLES.button} onPress={() => setShowRequestModal(true)} ><Text style={GLOBAL_STYLES.buttonText}> Generar solicitud </Text></Pressable>
                                <View style={{ height: 10 }} />
                                <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} onPress={openReportModal} ><Text style={GLOBAL_STYLES.buttonText}> Reportar publicación </Text></Pressable>
                            </View>)}
                        {Number(myToken) === post.usuarioId && post.estado === PostStatus.PUBLICADA && (
                            <View style={styles.buttonContainer}>
                                <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} onPress={handleCancelPost}><Text style={GLOBAL_STYLES.buttonText}> Eliminar publicación </Text></Pressable>
                            </View>)
                        }
                    </View>
                }
            </ScrollView>
            <Modal
                visible={!!showRequestModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowRequestModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 20,
                        width: "85%",
                        elevation: 5
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
                            Descripción de tu solicitud
                        </Text>
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
                            placeholder="Escribe aquí tu solicitud..."
                            value={requestDescription}
                            onChangeText={setRequestDescription}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Pressable
                                style={[GLOBAL_STYLES.button, { flex: 1, marginRight: 8 }]}
                                onPress={() => setShowRequestModal(false)}
                            >
                                <Text style={GLOBAL_STYLES.buttonText}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[GLOBAL_STYLES.button, { flex: 1, marginLeft: 8 }]}
                                onPress={() => {
                                    handleGenerateRequest();
                                    setShowRequestModal(false);
                                }}
                                disabled={!requestDescription}
                            >
                                <Text style={GLOBAL_STYLES.buttonText}>Generar</Text>
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
                                onPress={handleReportPost}
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
});