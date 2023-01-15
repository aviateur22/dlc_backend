import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import { ProductEntity } from "../entities/ProductEntity";
import { UpdateProductUseCase } from "../useCases/UpdateProductUseCase";

/**
 * Sécurité mot de passe
 */
const passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity)

/**
 * Modification d'un produit
 */
describe('Usecase UpdateProduct', ()=>{
  beforeEach(async()=>{
    // Vide les produits en base de données
    await repositories.productRepository.deleteAll();    

    // Vide les utilisateurs en base de données
    await repositories.userRepository.deleteAll();

    //Vide les userProducts
    await repositories.userProductRepository.deleteAll();   
  });

  it('Should validate product update', async()=>{
    try {
      // Ajout d'un produit en BDD
      const product = await repositories.productRepository.save({
        openDate: new Date('2023-01-23'),
        productImageUrl: 'wwww-dlc/05'
      });

       // Ajout d'un utilisateur
      const user = await repositories.userRepository.save({
        email: 'aviateur22@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });

      // Données du produit à modifier
      const productUpdate: productUpdateInterface = {
        id: 1,
        openDate: new Date('20123-01-25'),
        productImageUrl: 'wwww-dlc/ezzezezez05'
      }

      if(!user || !product) {
        throw new Error('Création user - product impossible');
      }       
      
      await repositories.userProductRepository.save({
        userId: user.id,
        productId: product.id 
      });    

      // Update du produit
      const updateProductUseCase = new UpdateProductUseCase(repositories);
      const updateProduct = await updateProductUseCase.execute(productUpdate, user.id);
      
      // Recherche du produit updaté
      const findUpdatedProduct = await repositories.productRepository.findOne(updateProduct.id);

      expect(updateProduct).toBeInstanceOf(ProductEntity);
      expect(findUpdatedProduct?.productImageUrl).toBe(product.productImageUrl);
      expect(findUpdatedProduct?.openDate).toBe(product.openDate);
      
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Should throw UserNotFindException because user is not in databse', async()=>{
    try{
      // Ajout d'un produit en BDD
      const product = await repositories.productRepository.save({
        openDate: new Date('2023-01-23'),
        productImageUrl: 'wwww-dlc/05'
      });

      // Ajout d'un utilisateur
      const user = await repositories.userRepository.save({
        email: 'aviateur22@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });
      
      if(!user || !product) {
        throw new Error('Création user - product impossible');
      }       

      await repositories.userProductRepository.save({
        userId: user.id,
        productId: product.id 
      });    

      // Données du produit à modifier
      const productUpdate: productUpdateInterface = {
        id: 1,
        openDate: new Date('20123-01-25'),
        productImageUrl: 'wwww-dlc/3445'
      }

      // Update du produit
      const updateProductUseCase = new UpdateProductUseCase(repositories);
      const updateProduct = await updateProductUseCase.execute(productUpdate, 2);

      // Recherche du produit updaté
      const findUpdatedProduct = await repositories.productRepository.findOne(updateProduct.id);

      if(!findUpdatedProduct) {
        throw new ProductNotFindException();
      }

      expect(updateProduct).toBeFalsy();
    }
    catch(error) {
      expect(error).toBeInstanceOf(UserNotFindException);
    }
  });

  it('Should throw UserProductNotMatchException because product doesn\'t belong to user', async()=>{
    try{
      // Ajout d'un produit en BDD
      const product1 = await repositories.productRepository.save({
        openDate: new Date('2023-01-23'),
        productImageUrl: 'wwww-dlc/05'
      });

      // Ajout d'un 2nd produit en BDD
      const product2 = await repositories.productRepository.save({
        openDate: new Date('2023-05-23'),
        productImageUrl: 'wwww-dlc/0ddsdss5'
      });

      // Ajout d'un utilisateur
      const user1 = await repositories.userRepository.save({
        email: 'aviateur22@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });

      // Ajout d'un 2nd utilisateur
      const user2 = await repositories.userRepository.save({
        email: 'aviateur22@htmail.fr',
        password: 'affirmer011',
        confirmPassword: 'affirmer2011'
      });
      
      if(!user1 || !product1 || !user2 || !product2) {
        throw new Error('Création user - product impossible');
      }       

      await repositories.userProductRepository.save({
        userId: user1.id,
        productId: product1.id 
      });

      await repositories.userProductRepository.save({
        userId: user2.id,
        productId: product2.id 
      });    

      // Données du produit à modifier
      const productUpdate: productUpdateInterface = {
        id: 1,
        openDate: new Date('20123-01-25'),
        productImageUrl: 'wwww-dlc/3445'
      }

      // Update du produit
      const updateProductUseCase = new UpdateProductUseCase(repositories);
      const updateProduct = await updateProductUseCase.execute(productUpdate, 2);

      // Recherche du produit updaté
      const findUpdatedProduct = await repositories.productRepository.findOne(updateProduct.id);

      if(!findUpdatedProduct) {
        throw new ProductNotFindException();
      }

      expect(updateProduct).toBeFalsy();
    }
    catch(error) {
      expect(error).toBeInstanceOf(UserProductNotMatchException);
    }
  });

  it('Should throw ProductNotFindException because product is not in save', async()=>{
    try{
      // Ajout d'un produit en BDD
      const product1 = await repositories.productRepository.save({
        openDate: new Date('2023-01-23'),
        productImageUrl: 'wwww-dlc/05'
      });

      // Ajout d'un 2nd produit en BDD
      const product2 = await repositories.productRepository.save({
        openDate: new Date('2023-05-23'),
        productImageUrl: 'wwww-dlc/0ddsdss5'
      });

      // Ajout d'un utilisateur
      const user1 = await repositories.userRepository.save({
        email: 'aviateur22@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });

      // Ajout d'un 2nd utilisateur
      const user2 = await repositories.userRepository.save({
        email: 'aviateur22@htmail.fr',
        password: 'affirmer011',
        confirmPassword: 'affirmer2011'
      });
      
      if(!user1 || !product1 || !user2 || !product2) {
        throw new Error('Création user - product impossible');
      }       

      await repositories.userProductRepository.save({
        userId: user1.id,
        productId: product1.id 
      });

      await repositories.userProductRepository.save({
        userId: user2.id,
        productId: product2.id 
      });    

      // Données du produit à modifier
      const productUpdate: productUpdateInterface = {
        id: 3,
        openDate: new Date('20123-01-25'),
        productImageUrl: 'wwww-dlc/3445'
      }

      // Update du produit
      const updateProductUseCase = new UpdateProductUseCase(repositories);
      const updateProduct = await updateProductUseCase.execute(productUpdate, 2);

      // Recherche du produit updaté
      const findUpdatedProduct = await repositories.productRepository.findOne(updateProduct.id);

      if(!findUpdatedProduct) {
        throw new ProductNotFindException();
      }

      expect(updateProduct).toBeFalsy();
    }
    catch(error) {
      expect(error).toBeInstanceOf(ProductNotFindException);
    }
  });
});