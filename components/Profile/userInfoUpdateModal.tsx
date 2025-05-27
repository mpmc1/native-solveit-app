import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CustomDropdown from "../Dropdown/customDorpdown";
import { GLOBAL_STYLES } from "../../styles/styles";
import { UpdateUserRQ } from "../../types/user";
import { updateUserInfo } from "../../services/user";
import CustomAlert from "../../utils/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { RootState } from "../../redux/user/userStore";

type Props = {
    editProfileModalVisible: boolean,
    setEditProfileModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    editProfileForm: {
        nombreCompleto: string;
        email: string;
        currentPassword: string;
        newPassword: string;
        numeroIdentificacion: string;
        tipoIdentificacion: string;
        descripcionPerfil: string;
        telefono: string;
    }
    setEditProfileForm: React.Dispatch<React.SetStateAction<UpdateUserRQ>>

};

export default function UserInfoUpdateModal({ editProfileForm, setEditProfileForm, editProfileModalVisible, setEditProfileModalVisible }: Props) {
    const handleEditProfileInput = (field, value) => {
        setEditProfileForm({ ...editProfileForm, [field]: value });
    };

    const dispatch = useDispatch();
    const { token, username, role } = useSelector((state: RootState) => state.UserData);

    const handleEditProfileCancel = () => {
        setEditProfileModalVisible(false);
        setEditProfileForm({
            nombreCompleto: "",
            currentPassword: "",
            newPassword: "",
            numeroIdentificacion: "",
            tipoIdentificacion: "",
            descripcionPerfil: "",
            telefono: "",
        });
    };

    const handleEditProfileSave = async () => {
        if (Object.entries(editProfileForm).some(([key, value]) => key !== "descripcionPerfil" && !value)) {
            CustomAlert("Error", "Por favor, complete todos los campos.", "Por favor, complete todos los campos.")
        }
        if (editProfileForm.newPassword.length < 8) {
            CustomAlert("Error", "La nueva contraseña debe tener al menos 8 caracteres.", "La nueva contraseña debe tener al menos 8 caracteres.")
        }
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

        const isValidPassword = regex.test(editProfileForm.newPassword);
        if (!isValidPassword) {
            CustomAlert("Error", "La nueva contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.", "La nueva contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.");
        }

        const response = await updateUserInfo(editProfileForm);

        if (response && response.success === true) {
            dispatch(setUser({
                username: username,
                password: editProfileForm.newPassword,
                role: role,
                token: token,
                nombreCompleto: editProfileForm.nombreCompleto,
                email: editProfileForm.email,
                numeroIdentificacion: editProfileForm.numeroIdentificacion,
                tipoIdentificacion: editProfileForm.tipoIdentificacion,
                descripcionPerfil: editProfileForm.descripcionPerfil,
                telefono: editProfileForm.telefono,
            }))
            CustomAlert("Éxito", "Información actualizada correctamente.", "Información actualizada correctamente.");
        } else {
            CustomAlert("Error", "No se pudo actualizar la información.", "No se pudo actualizar la información.");
        }
        setEditProfileModalVisible(false);
        setEditProfileForm({
            nombreCompleto: "",
            currentPassword: "",
            newPassword: "",
            numeroIdentificacion: "",
            tipoIdentificacion: "",
            descripcionPerfil: "",
            telefono: "",
        });
    };
    return (
        <Modal
            visible={editProfileModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleEditProfileCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16, textAlign: "center" }}>
                        Editar información del perfil
                    </Text>
                    <ScrollView>
                        <Text style={styles.label}>Nombre completo</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.nombreCompleto}
                            onChangeText={v => handleEditProfileInput("nombreCompleto", v)}
                            placeholder="Nombre completo"
                        />
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.email}
                            onChangeText={v => handleEditProfileInput("email", v)}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Text style={styles.label}>Contraseña actual</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.currentPassword}
                            onChangeText={v => handleEditProfileInput("currentPassword", v)}
                            placeholder="Contraseña actual"
                            secureTextEntry
                        />
                        <Text style={styles.label}>Nueva contraseña</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.newPassword}
                            onChangeText={v => handleEditProfileInput("newPassword", v)}
                            placeholder="Nueva contraseña"
                            secureTextEntry
                        />
                        <Text style={styles.label}>Número de identificación</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.numeroIdentificacion}
                            onChangeText={v => handleEditProfileInput("numeroIdentificacion", v)}
                            placeholder="Número de identificación"
                        />
                        <Text style={styles.label}>Tipo de identificación</Text>
                        <View style={{ position: "relative", zIndex: 10, overflow: 'visible' }}>
                            <CustomDropdown
                                options={['Cédula de ciudadanía', 'Cédula de extranjería', 'Pasaporte', 'PPT', 'PEP', 'DIE']}
                                selected={editProfileForm.tipoIdentificacion}
                                onSelect={(value) => handleEditProfileInput("tipoIdentificacion", value)}
                                placeholder="Tipo de identificación"
                            />
                        </View>
                        <Text style={styles.label}>Descripción del perfil</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.descripcionPerfil}
                            onChangeText={v => handleEditProfileInput("descripcionPerfil", v)}
                            placeholder="Descripción del perfil"
                            multiline
                        />
                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { width: "100%" }]}
                            value={editProfileForm.telefono}
                            onChangeText={v => handleEditProfileInput("telefono", v)}
                            placeholder="Teléfono"
                            keyboardType="phone-pad"
                        />
                    </ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                        <Pressable
                            style={[GLOBAL_STYLES.button, { flex: 1, marginRight: 8, backgroundColor: "#aaa" }]}
                            onPress={handleEditProfileCancel}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[GLOBAL_STYLES.button, { flex: 1, marginLeft: 8 }]}
                            onPress={handleEditProfileSave}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>Guardar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 2,
        color: "#555",
    },
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
    }

})