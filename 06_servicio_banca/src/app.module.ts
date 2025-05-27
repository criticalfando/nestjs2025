import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './model/movimientos';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'bancabd',
    entities: [Movimiento],
    synchronize: false,
  }), TypeOrmModule.forFeature([Movimiento])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
