import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/Cliente';
import { Cuenta } from 'src/model/Cuenta';
import { Movimiento } from 'src/model/Movimiento';
import { In, MoreThan, Repository } from 'typeorm';


@Injectable()
export class CuentasService {

  // Inyectamos los repositorios de cada modelo
  constructor(@InjectRepository(Movimiento) private movimientosRepository:Repository<Movimiento>,
              @InjectRepository(Cuenta) private cuentasRepository:Repository<Cuenta>,
              @InjectRepository(Cliente) private clientesRepository:Repository<Cliente>){

  }

  async findByMovimientosFecha(fechaBuscar:Date):Promise<Cuenta[]>{
    const movimientos:Movimiento[]=await this.movimientosRepository.find({
      where:{
        fecha:fechaBuscar
      },
      relations:["cuenta"]
    });//Movimiento[]
    return [...new Set(movimientos.map(m=>m.cuenta))];
    
  }
  async findByExtraccionMin(cantidad:number):Promise<Cuenta[]>{
    const movimientos:Movimiento[]=await this.movimientosRepository.find({
      where:{
        cantidad:MoreThan(cantidad),
        operacion:"extracción"
      },
      relations:["cuenta"]
    });//Movimiento[]
    return movimientos.map(m=>m.cuenta);
    
  }

  //cuentas asociada al titular cuyo dni se proporciona como parámetro

  async findByDni(dni:number):Promise<Cuenta[]>{
    const cliente:Cliente=await this.clientesRepository.findOne({
      where:{
        dni:dni
      },
      relations:["cuentas"]
    });

    console.log("El cliente es: ",cliente)
    console.log("Ahora se devuelven las cuentas de cliente:")

    if(cliente) return cliente.cuentas
    else return [];
    
  }

  //recibe un objeto cuenta y una array con los dni´s de los titulares
  //que debe tener esa cuenta. El método dará de alta dicha cuenta
  //y le asignará esos titulares
  async altaCuenta(cuenta:Cuenta,titulares:number[]):Promise<Cuenta>{
    // Recibe un objeto cuenta y un array con los DNI

    // Como queremos asignar una cuenta a clientes que ya tenemos, tenemos que buscar los clientes.

    // Hacemos un findBy del dni de la tabla titulares.
    const clientes:Cliente[]=await this.clientesRepository.findBy({dni:In(titulares)});

    cuenta.clientes=clientes;

    return this.cuentasRepository.save(cuenta);
  }
}
