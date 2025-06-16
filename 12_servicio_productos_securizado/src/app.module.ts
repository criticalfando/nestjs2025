import { Module } from '@nestjs/common';
import { PedidosProductosController } from './controllers/pedidos-productos.controller';
import { PedidosService } from './service/pedidos.service';
import { ProductosService } from './service/productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './model/Pedido';
import { Producto } from './model/Producto';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './jwt/auth.service';
import { UsersService } from './jwt/users.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { User } from './jwt/usersDto';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'tiendavirtual',
    entities: [Pedido,Producto,User],
    synchronize: false,
  }),
  PassportModule,
  JwtModule.register({
 secret: 'secret',
 signOptions: { expiresIn: '1h' },
}),
  TypeOrmModule.forFeature([Pedido,Producto,User])],
  controllers: [PedidosProductosController, AuthController],
  providers: [PedidosService,ProductosService,AuthService,UsersService,JwtStrategy],
})
export class AppModule {}
