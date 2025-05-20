/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('saludo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('general')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('personal/:name')
  getHelloPersonal(@Param('name') nombre: string): string {
    return this.appService.getHello() + ': ' + nombre;
  }

  @Get('completo')
  getHelloCompleto(
    @Query('name') nombre: string,
    @Query('age') edad: number,
  ): string {
    return (
      this.appService.getHello() +
      ' te llamas: ' +
      nombre +
      ' y tienes: ' +
      edad +
      ' años.'
    );
  }
}
