import { iCochera } from "./cochera";

export interface Estacionamiento {
    id: number;
    patente: string;
    horaIngreso: string;
    horaEgreso: string | null;
    costo: number;
    idUsuarioIngreso: number;
    idUsuarioEgreso: number;
    idCochera: number;
    eliminado: boolean;
    cochera?: iCochera; // Agrega la propiedad cochera de tipo iCochera
}
