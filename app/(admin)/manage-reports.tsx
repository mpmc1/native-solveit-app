import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { adminList, disablePost, enablePost } from "../../services/report";
import { ReportRS } from "../../types/report";
import { GLOBAL_STYLES } from "../../styles/styles";
import CustomAlert from "../../utils/CustomAlert";
import { DefaultScreen } from "../../components/defaultScreen";

export default function ManageReports() {
    const [reportList, setReportsList] = useState<ReportRS[]>(null);

    const getReports = async () => {
        const response = await adminList();
        if (response) {
            setReportsList(response);
        }
    }

    useEffect(() => {
        getReports();
    }, []);

    const handleDisable = async (postId: number) => {
        const response = await disablePost(postId.toString())
        if (response) {
            CustomAlert("Éxito", "Se inhabilitó la publicación", "Se hablilitó la publicación")
        }
    };

    const handleEnable = async (postId: number) => {
        const response = await enablePost(postId.toString())
        if (response) {
            CustomAlert("Éxito", "Se habilitó la publicación", "Se inhablilitó la publicación")
        }
    };

    const renderItem = ({ item }: { item: ReportRS }) => (
        <View style={styles.reportContainer}>
            <Text style={styles.title}>{item.tituloPublicacion}</Text>
            <Text>Usuario: {item.nombreUsuario}</Text>
            <Text>Motivo: {item.motivo}</Text>
            <Text>Fecha: {new Date(item.fechaReporte).toLocaleDateString()}</Text>
            <View style={styles.buttonRow}>
                <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#ff194b" }]} onPress={() => handleDisable(item.publicacionId)}>
                    <Text style={GLOBAL_STYLES.buttonText}>Dar de baja</Text>
                </Pressable>
                <Pressable style={[GLOBAL_STYLES.button, { backgroundColor: "#4CAF50" }]} onPress={() => handleEnable(item.publicacionId)}>
                    <Text style={GLOBAL_STYLES.buttonText}>Habilitar</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <DefaultScreen>
            <Text style={[GLOBAL_STYLES.title, { marginTop: 16 }]}>Administrar Reportes</Text>
            <FlatList
                style={{ width: "100%" }}
                data={reportList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={GLOBAL_STYLES.card}
                ListEmptyComponent={<Text>No hay reportes.</Text>}
            />
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: -10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 1,
        zIndex: 0
    },
    reportContainer: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
    },
    title: { fontWeight: "bold", marginBottom: 4 },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});