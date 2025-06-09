import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/product/:id')
  getById(@Param('id') id: number) {
    return this.appService.getProductById(id);
  }
  @Post('/create')
  create(@Body() createProductDto) {
    return this.appService.createProduct(createProductDto);
  }
}
