export enum RequestsStates {
    PENDIENTE = "PENDIENTE",
    ACEPTADO = "ACEPTADO",
    RECHAZADO = "RECHAZADO",
    COMPLETADO = "COMPLETADO",
}

export interface RequestResponseModel {
    descripcion: string;
    estado: RequestsStates;
    fechaCreacion: string;
    fechaActualizacion: string;
    id: string;
    nombreUsuarioInteresado: string;
    publicacionId: number;
    titulo: string;
    tituloPublicacion: string;
    usuarioInteresadoId: string;
}

export interface CreateRequestRQ {
    publicacionId: string,
    titulo: string,
    descripcion: string
}