import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([{name: 'PRODUCT_MICROSERVICE', transport:WebTransport.TCP}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
