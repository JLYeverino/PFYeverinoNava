import { Curso } from "./cursos";
import { Usuario } from "./usuario";

export interface Inscripcion {
    id: number;
    estudiante: Usuario;
    curso: Curso;
}