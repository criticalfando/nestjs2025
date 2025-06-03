import { Column, Entity, OneToMany, ManyToMany, PrimaryGeneratedColumn, PrimaryColumn, JoinTable } from "typeorm";
import { Alumnos } from "./alumnos";

@Entity("matriculas")
export class Matriculas{
    @PrimaryColumn()
    usuario:string;
    @PrimaryColumn()
    idCurso:number
    @Column()
    nota:number

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

    constructor(usuario:string,idCurso:number,nota:number){
        this.usuario=usuario
        this.idCurso=idCurso
        this.nota=nota

    }
}