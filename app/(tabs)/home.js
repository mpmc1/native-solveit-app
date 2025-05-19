import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../styles/styles";
import { useEffect, useState } from "react";
import { PostCard } from "../../components/PostCard";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from "expo-constants";

export default function Home() { 
    const [posts, setPosts] = useState(null);
    
    useEffect(() => { 

        setPosts([
            {
            id: 0,
            titulo: "Reparación de lavadora",
            descripcion: "Necesito ayuda para reparar una lavadora que no enciende. He intentado revisar el cableado y el enchufe, pero todo parece estar en orden. El modelo es relativamente nuevo y dejó de funcionar de repente después de un corte de energía. Agradezco si alguien con experiencia en electrodomésticos puede venir a revisarla y darme un diagnóstico. También agradecería recomendaciones sobre repuestos o si conocen algún lugar confiable para adquirirlos. La lavadora es fundamental para mi familia y necesitamos resolver el problema lo antes posible. Si tienes experiencia en este tipo de reparaciones, por favor contáctame. Estoy dispuesto a pagar por el servicio y a coordinar el horario que más te convenga. ¡Gracias de antemano por tu ayuda!",
            usuarioId: 0,
            nombreUsuario: "Ana López",
            tipoPublicacion: "Solicitud",
            categoriaServicio: "Electrodomésticos",
            zonaId: 5,
            ubicacionCompleta: "Calle 10 #45-23, Medellín",
            estado: 0,
            fechaCreacion: new Date("2024-06-01T10:00:00"),
            fechaActualizacion: new Date("2024-06-01T10:00:00"),
            },
            {
            id: 2,
            titulo: "Clases de matemáticas",
            descripcion: "Ofrezco clases particulares de matemáticas para secundaria. este texto es para probar si un texto es muy largo y no se ve bien en la pantalla",
            usuarioId: 102,
            nombreUsuario: "Carlos Pérez",
            tipoPublicacion: "Oferta",
            categoriaServicio: "Educación",
            zonaId: 3,
            ubicacionCompleta: "Carrera 7 #12-34, Bogotá",
            estado: 0,
            fechaCreacion: new Date("2024-06-02T09:30:00"),
            fechaActualizacion: new Date("2024-06-02T09:30:00"),
            },
            {
            id: 3,
            titulo: "Paseo de mascotas",
            descripcion: "Busco a alguien para pasear a mi perro por las tardes.",
            usuarioId: 103,
            nombreUsuario: "María Gómez",
            tipoPublicacion: "Solicitud",
            categoriaServicio: "Mascotas",
            zonaId: 2,
            ubicacionCompleta: "Av. Siempre Viva 742, Cali",
            estado: 1,
            fechaCreacion: new Date("2024-06-03T14:15:00"),
            fechaActualizacion: new Date("2024-06-03T15:00:00"),
            },
            {
            id: 4,
            titulo: "Servicio de jardinería",
            descripcion: "Realizo mantenimiento de jardines y podas.",
            usuarioId: 104,
            nombreUsuario: "Luis Torres",
            tipoPublicacion: "Oferta",
            categoriaServicio: "Jardinería",
            zonaId: 4,
            ubicacionCompleta: "Calle 20 #33-12, Barranquilla",
            estado: 2,
            fechaCreacion: new Date("2024-06-04T08:00:00"),
            fechaActualizacion: new Date("2024-06-04T12:00:00"),
            },
            {
            id: 5,
            titulo: "Clases de guitarra",
            descripcion: "Ofrezco clases de guitarra para principiantes y nivel intermedio.",
            usuarioId: 105,
            nombreUsuario: "Pedro Ramírez",
            tipoPublicacion: "Oferta",
            categoriaServicio: "Música",
            zonaId: 1,
            ubicacionCompleta: "Calle 50 #10-20, Medellín",
            estado: 0,
            fechaCreacion: new Date("2024-06-05T11:00:00"),
            fechaActualizacion: new Date("2024-06-05T11:00:00"),
            },
            {
            id: 6,
            titulo: "Traducción de documentos",
            descripcion: "Traducción profesional de documentos inglés-español.",
            usuarioId: 106,
            nombreUsuario: "Sofía Herrera",
            tipoPublicacion: "Oferta",
            categoriaServicio: "Traducción",
            zonaId: 2,
            ubicacionCompleta: "Carrera 15 #8-50, Cali",
            estado: 1,
            fechaCreacion: new Date("2024-06-06T09:00:00"),
            fechaActualizacion: new Date("2024-06-06T09:30:00"),
            },
            {
            id: 7,
            titulo: "Reparación de bicicletas",
            descripcion: "Necesito ayuda para reparar la cadena de mi bicicleta.",
            usuarioId: 107,
            nombreUsuario: "Juan Esteban",
            tipoPublicacion: "Solicitud",
            categoriaServicio: "Transporte",
            zonaId: 3,
            ubicacionCompleta: "Calle 80 #20-15, Bogotá",
            estado: 0,
            fechaCreacion: new Date("2024-06-07T15:00:00"),
            fechaActualizacion: new Date("2024-06-07T15:00:00"),
            },
            {
            id: 8,
            titulo: "Cuidado de niños",
            descripcion: "Busco niñera para cuidar a dos niños en las tardes.",
            usuarioId: 108,
            nombreUsuario: "Laura Martínez",
            tipoPublicacion: "Solicitud",
            categoriaServicio: "Cuidado infantil",
            zonaId: 4,
            ubicacionCompleta: "Carrera 30 #25-40, Barranquilla",
            estado: 2,
            fechaCreacion: new Date("2024-06-08T13:00:00"),
            fechaActualizacion: new Date("2024-06-08T13:30:00"),
            },
            {
            id: 9,
            titulo: "Clases de inglés",
            descripcion: "Ofrezco clases de inglés para todos los niveles.",
            usuarioId: 109,
            nombreUsuario: "Miguel Ángel",
            tipoPublicacion: "Oferta",
            categoriaServicio: "Educación",
            zonaId: 5,
            ubicacionCompleta: "Calle 60 #18-22, Medellín",
            estado: 1,
            fechaCreacion: new Date("2024-06-09T10:30:00"),
            fechaActualizacion: new Date("2024-06-09T11:00:00"),
            }
        ]);
    }, []);


    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: Constants.statusBarHeight,
                paddingBottom: Constants.statusBarHeight,}}>
            <View style={styles.topBar}>
                <TextInput style={styles.searchInput} inputMode="text">Buscar</TextInput>
            </View>
            <View style={styles.content}>
                <Text style={[GLOBAL_STYLES.title, { marginTop: 20 }]}>Publicaciones disponibles</Text>
                
                {posts ? (
                    <FlatList
                        style={{flex: 1, width: '100%'}}
                    data={posts}
                    renderItem={(item)=><PostCard post={item.item} />}
                    keyExtractor={(post) => post.id}
                    numColumns={2}
                    contentContainerStyle={styles.container} />)
                    : (<Text style={{color: '#09f'}}>No hay publicaciones disponibles</Text>)}
            </View>
            <Link asChild href="/post/create">
                <Pressable style={styles.floatButton}>
                    <AntDesign name="plus" size={24} color="black" />
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        padding: 10,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#09f'
    },
    searchInput: {
        ...GLOBAL_STYLES.input,
        marginBottom: 0,
        width:'100%',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        borderRadius: 10,
    },
    container: {
        padding: 12,
    },
    floatButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#09f',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    }
})