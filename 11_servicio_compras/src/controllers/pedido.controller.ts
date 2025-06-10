import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PedidoDto } from 'src/dtos/PedidoDto';
import { PedidoService } from 'src/services/pedido.service';
import { Response } from 'express'

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}
  
  @Get("catalogo")
  buscarProductos(@Query("min") min:number, @Query("max") max:number){
    return this.pedidoService.buscarProductos(min,max)
  }

  @Post("altaPedido")
  async nuevoPedido(@Body() pedido:PedidoDto,@Res() response:Response){
    const resp:boolean=await this.pedidoService.altaPedido(pedido);
    if(resp){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }
} 
