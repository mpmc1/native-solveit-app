export interface PostModel {
    id: number,
    titulo: string,
    descripcion: string,
    usuarioId: number,
    nombreUsuario: string,
    tipoPublicacion: string,
    categoriaServicio: string,
    zonaId: number,
    estado: PostStatus,
    fechaCreacion: Date,
    fechaActualizacion: Date,
}
export interface PostModelResponse {
    id: number,
    titulo: string,
    descripcion: string,
    usuarioId: number,
    nombreUsuario: string,
    tipoPublicacion: string,
    categoriaServicio: string,
    zonaId: number,
    estado: PostStatus,
    fechaCreacion: string,
    fechaActualizacion: string,
    ubicacionCompleta: string,
}

export enum PostStatus {
    PUBLICADA = "PUBLICADA",
    INTERES_RECIBIDO = "INTERES_RECIBIDO",
    EN_PROCESO = "EN_PROCESO",
    COMPLETADA = "COMPLETADA",
    RECHAZADA = "RECHAZADA",
    REPORTADA = "REPORTADA",
    BLOQUEADA = "BLOQUEADA",
    CANCELADA = "CANCELADA",
}

export interface CreatePostRequest {
    titulo: string,
    descripcion: string,
    tipoPublicacion: PostType,
    categoriaServicio: string,
    zonaId: number
}

export interface UpdatePostRequest {
    titulo: string,
    descripcion: string,
    tipoPublicacion: PostType,
    categoriaServicio: string,
    zonaId: number
}

export enum PostType {
    OFERTA = "OFERTA",
    DEMANDA = "DEMANDA"
}

export enum PostCategory {

}