import { Injectable } from '@nestjs/common';
import { Cuenta } from 'src/model/Cuenta';

@Injectable()
export class BancoService {
  
  cuenta:Cuenta[] = [
    new Cuenta("ES2100123456789012345678", 15230.75, "Carlos Méndez", "Cuenta Corriente"),
    new Cuenta("ES3200765432109876543210", 840.50, "Laura Sánchez", "Cuenta de Ahorro"),
    new Cuenta("ES4100987654321098765432", 5000.00, "Miguel Torres", "Cuenta Corriente"),
    new Cuenta("ES5100234567890123456789", 120.90, "Andrea López", "Cuenta Nómina"),
    new Cuenta("ES6100345678901234567890", 9800.00, "Luis Rodríguez", "Cuenta Empresa"),
    new Cuenta("ES7200456789012345678901", 320.75, "María González", "Cuenta Ahorro"),
    new Cuenta("ES8300567890123456789012", 7200.00, "Javier Morales", "Cuenta Corriente"),
    new Cuenta("ES9400678901234567890123", 210.00, "Patricia Ruiz", "Cuenta Nómina"),
    new Cuenta("ES0500789012345678901234", 14500.25, "Fernando Gil", "Cuenta Empresa"),
    new Cuenta("ES1600890123456789012345", 75.10, "Elena Navarro", "Cuenta Ahorro")
  ];

  alta(cuentas:Cuenta):boolean{
    if(!this.cuenta.some(cuenta => cuenta.numeroCuenta === cuentas.numeroCuenta)){
      this.cuenta.push(cuentas);
      return true;
    }else{
      return false;
    }
  }

  buscarNumCuenta(numeroCuenta:string):Cuenta[]{
    return this.cuenta.filter((cuenta:Cuenta) => cuenta.numeroCuenta === numeroCuenta);
  }

  buscarTitular(titular:string):Cuenta[]{
    return this.cuenta.filter((cuenta:Cuenta) => cuenta.titular === titular);
  }

  buscarSaldo(saldo:number):Cuenta[]{
    return this.cuenta.filter((cuenta:Cuenta) => cuenta.saldo === saldo);
  }

  buscarTipo(tipo:string):Cuenta[]{
    return this.cuenta.filter((cuenta:Cuenta) => cuenta.tipo === tipo);
  }

  borrarNumCuenta(numCuenta:string):string{
    this.cuenta = this.cuenta.filter((cuenta:Cuenta)=> cuenta.numeroCuenta === numCuenta);
    if(this.cuenta){
      return "Has borrado la cuenta";
    }else{
      return "No se dio de baja";
    }
  }
}