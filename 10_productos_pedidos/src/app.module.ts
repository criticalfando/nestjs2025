import { Module } from '@nestjs/common';
import { PedidosProductosController } from './controllers/pedidos-productos.controller';
import { PedidosService } from './service/pedidos.service';
import { ProductosService } from './service/productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './model/Pedido';
import { Producto } from './model/Producto';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'tiendavirtual',
    entities: [Pedido,Producto],
    synchronize: false,
  }), TypeOrmModule.forFeature([Pedido,Producto])],
  controllers: [PedidosProductosController],
  providers: [PedidosService,ProductosService],
})
export class AppModule {}
