import { Module } from '@nestjs/common';
import { PedidoService } from './services/pedido.service';
import { PedidoController } from './controllers/pedido.controller';

@Module({
  imports: [],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class AppModule {}
