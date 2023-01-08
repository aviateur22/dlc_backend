import { ProductRepositoryInterface } from "../domain/ports/repository/ProductRepositoryInterface";
import { UserRepositoryInterface } from "../domain/ports/repository/UserRepositoryInterface";
import { InMemoryProductRepository } from "../infra/adapters/repositories/inMemoryRepository/InMemoryProductRepository";
import { InMemoryUserRepository } from "../infra/adapters/repositories/inMemoryRepository/InMemoryUserRepository";

/**
 * Factory pour les Repositories
 */
class RepositoryFactory {
  /**
   * Modele pour la base de données 
   * @returns {UserRepositoryInterface}
   */
  static getUserRepositoryModel(passwordSecurity: PasswordSecurityInterface): UserRepositoryInterface {
    return new InMemoryUserRepository(passwordSecurity);
  }  
  
  /**
   * Modèle base de données pour les produits
   * @returns {ProductRepositoryInterface}
   */
  static getProductRepositoryModel(): ProductRepositoryInterface {
    return new InMemoryProductRepository();
  }
}

export { RepositoryFactory }