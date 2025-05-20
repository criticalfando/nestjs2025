import { Injectable } from '@nestjs/common';
import { Item } from 'src/model/Item';

@Injectable()
export class BuscadorService {

  repositorio:Item[]=[
  new Item("http:www.fnac.com","libros","Libros de todo tipo."),
  new Item("http:www.game.com","juegos","Tienda de juegos."),
  new Item("http:www.retro.com","libros","Tienda de juegos retro."),
  new Item("http:www.casadellibro.com","libros","Libros en cualquier idioma."),
  new Item("http:www.mytravel.com","libros","Viajes por todo el mundo."),
  ];

  buscar(tematica:string):Item[]{
    return this.repositorio.filter(it=>it.tematica==tematica)
  }

  alta(item:Item):void{
    this.repositorio.push(item);
    alert("Añadido correctamente.")
  }

}
