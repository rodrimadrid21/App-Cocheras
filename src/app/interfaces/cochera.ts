import { Estacionamiento } from "./estacionamiento";

export interface iCochera {
    id: number,
    descripcion: string,
    deshabilitada: number,
    eliminada: number,
    estacionamiento: Estacionamiento | undefined;
}