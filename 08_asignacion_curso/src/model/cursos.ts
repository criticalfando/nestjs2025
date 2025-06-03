import { Column, Entity, OneToMany, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Alumnos } from "./alumnos";

@Entity("cursos")
export class Cursos{
    @PrimaryGeneratedColumn()
    idCurso:number;
    @Column()
    nombre:string;
    @Column()
    duracion:string;
    @Column()
    fechaInicio:Date;
    @Column()
    precio:number
    @ManyToMany(()=>Alumnos,alumnos=>alumnos.usuario)

    @JoinTable({
        name: "matriculas",
        joinColumn: {
            name: "idCurso",
            referencedColumnName: "idCurso"
        },
        inverseJoinColumn: {
            name: "usuario",
            referencedColumnName: "usuario"
        }
    })

    alumnos:Alumnos[]

    constructor(idCurso:number,nombre:string,duracion:string,fechaInicio:Date,precio:number){
        this.idCurso=idCurso
        this.nombre=nombre
        this.duracion=duracion
        this.fechaInicio=fechaInicio
        this.precio=precio
    }
}