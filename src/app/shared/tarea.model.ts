type TareaEstados = "Por hacer" | "En progreso" | "Hecha";

export var TareaEstadosSelect: string [] = [
    "Por hacer", 
    "En progreso", 
    "Hecha"

];

export interface TareaModel {
    id: string,
    titulo: string,
    fecha: Date,
    estado: TareaEstados
}