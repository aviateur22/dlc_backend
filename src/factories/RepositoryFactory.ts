import { FriendUserRepositoryInterface } from "../domain/ports/repository/FriendUserRepositoryInterface";
import { ProductRepositoryInterface } from "../domain/ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../domain/ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../domain/ports/repository/UserRepositoryInterface";
import { InMemoryFriendUserRepository } from "../infra/adapters/repositories/inMemoryRepository/InMemoryFriendUserRepository";
import { InMemoryProductRepository } from "../infra/adapters/repositories/inMemoryRepository/InMemoryProductRepository";
import { InMemoryUserProductRepository } from "../infra/adapters/repositories/inMemoryRepository/InMemoryUserProductRepository";
import { InMemoryUserRepository } from "../infra/adapters/repositories/inMemoryRepository/InMemoryUserRepository";

/**
 * Factory pour les Repositories
 */
class RepositoryFactory {

  //#region InMemory
    /**
     * Modele pour la base de données 
     * @returns {UserRepositoryInterface}
     */
    static getInMemoryUserRepository(passwordSecurity: PasswordSecurityInterface): UserRepositoryInterface {
      return new InMemoryUserRepository(passwordSecurity);
    }  
    
    /**
     * Modèle base de données pour les produits
     * @returns {ProductRepositoryInterface}
     */
    static getInMemoryProductRepository(): ProductRepositoryInterface {
      return new InMemoryProductRepository();
    }

    /**
     * Model base de données pour les UserProduct
     * @returns 
     */
    static getInMemoryUserProductRepository(): UserProductRepositoryInterface {
      return new InMemoryUserProductRepository();
    }

    /**
     * Model de base de données pour les FriendUser
     */
    static getInMemoryFriendUserRepository(): FriendUserRepositoryInterface {
      return new InMemoryFriendUserRepository();
    }
  //#endregion
}

export { RepositoryFactory }