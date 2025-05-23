export interface UpdateUserRQ {
    nombreCompleto: string,
    currentPassword: string,
    newPassword: string,
    numeroIdentificacion: string,
    tipoIdentificacion: string,
    descripcionPerfil: string,
    telefono: string
}