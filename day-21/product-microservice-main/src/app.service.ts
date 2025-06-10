import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createProduct(productDto: CreateProductDto) {
    return this.productRepository.save(productDto);
  }
  getProductById(id) {
    return this.productRepository.findOne({
      where:{ id },
    });
  }
}
