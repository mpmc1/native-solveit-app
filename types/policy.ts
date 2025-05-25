export interface CreatePolicyRQ {
    numeroPoliza: string;
    nombreAseguradora: string;
    prima: number;
    fechaEmision: string; // ISO date string (yyyy-MM-dd)
    fechaVencimiento: string; // ISO date string (yyyy-MM-dd)
    tipoPoliza: string;
}

export interface GetSelfPolicyResponse {
    id: number,
    idTitular: number,
    nombreTitular: string,
    numeroPoliza: string,
    nombreAseguradora: string,
    prima: number,
    fechaEmision: string,
    fechaVencimiento: string,
    tipoPoliza: string,
    nombreArchivo: string,
    fechaCreacion: string,
    fechaActualizacion: string
}

export interface DownloadPolicyResponse {
    filename: string;
    file: Blob | ArrayBuffer;
}
