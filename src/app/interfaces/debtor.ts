export interface Debtor {
    nombre:string,
    domicilio:string,
    superficie:string,
    telefono:number,
    totalDeuda:number,
    vencimiento:string,
    fechaInicio:string,
    estado:string,
    totalAbono:number,
    tipoPlazos:number,
    numeroPlazos:number,
    proximoPago:number,
    proximoVencimiento:string,
    abonos?:number
}
