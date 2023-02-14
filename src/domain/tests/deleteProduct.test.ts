import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { RepositoryModel } from "../../helpers/repositories/RepositoryModel";
import { UserModel} from "../../infra/adapters/repositories/models/UserModel";
import { Repository } from "../../services/instanciateService/Repository";
import { UseCases } from "../../services/instanciateService/UseCases";
import { ProductEntity } from "../entities/ProductEntity";
import { AddProductUseCase } from "../useCases/AddProductUseCase";
import { DeleteProductUseCase } from "../useCases/DeleteProductUseCase";
import { Repositories } from "./utility/Repositories";
import { User } from "./utility/User";

/**
 * Recupération des repositories
 */
const repositories: RepositoryModel =  Repository.getRepositories();

describe('DeleteProduct UseCase', ()=> {
  let user1: UserModel|null;
  let user2: UserModel|null;

  beforeEach(async()=>{
    // Reset Repository
    await Repositories.deleteRepositories();

    // Ajout d'un utilisateur
    user1 = await User.createUser();

    // Ajout d'un utilisateur
    user2 = await User.createUser();
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
        const addProductUseCase =  UseCases.getUseCases().addProductUseCase;
        const addProduct: ProductEntity = await addProductUseCase.execute(product, user1.id);

        // Suppression du produit
        const deleteProductUseCase = UseCases.getUseCases().deleteProductUseCase;
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
      if(!user2 || !user1) {
        throw new UserNotFindException;
      }

      // Ajout du produit
      const addProductUseCase = UseCases.getUseCases().addProductUseCase;
      const addProduct: ProductEntity = await addProductUseCase.execute(product, user2.id);
     
      // Suppression du produit
      const deleteProductUseCase = UseCases.getUseCases().deleteProductUseCase;
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
     const deleteProductUseCase = UseCases.getUseCases().deleteProductUseCase;
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
      const addProductUseCase = UseCases.getUseCases().addProductUseCase;
      const addProduct: ProductEntity = await addProductUseCase.execute(product, user1.id);
     
      // Suppression du produit
      const deleteProductUseCase = UseCases.getUseCases().deleteProductUseCase;
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