import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PedidoAltaDto } from 'src/dtos/PedidoAltaDto';
import { ProductoDto } from 'src/dtos/ProductoDto';
import { PedidosService } from 'src/service/pedidos.service';
import { ProductosService } from 'src/service/productos.service';
import { Response } from 'express'
import { Roles } from 'src/jwt/roles.decorator';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tienda')
export class PedidosProductosController {
  constructor(private readonly productosService: ProductosService,
    private readonly pedidosService: PedidosService
  ) {}
 
  //alta de pedidos y productos
  //catalogo de productos y listado de pedidos
  @Roles("admin","user")
  @Get('productos')
  productos(){
    return this.productosService.catalogo();
  }

  @Roles("admin")
  @Get('pedidos')
  pedidos(){
    return this.pedidosService.catalogoPedidos();
  }

  @Roles("admin")
  @Post('altaProducto')
  async altaProducto(@Body() producto:ProductoDto,@Res() response:Response){
    const resultado:boolean=await this.productosService.alta(producto);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }

  @Roles("admin")
  @Post('altaPedido')
  async altaPedido(@Body() pedido:PedidoAltaDto,@Res() response:Response){
    const resultado:boolean=await this.pedidosService.altaPedido(pedido);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }
}
