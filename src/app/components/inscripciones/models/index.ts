import { FormControl } from "@angular/forms";
import { IAlumno } from "../../alumnos/models";
import { ICurso } from "../../cursos/models";
import { IUser } from "../../users/models";

export interface IInscripcion {
  id: string;
  student?: IAlumno;
  course?: ICurso;
  studentId: string;
  courseId:string;
  fechaInscripcion: Date;
  userId: string;
  user: IUser;
}

export interface IInscripcionForm {
  alumno: FormControl<IAlumno | null>;
  curso: FormControl<ICurso | null>;
}

export interface ICreateInscripcionData {
  studentId?: string | null;
  courseId?: string | null;
  fechaInscripcion: Date | null;
  userId?: string | null;
}
