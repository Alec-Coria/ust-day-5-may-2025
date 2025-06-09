import { Injectable } from '@nestjs/common';


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
    return this.productRepository.findOne(id);
  }
}
