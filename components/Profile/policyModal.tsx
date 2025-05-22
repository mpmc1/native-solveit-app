import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../styles/styles";
import * as DocumentPicker from 'expo-document-picker';

type Props = {
    setPolicyForm: React.Dispatch<React.SetStateAction<{
        numeroPoliza: string;
        aseguradora: string;
        valorPrima: string;
        fechaEmision: string;
        fechaVencimiento: string;
        tipoPoliza: string;
        archivo: any;
    }>>
    policyForm: {
        numeroPoliza: string;
        aseguradora: string;
        valorPrima: string;
        fechaEmision: string;
        fechaVencimiento: string;
        tipoPoliza: string;
        archivo: any;
    }
    policyModalVisible: boolean,
    setPolicyModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    formEditable: boolean,
    setFormEditable: React.Dispatch<React.SetStateAction<boolean>>
};


export default function PolicyModal({ setPolicyForm, setPolicyModalVisible, setFormEditable, formEditable, policyForm, policyModalVisible }: Props) {

    const handlePickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true,
            multiple: false,
        });
        if (result.assets && result.assets.length > 0 && result.assets[0].mimeType === "application/pdf") {
            setPolicyForm({ ...policyForm, archivo: result.assets[0] });
        }
    };

    const handleInputChange = (field, value) => {
        setPolicyForm({ ...policyForm, [field]: value });
    };

    const handleEditOrSave = () => {
        if (!formEditable) {
            setFormEditable(true);
        } else {
            //  Guardar la información
            setFormEditable(false);
        }
    };
    const handleCancel = () => {
        setPolicyModalVisible(false);
        setFormEditable(false);
        setPolicyForm({ numeroPoliza: "", aseguradora: "", valorPrima: "", fechaEmision: "", fechaVencimiento: "", tipoPoliza: "", archivo: null });
    };


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
                            value={policyForm.aseguradora}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("aseguradora", v)}
                            placeholder="Nombre de aseguradora"
                        />
                        <Text style={styles.label}>Valor de la prima</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={policyForm.valorPrima}
                            editable={formEditable}
                            onChangeText={v => handleInputChange("valorPrima", v)}
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
                                { backgroundColor: formEditable ? "#09f" : "#ccc", marginBottom: 8 }
                            ]}
                            onPress={formEditable ? handlePickDocument : null}
                            disabled={!formEditable}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>
                                {policyForm.archivo ? "Archivo seleccionado" : "Seleccionar archivo PDF"}
                            </Text>
                        </Pressable>
                        {policyForm.archivo && (
                            <Text style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>
                                {policyForm.archivo.name}
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