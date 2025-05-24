import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { PaisesService } from 'src/service/paises/paises.service';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Get('continente')
  continentes(){
    return this.paisesService.findAllContinentes();
  }

  @Get('paisesContinente/:continente')
  paisesContinente(@Param("continente") continente:string){
    return this.paisesService.findByContinente(continente)
  }

  @Get('poblacionMax')
  poblacionMaxima(poblacion:number){
    return this.paisesService.findPoblacionMax()
  }



}