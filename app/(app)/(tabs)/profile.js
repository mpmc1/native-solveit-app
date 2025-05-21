import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, ScrollView, Modal, TouchableOpacity } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { DefaultScreen } from "../../../components/defaultScreen";
import { Link } from "expo-router";
import ExpansionPanel from "../../../components/expansion-panel/expansionPanel";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomDropdown from "../../../components/Dropdown/customDorpdown";

// Simulación de usuario (reemplaza por datos reales)
const user = {
    username: "CarlosM",
    password: "",
    email: "carlos@email.com",
    nombreCompleto: "Carlos Mendez",
    numeroIdentificacion: "123456789",
    tipoIdentificacion: "CC",
    descripcionPerfil: "",
    telefono: "3200000000",
};

const posts = [
    {
        id: 1,
        titulo: "Necesito ayuda con matemáticas",
        descripcion: "Necesito ayuda para reparar una lavadora que no enciende. He intentado revisar el cableado y el enchufe, pero todo parece estar en orden. El modelo es relativamente nuevo y dejó de funcionar de repente después de un corte de energía. Agradezco si alguien con experiencia en electrodomésticos puede venir a revisarla y darme un diagnóstico. También agradecería recomendaciones sobre repuestos o si conocen algún lugar confiable para adquirirlos. La lavadora es fundamental para mi familia y necesitamos resolver el problema lo antes posible. Si tienes experiencia en este tipo de reparaciones, por favor contáctame. Estoy dispuesto a pagar por el servicio y a coordinar el horario que más te convenga. ¡Gracias de antemano por tu ayuda!",
        usuarioId: 1,
        nombreUsuario: "CarlosM",
        tipoPublicacion: "Solicitud",
        categoriaServicio: "Educación",
        zonaId: 1,
        ubicacionCompleta: "Bogotá, Colombia",
        estado: 0,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    },
    {
        id: 2,
        titulo: "Ofrezco clases de guitarra",
        descripcion: "Clases para principiantes, horarios flexibles.",
        usuarioId: 1,
        nombreUsuario: "CarlosM",
        tipoPublicacion: "Oferta",
        categoriaServicio: "Música",
        zonaId: 1,
        ubicacionCompleta: "Bogotá, Colombia",
        estado: 2,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    },
];
const requests = [
    {
        id: 1,
        titulo: "Necesito ayuda con matemáticas",
        descripcion: "Necesito ayuda para reparar una lavadora que no enciende. He intentado revisar el cableado y el enchufe, pero todo parece estar en orden. El modelo es relativamente nuevo y dejó de funcionar de repente después de un corte de energía. Agradezco si alguien con experiencia en electrodomésticos puede venir a revisarla y darme un diagnóstico. También agradecería recomendaciones sobre repuestos o si conocen algún lugar confiable para adquirirlos. La lavadora es fundamental para mi familia y necesitamos resolver el problema lo antes posible. Si tienes experiencia en este tipo de reparaciones, por favor contáctame. Estoy dispuesto a pagar por el servicio y a coordinar el horario que más te convenga. ¡Gracias de antemano por tu ayuda!",
        usuarioId: 1,
        nombreUsuario: "CarlosM",
        tipoPublicacion: "Solicitud",
        categoriaServicio: "Educación",
        zonaId: 1,
        ubicacionCompleta: "Bogotá, Colombia",
        estado: 0,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    },
    {
        id: 2,
        titulo: "Ofrezco clases de guitarra",
        descripcion: "Clases para principiantes, horarios flexibles.",
        usuarioId: 1,
        nombreUsuario: "CarlosM",
        tipoPublicacion: "Oferta",
        categoriaServicio: "Música",
        zonaId: 1,
        ubicacionCompleta: "Bogotá, Colombia",
        estado: 2,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    },
];

export default function Profile() {
    const [policyModalVisible, setPolicyModalVisible] = useState(false);
    const [policyForm, setPolicyForm] = useState({
        numeroPoliza: "",
        aseguradora: "",
        valorPrima: "",
        fechaEmision: "",
        fechaVencimiento: "",
        tipoPoliza: "",
        archivo: null,
    });
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
    const [editProfileForm, setEditProfileForm] = useState({
        nombreCompleto: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        numeroIdentificacion: "",
        tipoIdentificacion: "",
        descripcionPerfil: "",
        telefono: "",
    });
    const [formEditable, setFormEditable] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);


    const handleDeleteAccount = () => {
        setDropdownVisible(false);
        // lógica para eliminar cuenta
        alert("Función de eliminar cuenta");
    };

    const handleEditProfile = () => {
        setDropdownVisible(false);
        setEditProfileForm({
            nombreCompleto: user.nombreCompleto || "",
            email: user.email || "",
            currentPassword: "",
            newPassword: "",
            numeroIdentificacion: user.numeroIdentificacion || "",
            tipoIdentificacion: user.tipoIdentificacion || "",
            descripcionPerfil: user.descripcionPerfil || "",
            telefono: user.telefono || "",
        });
        setEditProfileModalVisible(true);
    };

    const handleEditProfileInput = (field, value) => {
        setEditProfileForm({ ...editProfileForm, [field]: value });
    };

    const handleEditProfileCancel = () => {
        setEditProfileModalVisible(false);
        setEditProfileForm({
            nombreCompleto: "",
            email: "",
            currentPassword: "",
            newPassword: "",
            numeroIdentificacion: "",
            tipoIdentificacion: "",
            descripcionPerfil: "",
            telefono: "",
        });
    };

    const handleEditProfileSave = () => {
        // Aquí puedes agregar la lógica para guardar los cambios
        setEditProfileModalVisible(false);
        setEditProfileForm({
            nombreCompleto: "",
            email: "",
            currentPassword: "",
            newPassword: "",
            numeroIdentificacion: "",
            tipoIdentificacion: "",
            descripcionPerfil: "",
            telefono: "",
        });
    };

    const handleShowPolicy = () => {
        setDropdownVisible(false);
        setPolicyModalVisible(true);
    };

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
        <DefaultScreen hasTab={true}>
            <ScrollView>
                <View style={[GLOBAL_STYLES.card, { height: "auto", width: 350 }]}>
                <View style={{
                        width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: 4
                    }}>
                        <Pressable style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "red", borderWidth: 1, padding: 4, borderRadius: 10 }}>
                            <SimpleLineIcons name="logout" size={15} color="red" />
                            <View style={{ width: 4 }} />
                            <Text style={{ color: "red" }}>Cerrar sesión</Text>
                        </Pressable>
                        <View>
                            <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
                                <AntDesign name="setting" size={24} color="black" />
                            </Pressable>
                            {dropdownVisible && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={handleShowPolicy}>
                                        <Text style={{ color: "#222" }}>Ver información de póliza</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={handleEditProfile}>
                                        <Text style={{ color: "#222" }}>Editar información del perfil</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={handleDeleteAccount}>
                                        <Text style={{ color: "red", fontWeight: "bold" }}>Eliminar cuenta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require("../../../assets/avatar-default.png")}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={[GLOBAL_STYLES.input,{width: "100%"}]}
                        value={user.descripcionPerfil || "No ingresada"}
                        editable={false}
                    />
                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={[GLOBAL_STYLES.input,{width: "100%"}]}
                        value={user.telefono || "No ingresado"}
                        editable={false}
                    />
                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput
                        style={[GLOBAL_STYLES.input,{width: "100%"}]}
                        value={"No ingresada"}
                        editable={false}
                    />
                </View>
                <ExpansionPanel title="Tus publicaciones">
                    {posts && posts.length > 0 ? posts.map((post) => (
                            <Link key={post.id} href={`/post/${post.id}`} style={{ width: "100%", marginBottom: 10 }} asChild>
                                <Pressable style={styles.postPressable} >
                                    <View style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 8 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{post.titulo}</Text>
                                        <Text style={{ marginBottom: 8, marginTop: 8 }}>{post.descripcion.length < 120 ? post.descripcion : post.descripcion.slice(0, 120) + '...'}</Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>
                                            {post.categoriaServicio} • {post.ubicacionCompleta}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>
                                            Estado: {["PUBLICADA", "INTERES_RECIBIDO", "EN_PROCESO", "COMPLETADA", "RECHAZADA", "REPORTADA", "BLOQUEADA", "CANCELADA"][post.estado]}
                                        </Text>
                                    </View>
                                </Pressable>
                            </Link>
                                )) :  <Text style={{ textAlign:"center", fontSize: 16 }}>No has hecho publicaciones</Text>}
                </ExpansionPanel>
                <ExpansionPanel title="Solicitudes enviadas">
                    {posts && posts.length > 0 ? posts.map((post) => (
                            <Link key={post.id} href={`/post/${post.id}`} style={{ width: "100%", marginBottom: 10 }} asChild>
                                <Pressable style={styles.postPressable} >
                                    <View style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 8 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{post.titulo}</Text>
                                        <Text style={{ marginBottom: 8, marginTop: 8 }}>{post.descripcion.length < 120 ? post.descripcion : post.descripcion.slice(0, 120) + '...'}</Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>
                                            {post.categoriaServicio} • {post.ubicacionCompleta}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: "#888" }}>
                                            Estado: {["PUBLICADA", "INTERES_RECIBIDO", "EN_PROCESO", "COMPLETADA", "RECHAZADA", "REPORTADA", "BLOQUEADA", "CANCELADA"][post.estado]}
                                        </Text>
                                    </View>
                                </Pressable>
                            </Link>
                                )) :  <Text style={{ textAlign:"center", fontSize: 16 }}>No has hecho publicaciones</Text>}
                </ExpansionPanel>
            </ScrollView>
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
                                onPress={formEditable ? handlePickDocument : undefined}
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
                            <CustomDropdown
                                options={['Cédula de ciudadanía', 'Cédula de extranjería', 'Pasaporte', 'PPT', 'PEP', 'DIE']}
                                selected={editProfileForm.tipoIdentificacion}
                                onSelect={(value) => handleEditProfileInput("tipoIdentificacion", value)}
                                placeholder="Tipo de identificación"
                            />
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
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#e0e0e0",
    },
    username: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        color: "#333",
    },
    label: {
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 2,
        color: "#555",
    },
    deleteButton: {
        backgroundColor: "#ff5252",
        marginTop: 16,
    },
    logoutButton: {
        marginTop: 10,
    },
    postPressable: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // shadow for Android
        shadowColor: '#000', // shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: "auto",
        width: "100%",
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
    },
    dropdownMenu: {
        position: "absolute",
        top: 30,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 100,
        minWidth: 180,
        paddingVertical: 4,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});