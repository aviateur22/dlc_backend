import { UserRepositoryInterface } from "../../domain/ports/repository/UserRepositoryInterface";
import { ProductRepositoryInterface } from "../../domain/ports/repository/ProductRepositoryInterface";
import { RepositoryEnum } from "./RepositoryEnum";
import { Repository } from "./Repository";
import { RepositoryFactory } from "../../factories/RepositoryFactory";


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

    switch (repositorySelection) {

      /**
       * InMemoryRepository
       */
      case RepositoryEnum.inMemory:
        userRepository = RepositoryFactory.getUserRepositoryModel(passwordSecurity);
        productRepository = RepositoryFactory.getProductRepositoryModel();
        
        return new Repository(userRepository, productRepository);
        break;
    
      default:
        userRepository = RepositoryFactory.getUserRepositoryModel(passwordSecurity);
        productRepository = RepositoryFactory.getProductRepositoryModel();
        
        return new Repository(userRepository, productRepository);
        break;
    }
  }
}

export { RepositoryActivate }