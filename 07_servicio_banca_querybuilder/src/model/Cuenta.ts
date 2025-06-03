import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Movimiento } from "./Movimiento";
import { Cliente } from "./Cliente";

@Entity("cuentas")
export class Cuenta{
    @PrimaryColumn()
    numeroCuenta:number;
    @Column()
    saldo:number;
    @Column()
    tipoCuenta:string;

    // Relacionamos MOVIMIENTO con CUENTA
    @OneToMany(()=>Movimiento,movimiento=>movimiento.cuenta)
    // Se relaciona hasta el siguiente decorador.
    // One Cuenta to Many movimientos

    movimientos:Movimiento[];
    
    @ManyToMany(()=>Cliente,cliente=>cliente.cuentas)
    @JoinTable({

    // Tabla que contenga las dos otras columnas donde se linkean
        name: 'titulares',  // Tabla de union
        joinColumn: {
            name: 'idCuenta',   // Nombre de la columna en la tabla de union   
            referencedColumnName: 'numeroCuenta',   // Nombre de la columna en la tabla cuentas
        },
        inverseJoinColumn: {
            name: 'idCliente', // Nombre de la columna en la tabla de union
            referencedColumnName: 'dni', // Nombre de la columna en la tabla clientes
        },
    })

    // Aqui se llama al modelo de Cliente, igual que en el modelo de Clientes se llama a este modelo.
    clientes:Cliente[];

    constructor(numeroCuenta?:number,saldo?:number,tipoCuenta?:string){
        this.numeroCuenta=numeroCuenta;
        this.saldo=saldo;
        this.tipoCuenta=tipoCuenta;
    }
}