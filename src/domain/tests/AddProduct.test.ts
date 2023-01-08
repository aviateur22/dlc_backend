import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import { ProductEntity } from "../entities/ProductEntity";
import { AddProductUseCase } from "../useCases/AddProductUseCase";

/**
 * Sécurité mot de passe
 */
const passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity);

describe('Usecase AddProduct', ()=>{
  beforeEach(()=>{
  }); 
  
  it('Should add product to user products list', async()=>{

    /**
     * Produit à ajouter
     */
    const product: ProductAddInterface = {
      openDate: new Date('2023-01-31 15:25:00'),
      productImageUrl: 'wwwww//ddddd-d'
    };

    /**
     * Utilisateur
     */
    const user: UserInterface = {
      email: ''      
    }

    const addProductUseCase = new AddProductUseCase(repositories);
    const addProduct: ProductEnityInterface = await addProductUseCase.execute(product, user);
    
    expect(addProduct).toBeInstanceOf(ProductEntity);
    expect((await repositories.productRepository.findOne(addProduct))).toBeTruthy();    
  });
});