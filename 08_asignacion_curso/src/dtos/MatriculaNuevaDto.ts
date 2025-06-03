export class MatriculaNuevaDto{

    usuario:string;
    idCurso:number;

    constructor(
        usuario?:string,
        idCurso?:number
    ){
        this.usuario=usuario
        this.idCurso=idCurso
    }
}