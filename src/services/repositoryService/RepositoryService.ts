import { FriendUserRepositoryInterface } from "../../domain/ports/repository/FriendUserRepositoryInterface";
import { ProductRepositoryInterface } from "../../domain/ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../../domain/ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../../domain/ports/repository/UserRepositoryInterface";
import { RepositoryModel } from "../../helpers/repositories/RepositoryModel";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import { InMemoryUserRepository } from "../../infra/adapters/repositories/inMemoryRepository/InMemoryUserRepository";
import { InMemoryProductRepository } from "../../infra/adapters/repositories/inMemoryRepository/InMemoryProductRepository";
import { InMemoryUserProductRepository } from "../../infra/adapters/repositories/inMemoryRepository/InMemoryUserProductRepository";
import { InMemoryFriendUserRepository } from "../../infra/adapters/repositories/inMemoryRepository/InMemoryFriendUserRepository";

class RepositoryService {
   /**
   * 
   * @param {number} repositorySelection - Type de repository selectionné
   * 
   * @returns {RepositoryModel}
   */
   static getRepository(repositorySelection: number): RepositoryModel {
    
    // UserRepository
    let userRepository: UserRepositoryInterface;

    // ProductRepository
    let productRepository: ProductRepositoryInterface;

    // UserProductRepository
    let userProductRepository: UserProductRepositoryInterface;

    // FriendUserRepository
    let friendUserRepository: FriendUserRepositoryInterface;

    switch (repositorySelection) {

      /**
       * InMemoryRepository
       */
      case RepositoryEnum.inMemory:
        // User Repository
        userRepository = new InMemoryUserRepository();
        
        // Product Repository
        productRepository = new InMemoryProductRepository();
        
        // UserProduct Repository
        userProductRepository = new InMemoryUserProductRepository();

        // FriendUser Repository
        friendUserRepository = new InMemoryFriendUserRepository();
        
        return new RepositoryModel(userRepository, productRepository, userProductRepository, friendUserRepository);
        break;
    
      default:
         // User Repository
        userRepository = new InMemoryUserRepository();
        
        // Product Repository
        productRepository = new InMemoryProductRepository();
        
        // UserProduct Repository
        userProductRepository = new InMemoryUserProductRepository();

        // FriendUser Repository
        friendUserRepository = new InMemoryFriendUserRepository();
        
        return new RepositoryModel(userRepository, productRepository, userProductRepository, friendUserRepository);
        break;
    }
  }
}

export { RepositoryService }