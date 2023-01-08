import { UserNotFindException } from "../../exceptions/UserNotFindException";
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
      const user: UserEntityInterface = {
        id: 1,
        email: 'aviateur22@hotmail.fr',
      }

      const addProductUseCase = new AddProductUseCase(repositories);
      const addProduct: ProductEnityInterface = await addProductUseCase.execute(product, user);
      
      expect(addProduct).toBeInstanceOf(ProductEntity);
      expect((await repositories.productRepository.findOne(addProduct))).toBeTruthy();
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
      const user: UserEntityInterface = {
        id: 2,
        email: 'aviateur20@hotmail.fr',
      }

      const addProductUseCase = new AddProductUseCase(repositories);
      const addProduct: ProductEnityInterface = await addProductUseCase.execute(product, user);
      
      expect(addProduct).toBeFalsy();
      expect((await repositories.productRepository.findOne(addProduct))).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFindException);
    }
  });
});