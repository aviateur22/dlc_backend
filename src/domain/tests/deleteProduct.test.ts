import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import {UserModel} from "../../infra/adapters/repositories/models/UserModel";
import { UserProductModel } from "../../infra/adapters/repositories/models/UserProductModel";
import { ProductEntity } from "../entities/ProductEntity";
import { AddProductUseCase } from "../useCases/AddProductUseCase";
import { DeleteProductUseCase } from "../useCases/DeleteProductUseCase";

/**
 * Sécurité mot de passe
 */
const passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity)

describe('DeleteProduct UseCase', ()=> {
  let user1: UserModel|null;
  let user2: UserModel|null;

  beforeEach(async()=>{
    // Vide les produits en base de données
    await repositories.productRepository.deleteAll();    

    // Vide les utilisateurs en base de données
    await repositories.userRepository.deleteAll();

    //Vide les userProducts
    await repositories.userProductRepository.deleteAll();

    // Ajout d'un utilisateur
    user1 = await repositories.userRepository.save({
      email: 'aviateur22@hotmail.fr',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    });

    // Ajout d'un nouvel utilisateur
    user2 = await repositories.userRepository.save({
      email: 'aviateur22@hotmail.f',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    });
  });

  it('Should delete a product', async ()=>{
    try {
        /**
        * Produit à ajouter
        */
        const product: ProductAddInterface = {
          openDate: new Date('2023-01-31 15:25:00'),
          productImageUrl: 'wwwww//ddddd-d'
        };
        
        // Si utilisateur pas défini
        if(!user1) {
          throw new UserNotFindException;
        }
  
        // Ajout du produit
        const addProductUseCase = new AddProductUseCase(repositories);
        const addProduct: ProductEntity = await addProductUseCase.execute(product, user1.id);

        // Suppression du produit
        const deleteProductUseCase = new DeleteProductUseCase(repositories);
        await deleteProductUseCase.execute(addProduct, user1.id);
        
        // Vérification Suppression produit
        expect(await repositories.productRepository.findOne(addProduct.id)).toBeFalsy();
        expect(await repositories.userProductRepository.findOne(user1.id, addProduct.id)).toBeFalsy();

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Should throw UserProductNotMacthException because product does not belong to user', async()=>{
    try {
       /**
        * Produit à ajouter
        */
       const product: ProductAddInterface = {
        openDate: new Date('2023-01-31 15:25:00'),
        productImageUrl: 'wwwww//ddddd-d'
      };      
      
      // Si utilisateur pas défini
      if(!user2) {
        throw new UserNotFindException;
      }

      if(!user1) {
        throw new UserNotFindException;
      }

      // Ajout du produit
      const addProductUseCase = new AddProductUseCase(repositories);
      const addProduct: ProductEntity = await addProductUseCase.execute(product, user2.id);
     
      // Suppression du produit
      const deleteProductUseCase = new DeleteProductUseCase(repositories);
      await deleteProductUseCase.execute(addProduct, user1.id);

      
      // Vérification Suppression produit
      const findProduct = await repositories.productRepository.findOne(addProduct.id);      
      const userProduct = await repositories.userProductRepository.findOne(user2.id, addProduct.id);
      
      expect(findProduct).toBeFalsy();
      expect(userProduct).toBeFalsy();

    } catch (error) {
      expect(error).toBeInstanceOf(UserProductNotMatchException);
    }
  });

  it('Should throw ProductNotFindException because product is not register', async()=>{
    try {     
    
     if(!user1) {
       throw new UserNotFindException;
     }
    
     // Suppression du produit
     const deleteProductUseCase = new DeleteProductUseCase(repositories);
     await deleteProductUseCase.execute({
      id: 2,
      openDate: new Date(),
      productImageUrl: ''
     }, user1.id);

     
     // Vérification Suppression produit
     const findProduct = await repositories.productRepository.findOne(2);      
     const userProduct = await repositories.userProductRepository.findOne(1, 2);
     
     expect(findProduct).toBeFalsy();
     expect(userProduct).toBeFalsy();

   } catch (error) {
     expect(error).toBeInstanceOf(ProductNotFindException);
   }
  });

  it('Should throw UserNotFindException because user is not register', async()=>{
    try {     
    
      /**
      * Produit à ajouter
      */
      const product: ProductAddInterface = {
        openDate: new Date('2023-01-31 15:25:00'),
        productImageUrl: 'wwwww//ddddd-d'
      };

      if(!user1) {
        throw new UserNotFindException;
      }

      // Ajout du produit
      const addProductUseCase = new AddProductUseCase(repositories);
      const addProduct: ProductEntity = await addProductUseCase.execute(product, user1.id);
     
      // Suppression du produit
      const deleteProductUseCase = new DeleteProductUseCase(repositories);
      await deleteProductUseCase.execute(addProduct, 3);
 
      
      // Vérification Suppression produit
      const findProduct = await repositories.productRepository.findOne(addProduct.id);      
      const userProduct = await repositories.userProductRepository.findOne(user1.id, addProduct.id);
      
      expect(findProduct).toBeFalsy();
      expect(userProduct).toBeFalsy();
 
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFindException);
    }
  });
});