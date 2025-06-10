export class ProductoDto {
    nombre: string;
    precio: number;
    disponibilidad: string;
    stock:number

    constructor(
        nombre?:string,
        precio?:number,
        disponibilidad?:string,
        stock?:number
    ){
        this.nombre=nombre
        this.precio=precio
        this.disponibilidad=disponibilidad
        this.stock=stock
    }

} 