import React from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles/styles";
import { DefaultScreen } from "../../components/defaultScreen";
import { Link } from "expo-router";
import ExpansionPanel from "../../components/expansion-panel/expansionPanel";

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
    return (
        <DefaultScreen>
            <ScrollView>
                <View style={[GLOBAL_STYLES.card, { height: "auto", width: 350 }]}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require("../../assets/avatar-default.png")}
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
                    <Pressable style={[GLOBAL_STYLES.button, styles.deleteButton]}>
                        <Text style={GLOBAL_STYLES.buttonText}>Eliminar cuenta</Text>
                    </Pressable>
                    <Pressable style={[GLOBAL_STYLES.button, styles.logoutButton]}>
                        <Text style={GLOBAL_STYLES.buttonText}>Cerrar Sesión</Text>
                    </Pressable>
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
        backgroundColor: "#ffa726",
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
    }
});