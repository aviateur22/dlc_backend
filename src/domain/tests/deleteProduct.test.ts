import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import {UserModel} from "../../infra/adapters/repositories/models/UserModel";
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
  let user: UserModel|null;

  beforeEach(async()=>{
    // Vide les produits en base de données
    await repositories.productRepository.deleteAll();    

    // Vide les utilisateurs en base de données
    await repositories.userRepository.deleteAll();

    //Vide les userProducts
    await repositories.userProductRepository.deleteAll();

    // Ajout d'un utilisateur
    user = await repositories.userRepository.save({
      email: 'aviateur22@hotmail.fr',
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
        if(!user) {
          throw new UserNotFindException;
        }
  
        // Ajout du produit
        const addProductUseCase = new AddProductUseCase(repositories);
        const addProduct: ProductEntity = await addProductUseCase.execute(product, user.id);

        // Suppression du produit
        const deleteProductUseCase = new DeleteProductUseCase(repositories);
        await deleteProductUseCase.execute(addProduct, user.id);
        
        
        expect(await repositories.productRepository.findOne(addProduct.id)).toBeFalsy();
        expect(await repositories.userProductRepository.findOne(user.id, addProduct.id)).toBeFalsy();

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});