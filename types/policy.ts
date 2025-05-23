export interface UpdatePolicyRQ {
    numeroPoliza: string,
    nombreAseguradora: string,
    prima: number,
    fechaEmision: Date,
    fechaVencimiento: Date,
    tipoPoliza: string
}