import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumnos } from 'src/model/alumnos';
import { Cursos } from 'src/model/cursos';
import { MatriculaNuevaDto } from 'src/dtos/MatriculaNuevaDto';

@Injectable()
export class MatriculasService {
    constructor(@InjectRepository(Cursos) private cursosRepository:Repository<Cursos>,
                @InjectRepository(Alumnos) private alumnosRepository:Repository<Alumnos>){}

    // Buscar alumno y curso, matricularlo en curso y salvarlo en la database
async matricular(matricula:MatriculaNuevaDto):Promise<boolean>{
    const alumno:Alumnos=await this.alumnosRepository.createQueryBuilder("alumno")
        .where("alumno.usuario=:usuario",{usuario:matricula.usuario})
        .getOne();
    const curso:Cursos=await this.cursosRepository.createQueryBuilder("curso")
        .where("curso.idCurso=:idCurso",{idCurso:matricula.idCurso})
        .getOne();
    if(!alumno || !curso){return false;}

    //añadimos el alumno al curso y actualizamos el curso
    curso.alumnos.push(alumno);
    await this.cursosRepository.save(curso);
    return true;
    }
}