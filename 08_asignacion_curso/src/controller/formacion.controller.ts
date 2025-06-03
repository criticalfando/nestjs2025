import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AlumnosService } from 'src/service/alumnos.service';
import { CursosService } from 'src/service/cursos.service';
import { MatriculasService } from 'src/service/matriculas.service';
import { Response } from 'express';
import { MatriculaNuevaDto } from 'src/dtos/MatriculaNuevaDto';

@Controller('formacion')
export class FormacionController {
  
  constructor(
    private readonly alumnosService: AlumnosService,
    private readonly cursosService: CursosService,
    private readonly matriculasService: MatriculasService
  ) {}

  @Get('cursos')
  cursos(){
    return this.cursosService.findAll();
  }

  @Get('noMatriculados/:idCurso')
  alumnosNoMatriculados(@Param("idCurso") idCurso:number){
    return this.alumnosService.findByNoMatriculadoEnCurso(idCurso);
  }

  @Post('matricular')
  async matricular(@Body() datos:MatriculaNuevaDto,@Res() response:Response){
    const resultado:boolean=await this.matriculasService.matricular(datos);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }
}