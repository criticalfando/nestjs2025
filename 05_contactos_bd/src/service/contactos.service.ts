import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from 'src/model/Contacto';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContactosService {
constructor(@InjectRepository(Contacto) private contactosRepository:Repository<Contacto>){}

  //No se permiten contactos con el mismo email. Si se intenta dar de alta
  // Un contacto con email existente, no se dara de alta, y se devolvera false.
  //Si el alta es posible, se devuelve true.

  async save(contacto:Contacto):Promise<boolean>{
    const resultado:Contacto=await this.contactosRepository.findOneBy({email:contacto.email})
    if(resultado){
      return false;
    }else{
      this.contactosRepository.save(contacto);
      return true;
    }
  }

  findByNombre(n:string):Promise<Contacto>{
    return this.contactosRepository.findOneBy({nombre:n})
  }

  findAll():Promise<Contacto[]>{
    return this.contactosRepository.find();
  }

   async deleteByEmail(e:string):Promise<boolean>{
    //devuelve un boolean, indicando si lo ha eliminado o no
    const result:DeleteResult=await this.contactosRepository.delete({email:e});
    return result.affected>0;
  } 
}
