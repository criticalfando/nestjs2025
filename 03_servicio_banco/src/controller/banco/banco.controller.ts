import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Cuenta } from 'src/model/Cuenta';
import { BancoService } from 'src/service/banco/banco.service';
import { Response } from 'express';

@Controller('banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Post('alta')
  guardar(@Body() cuenta:Cuenta, @Res() response:Response):void{
    const resultado:boolean=this.bancoService.alta(cuenta);
    if(resultado){
      response.status(200).send()
    }else{
      response.status(409).send()
    }
  }

  @Get('buscarNumero/:numeroCuenta')
  filtarNumeroCuenta(@Param("numeroCuenta") numeroCuenta:string, @Res() response:Response):any{
    const cuenta:Cuenta[]=this.bancoService.buscarNumCuenta(numeroCuenta)
    if(cuenta){
      return response.status(200).json(cuenta).send;
    }else{
      return response.status(419).json(new Cuenta());
    }
  }

  @Get('buscarTitular/:titular')
  filtrarTitular(@Param("titular")titular:string):Cuenta[]{
    return this.bancoService.buscarTitular(titular);
  }

  @Get('buscarSaldo/:saldo')
  filtarMinSaldo(@Param("saldo") saldo: number): Cuenta[] {
    const cuentas = this.bancoService.buscarSaldo(saldo);
    return cuentas.filter(cuenta => cuenta.saldo > 1000);
  }

  @Get('buscarTipo/:tipo')
  filtrarTipo(@Param("tipo") tipo:string):Cuenta[]{
    return this.bancoService.buscarTipo(tipo);
  }

  @Delete('borrar/:cuenta')
  borrarCuenta(@Param("cuenta") numeroCuenta:string, @Res() response:Response):any{
    const cuenta:string= this.bancoService.borrarNumCuenta(numeroCuenta);
    if(cuenta){
      return response.status(200).json(cuenta);
    }else{
      return response.status(419).json(new Cuenta());
    }
  }
}