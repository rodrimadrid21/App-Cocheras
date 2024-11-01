import { Estacionamiento } from "./estacionamiento";

export interface iCochera {
    id: number;
    descripcion: string;
    deshabilitada: boolean; // Cambiado a booleano
    eliminada: boolean; // Cambiado a booleano
    estacionamiento?: Estacionamiento; // Opcional, ya que puede no estar asociado
    numeroVirtual?: number; // Para el uso en el frontend
}
