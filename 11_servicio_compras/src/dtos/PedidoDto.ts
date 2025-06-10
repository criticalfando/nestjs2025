export class PedidoDto {
    producto:number;
    unidades:number;

    constructor(
        producto?:number,
        unidades?:number
    ) {
        this.producto=producto
        this.unidades=unidades
    }
}