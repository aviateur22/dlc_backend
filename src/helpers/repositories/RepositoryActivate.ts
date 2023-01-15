import { UserRepositoryInterface } from "../../domain/ports/repository/UserRepositoryInterface";
import { ProductRepositoryInterface } from "../../domain/ports/repository/ProductRepositoryInterface";
import { RepositoryEnum } from "./RepositoryEnum";
import { Repository } from "./Repository";
import { RepositoryFactory } from "../../factories/RepositoryFactory";
import { UserProductRepositoryInterface } from "../../domain/ports/repository/UserProductRepositoryInterface";


/**
 * Active les Repositories
 */
class RepositoryActivate {
  /**
   * 
   * @param {number} repositorySelection - Type de repository selectionné
   * @param {PasswordSecurityInterface} passwordSecurity - Gestion mot de passe
   * @returns {Repository}
   */
  static getRepository(repositorySelection: number, passwordSecurity: PasswordSecurityInterface): Repository {
    // UserRepository
    let userRepository: UserRepositoryInterface;

    // ProductRepository
    let productRepository:ProductRepositoryInterface;

    // UserProductRepository
    let userProductRepository: UserProductRepositoryInterface

    switch (repositorySelection) {

      /**
       * InMemoryRepository
       */
      case RepositoryEnum.inMemory:
        // User Repository
        userRepository = RepositoryFactory.getInMemoryUserRepository(passwordSecurity);
        
        // Product Repository
        productRepository = RepositoryFactory.getInMemoryProductRepository();
        
        // UserProduct Repository
        userProductRepository = RepositoryFactory.getInMemoryUserProductRepository();
        
        return new Repository(userRepository, productRepository, userProductRepository);
        break;
    
      default:
         // User Repository
         userRepository = RepositoryFactory.getInMemoryUserRepository(passwordSecurity);
        
         // Product Repository
         productRepository = RepositoryFactory.getInMemoryProductRepository();
         
         // UserProduct Repository
         userProductRepository = RepositoryFactory.getInMemoryUserProductRepository();
        
        return new Repository(userRepository, productRepository, userProductRepository);
        break;
    }
  }
}

export { RepositoryActivate }