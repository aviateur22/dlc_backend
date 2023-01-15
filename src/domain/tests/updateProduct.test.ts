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
  it('Should validate product update', async()=>{
    try {      
      // Vide les produits en base de données
      await repositories.productRepository.deleteAll();

      // Ajout d'un produit en BDD
      const product = await repositories.productRepository.save({
        openDate: new Date('2023-01-23'),
        productImageUrl: 'wwww-dlc/05'
      });

      // Vide les utilisateurs en base de données
      await repositories.userRepository.deleteAll();

      // Ajout d'un utilisateur
      const user = await repositories.userRepository.save({
        email: 'aviateur22@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });

      // Données de modification dun produit
      const productUpdate: productUpdateInterface = {
        id: 1,
        openDate: new Date('20123-01-25'),
        productImageUrl: 'wwww-dlc/05'
      }

      if(!user || !product) {
        return null;
      }
       
      
      await repositories.userProductRepository.save({
        userId: user.id,
        productId: product.id 
      });    

      // Update du produit
      const updateProductUseCase = new UpdateProductUseCase(repositories);
      const updateProduct = await updateProductUseCase.execute(product, user.id);
      
      // Recherche du produit updaté
      const findUpdatedProduct = await repositories.productRepository.findOne(updateProduct.id);

      expect(updateProduct).toBeInstanceOf(ProductEntity);
      expect(findUpdatedProduct?.productImageUrl).toBe(product.productImageUrl);
      expect(findUpdatedProduct?.openDate).toBe(product.openDate);
      
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

});