import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Curso } from './model/Curso';
import { Alumno } from './model/Alumno';
import { Matricula } from './model/Matricula';
import { MatriculacionController } from './controller/matriculacion.controller';
import { MatriculacionService } from './service/matriculacion.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })
    ,TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('URL_BD'),
        port: parseInt(config.get('PORT_BD')),
        username: config.get('USER_DB'),
        password: config.get('PASS_DB'),
        database: 'formacion',
        entities: [Curso,Alumno,Matricula],
        synchronize: false, 
      }),
    }) ,
    TypeOrmModule.forFeature([Curso,Alumno,Matricula]),
  ],
  controllers: [MatriculacionController],
  providers: [MatriculacionService],
})
export class AppModule {} 