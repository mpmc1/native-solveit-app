import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../styles/styles";
import * as DocumentPicker from 'expo-document-picker';
import CustomAlert from "../../utils/CustomAlert";
import { useEffect, useState } from "react";
import { createPolicy, downloadPolicy, getSelfPolicy, updatePolicy } from "../../services/policy";
import { CreatePolicyRQ, GetSelfPolicyResponse } from "../../types/policy";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type Props = {
    policyModalVisible: boolean,
    setPolicyModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
};


export default function PolicyModal({ setPolicyModalVisible, policyModalVisible }: Props) {

    const [formEditable, setFormEditable] = useState(false);
    const [policyForm, setPolicyForm] = useState<CreatePolicyRQ>({
        numeroPoliza: "",
        nombreAseguradora: "",
        prima: 0,
        fechaEmision: "",
        fechaVencimiento: "",
        tipoPoliza: ""
    });
    const [archivo, setArchivo] = useState<Blob>(null);
    const [archivoNombre, setArchivoNombre] = useState<string>(null);
    const [policyId, setPolicyId] = useState<number>(null)
    const handlePickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true,
            multiple: false,
        });
        if (result.assets && result.assets.length > 0) {
            if (result.assets[0].mimeType !== "application/pdf") {
                CustomAlert("Error", "El archivo seleccionado no es un PDF.", "El archivo seleccionado no es un PDF.");
                return;
            }
            setPolicyForm({ ...policyForm });
            setArchivo(new Blob([await result.assets[0].file.arrayBuffer()], { type: result.assets[0].mimeType }));
            setArchivoNombre(result.assets[0].name || "archivo.pdf");
        }
    };

    const handleInputChange = (field, value) => {
        setPolicyForm({ ...policyForm, [field]: value });
    };

    const handleEditOrSave = async () => {
        if (!formEditable) {
            setFormEditable(true);
        } else {
            const response = policyId ? await updatePolicy(policyId.toString(), policyForm, archivo) : await createPolicy(policyForm, archivo);

            if (response) {
                CustomAlert("Éxito", "Póliza guardada correctamente", "Póliza guardada correctamente");
                setFormEditable(false);
                setPolicyForm({ numeroPoliza: "", nombreAseguradora: "", prima: 0, fechaEmision: "", fechaVencimiento: "", tipoPoliza: "" });
                setPolicyModalVisible(false);
            }
        }
    };
    const handleCancel = () => {
        setPolicyModalVisible(false);
        cleanInfoAndclose();
    };

    const downloadAndShareFile = async (blob: Blob, filename: string) => {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
            const base64data = fileReader.result as string;
            const fileUri = FileSystem.documentDirectory + filename;

            await FileSystem.writeAsStringAsync(fileUri, base64data.split(',')[1], {
                encoding: FileSystem.EncodingType.Base64,
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                alert("Compartir no está disponible en este dispositivo");
            }
        };

        fileReader.readAsDataURL(blob);
    };

    const downloadFile = async () => {
        const response = await downloadPolicy(policyId.toString());
        if (response) {
            if (Platform.OS === "web") {
                setArchivo(response.blob);
                setArchivoNombre(response.filename || "archivo.pdf");
                const url = window.URL.createObjectURL(response.blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = response.filename || "archivo.pdf";
                link.click();
                window.URL.revokeObjectURL(url);
                CustomAlert("Descarga", "Archivo descargado correctamente", "Archivo descargado correctamente");
            } else {
                downloadAndShareFile(response.blob, "poliza.pdf");
            }
        } else {
            CustomAlert("Error", "No se pudo descargar el archivo", "No se pudo descargar el archivo");
        }
    }

    const init = async () => {
        const response: GetSelfPolicyResponse[] = await getSelfPolicy();

        if (response?.length > 0) {
            setPolicyId(response[0].id);
            setPolicyForm({
                numeroPoliza: response[0].numeroPoliza,
                nombreAseguradora: response[0].nombreAseguradora,
                prima: response[0].prima,
                fechaEmision: response[0].fechaEmision,
                fechaVencimiento: response[0].fechaVencimiento,
                tipoPoliza: response[0].tipoPoliza
            })

        }

    }

    const cleanInfoAndclose = () => {
        setPolicyForm({ numeroPoliza: "", nombreAseguradora: "", prima: 0, fechaEmision: "", fechaVencimiento: "", tipoPoliza: "" });
        setArchivo(null);
        setArchivoNombre(null);
        setFormEditable(false);
        setPolicyId(null);
        setPolicyModalVisible(false);
    }

    useEffect(() => {
        init();
    }, [policyModalVisible]);


    return (
        <Modal
            visible={policyModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16, textAlign: "center" }}>
                        Información de póliza
                    </Text>
                    <ScrollView>
                        <Text style={styles.label}>Número de póliza</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.numeroPoliza}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("numeroPoliza", v)}
                            placeholder="Número de póliza"
                        />
                        <Text style={styles.label}>Aseguradora</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.nombreAseguradora}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("nombreAseguradora", v)}
                            placeholder="Nombre de aseguradora"
                        />
                        <Text style={styles.label}>Valor de la prima</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.prima.toString()}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("prima", Number(v))}
                            placeholder="Valor de la prima"
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>Fecha de emisión</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.fechaEmision}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("fechaEmision", v)}
                            placeholder="YYYY-MM-DD"
                        />
                        <Text style={styles.label}>Fecha de vencimiento</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.fechaVencimiento}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("fechaVencimiento", v)}
                            placeholder="YYYY-MM-DD"
                        />
                        <Text style={styles.label}>Tipo de póliza</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.tipoPoliza}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("tipoPoliza", v)}
                            placeholder="Tipo de póliza"
                        />
                        <Text style={styles.label}>Archivo PDF</Text>
                        <Pressable
                            style={[
                                GLOBAL_STYLES.button,
                                { backgroundColor: formEditable || policyId ? "#09f" : "#ccc", marginBottom: 8 }
                            ]}
                            onPress={formEditable ? handlePickDocument : downloadFile}
                            disabled={!formEditable && !policyId}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>
                                {!formEditable ? "Descargar" : "Seleccionar archivo PDF"}
                            </Text>
                        </Pressable>
                        {archivo && (
                            <Text style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>
                                {archivoNombre || "Archivo seleccionado"} ({(archivo.size / 1024).toFixed(2)} KB)
                            </Text>
                        )}
                    </ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                        <Pressable
                            style={[GLOBAL_STYLES.button, { flex: 1, marginRight: 8, backgroundColor: "#aaa" }]}
                            onPress={handleCancel}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[GLOBAL_STYLES.button, { flex: 1, marginLeft: 8 }]}
                            onPress={handleEditOrSave}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>{formEditable ? "Guardar" : "Editar"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 24,
        width: "90%",
        maxHeight: "90%",
        elevation: 5,
        alignItems: "center"
    },
    label: {
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 2,
        color: "#555",
    },
})