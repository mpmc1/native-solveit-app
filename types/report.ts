export interface ReportRS {
    id: number;
    publicacionId: number;
    tituloPublicacion: string;
    usuarioId: number;
    nombreUsuario: string;
    motivo: string;
    fechaReporte: string;
    procesado: boolean;
}