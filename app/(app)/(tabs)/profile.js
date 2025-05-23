import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { DefaultScreen } from "../../../components/defaultScreen";
import { Link, useNavigation } from "expo-router";
import ExpansionPanel from "../../../components/expansion-panel/expansionPanel";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "../../../context/authContext";
import PolicyModal from "../../../components/Profile/policyModal";
import UserInfoUpdateModal from "../../../components/Profile/userInfoUpdateModal";
import { getSelfPost } from "../../../services/post";
import { userStore } from "../../../redux/user/userStore";

export default function Profile() {
    const user = userStore.getState().UserData;
    const [posts, setPosts] = useState([])
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
    
    const navigation = useNavigation();
    const { signout } = useAuth();

    const getMyPosts = async () => {
            const result = await getSelfPost();
            setPosts(result)
    }
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

    const handleShowPolicy = () => {
        setDropdownVisible(false);
        setPolicyModalVisible(true);
    };

    
        useEffect(() => {
                const focus = navigation.addListener('focus', () => {
                    getMyPosts();
                });
        
        
                return focus;
            }, [navigation]);


    return (
        <DefaultScreen hasTab={true}>
            <ScrollView>
                <View style={[GLOBAL_STYLES.card, { height: "auto", width: 350 }]}>
                    <View style={{
                        width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: 4
                    }}>
                        <Pressable style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "red", borderWidth: 1, padding: 4, borderRadius: 10 }} onPress={signout}>
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
                <View style={{zIndex:-1}}> 
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
                        style={[GLOBAL_STYLES.input, { width: "100%" }]}
                        value={user.descripcionPerfil || "No ingresada"}
                        editable={false}
                    />
                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={[GLOBAL_STYLES.input, { width: "100%" }]}
                        value={user.telefono || "No ingresado"}
                        editable={false}
                    />
                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput
                        style={[GLOBAL_STYLES.input, { width: "100%" }]}
                        value={"No ingresada"}
                        editable={false}
                    />
                </View>
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
                    )) : <Text style={{ textAlign: "center", fontSize: 16 }}>No has hecho publicaciones</Text>}
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
                    )) : <Text style={{ textAlign: "center", fontSize: 16 }}>No has hecho publicaciones</Text>}
                </ExpansionPanel>
            </ScrollView>
            <PolicyModal formEditable={formEditable}
                policyForm={policyForm}
                policyModalVisible={policyModalVisible}
                setFormEditable={setFormEditable}
                setPolicyForm={setPolicyForm}
                setPolicyModalVisible={setPolicyModalVisible} />
            <UserInfoUpdateModal setEditProfileForm={setEditProfileForm}
                editProfileForm={editProfileForm}
                editProfileModalVisible={editProfileModalVisible}
                setEditProfileModalVisible={setEditProfileModalVisible} />
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        marginBottom: 16,
        zIndex:0
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#e0e0e0",
        zIndex:0
    },
    username: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        color: "#333",
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
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: "auto",
        width: "100%",
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