import { RepositoryFactory } from "../../factories/RepositoryFactory";
import { ProductEntity } from "../entities/ProductEntity";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";
import { AddProductUseCase } from "../useCases/AddProductUseCase";

let productRepository: ProductRepositoryInterface;

describe('Usecase AddProduct', ()=>{
  beforeEach(()=>{
    productRepository = RepositoryFactory.getProductRepositoryModel();
  }); 
  
  it('Should add product to user products', async()=>{

    const product: ProductAddInterface = {
      openDate: new Date('2023-01-31 15:25:00'),
      productImageUrl: 'wwwww//ddddd-d'
    };

    const addProductUseCase = new AddProductUseCase(productRepository);
    const addProduct: ProductEnityInterface = await addProductUseCase.addProduct(product);
    
    expect(addProduct).toBeInstanceOf(ProductEntity);
    expect((await productRepository.findOne(addProduct))).toBeTruthy();    
  });
});