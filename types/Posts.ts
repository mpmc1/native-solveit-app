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

export enum PostStatus {
    PUBLICADA,
    INTERES_RECIBIDO,
    EN_PROCESO,
    COMPLETADA,
    RECHAZADA,
    REPORTADA,
    BLOQUEADA,
    CANCELADA
}

export interface CreatePostRequest {
    usuarioId: number,
    titulo: string,
    descripcion: string,
    tipoPublicacion: TipoPublicacion,
    categoriaServicio: string,
    zonaId: number
}
enum TipoPublicacion {
    OFERTA,
    DEMANDA
}