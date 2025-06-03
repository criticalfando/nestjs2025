import { Column, Entity, OneToMany, ManyToMany, PrimaryColumn } from "typeorm";
import { Cursos } from "./cursos";

@Entity("alumnos")
export class Alumnos{
    @PrimaryColumn()
    usuario:string;
    @Column()
    password:string;
    @Column()
    nombre:string
    @Column()
    email:string
    @Column()
    edad:number
    
    @ManyToMany(()=>Cursos,curso=>curso.idCurso)
    cursos:Cursos[]

    constructor(usuario:string,password:string,nombre:string,email:string,edad?:number){
        this.usuario=usuario
        this.password=password
        this.nombre=nombre
        this.email=email
        this.edad=edad || 0
    }
}