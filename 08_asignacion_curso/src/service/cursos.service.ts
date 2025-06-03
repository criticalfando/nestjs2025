import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoResultadoDto } from 'src/dtos/CursoResultadoDto';
import { Cursos } from 'src/model/cursos';
import { Repository } from 'typeorm';


@Injectable()
export class CursosService {
  constructor(@InjectRepository(Cursos) private readonly cursosRepository:Repository<Cursos>){
    
  }

  async findAll():Promise<CursoResultadoDto[]>{
    return (await this.cursosRepository.find()) // Array de curso
    .map(c=>new CursoResultadoDto(c.idCurso,c.nombre,c.duracion,c.fechaInicio,c.precio))
  }
}
