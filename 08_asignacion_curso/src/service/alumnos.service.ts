import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlumnoResultadoDto } from 'src/dtos/AlumnoResultadoDto';
import { Alumnos } from 'src/model/alumnos';
import { Cursos } from 'src/model/cursos';
import { Repository } from 'typeorm';


@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumnos) private readonly alumnosRepository:Repository<Alumnos>,
    @InjectRepository(Cursos) private readonly cursosRepository:Repository<Cursos>){}

  async findByNoMatriculadoEnCurso(codigoCurso:number):Promise<AlumnoResultadoDto[]>{
//obtenemos los usuarios matriculados en el curso
  const usuariosEnCurso:string[]=(await this.alumnosRepository.createQueryBuilder("alumno")
    .innerJoin("alumno.cursos","c")
    .where("c.idCurso=:codigo",{codigo:codigoCurso})
    .getMany()) //Alumno[]
    .map(a=>a.usuario); //string[]
  return (await this.alumnosRepository.createQueryBuilder("alumno")
    .where("alumno.usuario not in ((:...ids)",{ids:usuariosEnCurso})
    .getMany())
    .map(a=>new AlumnoResultadoDto(a.usuario,a.password,a.nombre,a.email,a.edad))
  }
}