import { ProductRepositoryInterface } from "../domain/ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../domain/ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../domain/ports/repository/UserRepositoryInterface";
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
     * 
     * @returns 
     */
    static getInMemoryUserProductRepository(): UserProductRepositoryInterface {
      return new InMemoryUserProductRepository();
    }
  //#endregion
}

export { RepositoryFactory }