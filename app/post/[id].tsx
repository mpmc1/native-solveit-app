import { Alert, Pressable, ScrollView, StyleSheet, Text, View, Modal, TextInput } from "react-native";
import { PostStatus } from "../../types/Posts";
import { GLOBAL_STYLES } from "../../styles/styles";
import { DefaultScreen } from "../../components/defaultScreen";
import React, { useEffect, useState } from "react";
import CustomDropdown from "../../components/Dropdown/customDorpdown";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/user/userStore";

const post = {
    id: 1,
    titulo: "Título de ejemplo",
    descripcion: "Necesito ayuda para reparar una lavadora que no enciende. He intentado revisar el cableado y el enchufe, pero todo parece estar en orden. El modelo es relativamente nuevo y dejó de funcionar de repente después de un corte de energía. Agradezco si alguien con experiencia en electrodomésticos puede venir a revisarla y darme un diagnóstico. También agradecería recomendaciones sobre repuestos o si conocen algún lugar confiable para adquirirlos. La lavadora es fundamental para mi familia y necesitamos resolver el problema lo antes posible. Si tienes experiencia en este tipo de reparaciones, por favor contáctame. Estoy dispuesto a pagar por el servicio y a coordinar el horario que más te convenga. ¡Gracias de antemano por tu ayuda!",
    usuarioId: 0,
    nombreUsuario: "UsuarioEjemplo",
    tipoPublicacion: "Servicio",
    categoriaServicio: "Electricidad",
    zonaId: 3,
    ubicacionCompleta: "Ciudad, Barrio, Calle 123",
    estado: PostStatus.PUBLICADA,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
};

export default function PostDetail() {
    const [modalVisible, setModalVisible] = useState(false);
    const [reportDescription, setReportDescription] = useState(null);
    const [reportReason, setReportReason] = useState("");

    const { id } = useSelector((state: RootState) => state.UserData);

    useEffect(() => { console.log("current user: ", id, "\nPost user: ", post.usuarioId); }, [id]);



    function openReportModal() {
        setModalVisible(true);
    }

    function closeReportModal() {
        setModalVisible(false);
        setReportDescription("");
    }


    return (
        <DefaultScreen>
            <ScrollView>
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
                    <Text style={styles.label}>Ubicación:</Text>
                    <Text style={styles.text}>{post.ubicacionCompleta}</Text>
                    <Text style={styles.label}>Estado:</Text>
                    <Text style={styles.text}>{PostStatus[post.estado]}</Text>
                    <Text style={styles.label}>Creado:</Text>
                    <Text style={styles.text}>{post.fechaCreacion.toLocaleString()}</Text>
                    <Text style={styles.label}>Actualizado:</Text>
                    <Text style={styles.text}>{post.fechaActualizacion.toLocaleString()}</Text>
                    <View style={{ height: 10 }} />
                    {id !== post.usuarioId && post.estado === PostStatus.PUBLICADA && (
                        <View style={styles.buttonContainer}>
                            <Pressable style={GLOBAL_STYLES.button} ><Text style={GLOBAL_STYLES.buttonText}> Generar solicitud </Text></Pressable>
                            <View style={{ height: 10 }} />
                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} onPress={openReportModal} ><Text style={GLOBAL_STYLES.buttonText}> Reportar publicación </Text></Pressable>
                        </View>)
                    }
                    {id === post.usuarioId && post.estado === PostStatus.PUBLICADA && (
                        <View style={styles.buttonContainer}>
                            <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} ><Text style={GLOBAL_STYLES.buttonText}> Eliminar publicación </Text></Pressable>
                        </View>)
                    }
                </View>
            </ScrollView>
            <Modal
                visible={modalVisible}
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
                                    Alert.alert("Reporte enviado", "Gracias por ayudarnos a mantener la comunidad segura.");
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
});