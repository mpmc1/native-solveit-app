import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { DefaultScreen } from "../../../components/defaultScreen";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { getPostById } from "../../../services/post";
import { RequestsStates, RequestResponseModel } from "../../../types/requests";
import { PostModelResponse } from "../../../types/Posts";
import { acceptRequest, rejectRequest, finishRequest, getRequestById } from "../../../services/request";
import RateModal from "../../../components/rateModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/user/userStore";
import { jwtDecode } from "jwt-decode";
import CustomAlert from "../../../utils/CustomAlert";

export default function RequestDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const { token } = useSelector((state: RootState) => state.UserData)

    const [request, setRequest] = useState<RequestResponseModel | null>(null);
    const [post, setPost] = useState<PostModelResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [myId, setMyId] = useState("");
    const [recipient, setRecipient] = useState("");

    const fetchData = useCallback(async () => {
        const decodedToken = jwtDecode(token);
        //@ts-ignore
        setMyId(decodedToken.UserId);
        setLoading(true);
        const req = await getRequestById(id);
        setRequest(req);

        if (req && req.publicacionId) {
            const postResp = await getPostById(req.publicacionId);
            setPost(postResp);
            if (postResp) {
                if (Number(myId) === postResp.usuarioId) {
                    setRecipient(req.usuarioInteresadoId);
                } else {
                    setRecipient(postResp.usuarioId.toString());
                }
            }
            setLoading(false);
        }
    }, [id, token, myId]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, [navigation, fetchData]);

    const handleAcceptRequest = async () => {
        const response = await acceptRequest(id);
        if (response) {
            CustomAlert("Se aceptó la solicitud", "La solicitud ha sido aceptada correctamente", "La solicitud ha sido aceptada correctamente");
        }
        fetchData();
    };
    const handleRejectRequest = async () => {
        const response = await rejectRequest(id);
        if (response) {
            CustomAlert("Se rechazó la solicitud", "La solicitud ha sido rechazada correctamente", "La solicitud ha sido rechazada correctamente");
        }
        fetchData();
    };
    const handleFinalizeRequest = async () => {
        const response = await finishRequest(id);
        if (response) {
            CustomAlert("Se finalizó la solicitud", "La solicitud ha sido finalizada correctamente", "La solicitud ha sido finalizada correctamente");
        }
        fetchData();
    };

    if (loading) {
        return (
            <DefaultScreen>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#09f" />
                </View>
            </DefaultScreen>
        );
    }

    return (
        <DefaultScreen>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <Text style={GLOBAL_STYLES.title}>Detalle de la solicitud</Text>
                <View style={[GLOBAL_STYLES.card, { width: 350 }]}>
                    {post && (
                        <>
                            <Text style={styles.title}>{post.titulo}</Text>
                            <Text style={styles.label}>Descripción de la publicación:</Text>
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
                        </>
                    )}
                    <View style={styles.line} />
                    {request && (
                        <>
                            <Text style={styles.label}>Descripción de la solicitud:</Text>
                            <Text style={styles.text}>{request.descripcion}</Text>
                            <Text style={styles.label}>Estado de la solicitud:</Text>
                            <Text style={styles.text}>{RequestsStates[request.estado]}</Text>
                            <Text style={styles.label}>Hecha por:</Text>
                            <Text style={styles.text}>{request.nombreUsuarioInteresado}</Text>
                            <Text style={styles.label}>Fecha de creación de la solicitud:</Text>
                            <Text style={styles.text}>{new Date(request.fechaCreacion).toLocaleDateString()}</Text>
                        </>
                    )}
                    {request && request.estado === RequestsStates.PENDIENTE && Number(myId) === post?.usuarioId && (
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 16 }}>
                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "red" }]} onPress={handleRejectRequest}>
                                <Text style={GLOBAL_STYLES.buttonText}>Rechazar</Text>
                            </Pressable>
                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#4CAF50" }]} onPress={handleAcceptRequest}>
                                <Text style={GLOBAL_STYLES.buttonText}>Aceptar</Text>
                            </Pressable>
                        </View>
                    )}
                    {request && request.estado === RequestsStates.ACEPTADO && (
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 16 }}>
                                <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#4CAF50" }]} onPress={handleFinalizeRequest}>
                                    <Text style={GLOBAL_STYLES.buttonText}>Finalizar</Text>
                                </Pressable>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, }}>
                                <Link href={`/chat/${recipient}`} asChild>
                                    <Pressable style={GLOBAL_STYLES.button}>
                                        <Text style={GLOBAL_STYLES.buttonText}>chat</Text>
                                    </Pressable>
                                </Link>
                            </View>
                        </>
                    )}
                    {request && request.estado === RequestsStates.COMPLETADO && (
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 16 }}>
                            <Pressable style={[GLOBAL_STYLES.button]} onPress={() => setRatingModalVisible(true)}>
                                <Text style={GLOBAL_STYLES.buttonText}>Calificar</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </ScrollView>
            <RateModal ratingModalVisible={ratingModalVisible} setRatingModalVisible={setRatingModalVisible} userId={post.usuarioId}></RateModal>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
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
});