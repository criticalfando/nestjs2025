import { Injectable } from '@nestjs/common';
import { ProductoDto } from 'src/dtos/ProductoDto';
import axios from 'axios';
import { PedidoDto } from 'src/dtos/PedidoDto';

@Injectable()
export class PedidoService {
  urlGlobal:string='http://localhost:3000'


  async buscarProductos(min:number,max:number):Promise<ProductoDto[]>{
    const response:any= await axios.get('${this.urlGlobal}/tienda/productos');
    const jsonFiltrado:ProductoDto[]=response.data
    .filter(p=>p.precio>=min&&p.precio<=max);
    const productos:ProductoDto[]=jsonFiltrado
    .map(p=>{
      let disponibilidad = "";
      if(p.stock>=0&&p.stock<=3){
        disponibilidad="baja"
      }
      if(p.stock>=3&&p.stock<=10){
        disponibilidad="media"
      }
      if(p.stock<=10){
        disponibilidad="alta"
      }
      return new ProductoDto(p.nombre,p.precio,disponibilidad)
    });
    return productos;
  }

  async altaPedido(pedido:PedidoDto):Promise<boolean>{
    try{
      await axios.post('${this.urlGlobal}/altaPedido')
      return true
    }catch(err){
      return false
    }
  }

}
