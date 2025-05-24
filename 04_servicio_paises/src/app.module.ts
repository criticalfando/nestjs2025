import { Module } from '@nestjs/common';
import { PaisesController } from './controller/paises/paises.controller';
import { PaisesService } from './service/paises/paises.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [PaisesController],
  providers: [PaisesService],
})
export class AppModule {}