import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import { UserProductModel } from "../../infra/adapters/repositories/models/UserProductModel";
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
  beforeEach(async()=>{
    // Vide la liste des users
    await repositories.userRepository.deleteAll();

    // Vide la liste de produit
    await repositories.productRepository.deleteAll();

    // Ajout d'un utilisateur
    await repositories.userRepository.save({
      email: 'aviateur22@hotmail.fr',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    });

    // Vide la liste userProduct
    await repositories.userProductRepository.deleteAll();
  }); 
  
  it('Should add product to user products list', async()=>{
    try {
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
      const userId: number = 1;

      const addProductUseCase = new AddProductUseCase(repositories);
      const addProduct: ProductEntity = await addProductUseCase.execute(product, userId);
      
      // Recherche du userProduct
      const userProduct: UserProductModel|null = await repositories.userProductRepository.findOne(userId, addProduct.id);
      
      if(!userProduct) {
        throw new UserProductNotMatchException();
      }

      expect(addProduct).toBeInstanceOf(ProductEntity);
      expect(userProduct).toBeTruthy();
      expect(userProduct.productId).toBe(addProduct.id);
      expect((await repositories.productRepository.findOne(addProduct.id))).toBeTruthy();
    }
    catch(error) {
      expect(error).toBeFalsy();
    }
  });

  it('should throw UserNotFindException because user is not find', async()=>{
    try {
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
      const userId: number =  2;

      const addProductUseCase = new AddProductUseCase(repositories);
      const addProduct: ProductEntity = await addProductUseCase.execute(product, userId);
      
      expect(addProduct).toBeFalsy();
      expect((await repositories.productRepository.findOne(addProduct.id))).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFindException);
    }
  }); 
});