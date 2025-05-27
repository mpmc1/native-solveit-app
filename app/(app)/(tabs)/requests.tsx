import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DefaultScreen } from "../../../components/defaultScreen";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { useEffect, useState } from "react";
import { acceptRequest, finishRequest, listRecievedRequests, rejectRequest } from "../../../services/request";
import { Link, useNavigation } from "expo-router";
import { RequestResponseModel, RequestsStates } from "../../../types/requests";
import CustomAlert from "../../../utils/CustomAlert";

export default function Requests() {

    const [requests, setRequests] = useState<RequestResponseModel[]>(null);

    const navigation = useNavigation();

    const getRequestsList = async () => {
        const response = await listRecievedRequests();
        setRequests(response);

    }

    const handleAcceptRequest = async (id: string) => {
        const response = await acceptRequest(id);
        if (response) {
            CustomAlert("Se aceptó la solicitud", "La solicitud ha sido aceptada correctamente", "La solicitud ha sido aceptada correctamente");
        }
        getRequestsList();
    };
    const handleRejectRequest = async (id: string) => {
        const response = await rejectRequest(id);
        if (response) {
            CustomAlert("Se rechazó la solicitud", "La solicitusd ha sido rechazada correctamente", "La solicitud ha sido rechazada correctamente");
        }
        getRequestsList();
    };
    const handleFinalizeRequest = async (id: string) => {
        const response = await finishRequest(id);
        if (response) {
            CustomAlert("Se finalizó la solicitud", "La solicitud ha sido finalizada correctamente", "La solicitud ha sido finalizada correctamente");
        }
        getRequestsList();
    };

    useEffect(() => {
        getRequestsList();
        const focus = navigation.addListener('focus', () => {
            getRequestsList();
        });

        return focus;
    }, [navigation]);
    return (
        <DefaultScreen>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={GLOBAL_STYLES.title}>Solicitudes recibidas</Text>
                {!requests || requests.length === 0 && (
                    <View style={[GLOBAL_STYLES.card, { height: "auto", width: 350 }]}>
                        <Text >No hay solicitudes disponibles.</Text>
                    </View>
                )}
                {requests && requests.length > 0 && requests.map((request, index) => (
                    <View key={index} style={{ width: "100%", marginBottom: 10 }}>
                        <View style={styles.requestPressable} >
                            <View style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 8 }}>
                                <Link href={`/request/${request.id}`} asChild>
                                    <Pressable>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{request.titulo}</Text>
                                        <Text style={{ marginBottom: 8, marginTop: 8 }}>{request.descripcion.length < 120 ? request.descripcion : request.descripcion.slice(0, 120) + '...'}</Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>
                                            Estado: {RequestsStates[request.estado]}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>Hecha por: {request.nombreUsuarioInteresado}</Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>Fecha de creación: {new Date(request.fechaCreacion).toLocaleDateString()}</Text>
                                    </Pressable>
                                </Link>
                                {request.estado === RequestsStates.PENDIENTE && (
                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, }}>
                                        <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "red" }]} onPress={() => handleRejectRequest(request.id)}>
                                            <Text style={GLOBAL_STYLES.buttonText}>Rechazar</Text>
                                        </Pressable>
                                        <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#4CAF50" }]} onPress={() => handleAcceptRequest(request.id)}>
                                            <Text style={GLOBAL_STYLES.buttonText}>Aceptar</Text>
                                        </Pressable>
                                    </View>
                                )}
                                {request.estado === RequestsStates.ACEPTADO && (
                                    <>
                                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, }}>
                                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#4CAF50" }]} onPress={() => handleFinalizeRequest(request.id)}>
                                                <Text style={GLOBAL_STYLES.buttonText}>Finalizar</Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, }}>
                                            <Link href={`/chat/${request.usuarioInteresadoId}`} asChild>
                                                <Pressable style={GLOBAL_STYLES.button}>
                                                    <Text style={GLOBAL_STYLES.buttonText}>chat</Text>
                                                </Pressable>
                                            </Link>
                                        </View>
                                    </>
                                )}

                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    requestPressable: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: "auto",
        width: "100%",
    },
})