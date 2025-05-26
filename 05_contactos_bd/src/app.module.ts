import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacto } from './model/Contacto';
import { ContactosController } from './controller/contactos.controller';
import { ContactosService } from './service/contactos.service';

@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nestuser',
  password: 'nestpass',
  database: 'agenda',
  entities: [Contacto],
  synchronize: false,
  }),TypeOrmModule.forFeature([Contacto])],
  controllers: [ContactosController],
  providers: [ContactosService],
})
export class AppModule {}
