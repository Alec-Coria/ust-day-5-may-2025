import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ role: 'product', cmd: 'create' })
  async createProduct(productDto) {
    const createData = this.appService.createProduct(productDto);
    if(await createData){
      return {
          status: 200,
          message: 'Product created successfully'
        }
      } else {
        return{
          status: 500,
          message: 'Something went wrong!'
        }
      }
    }

    @MessagePattern({ role:'product', cmd: 'get-by-id' })
    getProductById(id: number) {
      return this.appService.getProductById(id);
    }
  }

