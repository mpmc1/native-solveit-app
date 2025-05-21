export type UserModel = {
    username: string,
    password: string,
    email: string,
    nombreCompleto: string,
    numeroIdentificacion: string,
    tipoIdentificacion: string,
    descripcionPerfil: string,
    telefono: string,
}

export type LoginResponse = {
    token: string;
    username: string;
    email: string;
    nombreCompleto: string;
    numeroIdentificacion: string;
    tipoIdentificacion: string;
    descripcionPerfil: string | null;
    telefono: string;
}
export type RegisterResponse = {
    token: string;
    username: string;
    email: string;
    nombreCompleto: string;
    numeroIdentificacion: string;
    tipoIdentificacion: string;
    descripcionPerfil: string;
    telefono: string
}

export type ErrorResponse = {
    message: string;
    success: boolean;
}