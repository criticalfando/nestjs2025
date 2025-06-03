import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/Cliente';
import { Cuenta } from 'src/model/Cuenta';
import { Movimiento } from 'src/model/Movimiento';
import { DataSource, In, MoreThan, Repository } from 'typeorm';


@Injectable()
export class CuentasService {

  // Inyectamos los repositorios de cada modelo
  constructor(@InjectRepository(Movimiento) private movimientosRepository:Repository<Movimiento>,
              @InjectRepository(Cuenta) private cuentasRepository:Repository<Cuenta>,
              @InjectRepository(Cliente) private clientesRepository:Repository<Cliente>,
              private dataSource:DataSource){

  }

  async findByMovimientosFecha(fechaBuscar: Date): Promise<Cuenta[]> {
    return this.cuentasRepository.createQueryBuilder("cuenta")
      .innerJoin("cuenta.movimientos", "movimiento")
      .where("movimiento.fecha = :fechaBuscar", { fechaBuscar })
      .getMany();
  }

    async findByExtraccionMin(cantidad:number):Promise<Cuenta[]> {
    return this.cuentasRepository.createQueryBuilder("cuenta")
      .innerJoin("cuenta.movimientos", "movimiento")
      .where("movimiento.cantidad >= :cantidad", { cantidad })
      .getMany();
  }

  async findByDni(dni: number): Promise<Cuenta[]> {
    return this.cuentasRepository.createQueryBuilder("cuenta")
      .innerJoin("cuenta.clientes", "cliente")
      .where("cliente.dni = :dni", { dni })
      .getMany();
  }

  saldoMedio():Promise<any>{
    return this.dataSource.query("SELECT avg(saldo) AS saldo FROM cuentas")

  }

  //recibe un objeto cuenta y una array con los dni´s de los titulares
  //que debe tener esa cuenta. El método dará de alta dicha cuenta
  //y le asignará esos titulares
    // Recibe un objeto cuenta y un array con los DNI
    // Como queremos asignar una cuenta a clientes que ya tenemos, tenemos que buscar los clientes.
    // Hacemos un findBy del dni de la tabla titulares.

  altaCuenta(cuenta:Cuenta):void{
    this.dataSource.query("INSERT INTO cuentas VALUES (?,?,?)",[cuenta.numeroCuenta,cuenta.saldo,cuenta.tipoCuenta])
  }

}
