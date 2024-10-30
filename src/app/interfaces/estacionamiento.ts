export interface Estacionamiento {
    id: number,
    patente: string,
    horaIngreso: string,
    horaEgreso: string,
    costo: number,
    idUsuarioIngreso: number,
    idUsuarioEgreso: number,
    idCochera: number,
    eliminado: boolean | null
}