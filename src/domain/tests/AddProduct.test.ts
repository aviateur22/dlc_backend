import { RepositoryFactory } from "../../factories/RepositoryFactory";
import { ProductEntity } from "../entities/ProductEntity";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";
import { AddProductUseCase } from "../useCases/AddProductUseCase";

let productRepository: ProductRepositoryInterface = RepositoryFactory.getProductRepositoryModel();

describe('Usecase AddProduct', ()=>{
  beforeEach(()=>{
  }); 
  
  it('Should add product to user products', async()=>{

    const product: ProductAddInterface = {
      openDate: new Date('2023-01-31 15:25:00'),
      productImageUrl: 'wwwww//ddddd-d'
    };

    const addProductUseCase = new AddProductUseCase(productRepository);
    const addProduct: ProductEnityInterface = await addProductUseCase.execute(product);
    
    expect(addProduct).toBeInstanceOf(ProductEntity);
    expect((await productRepository.findOne(addProduct))).toBeTruthy();    
  });
});