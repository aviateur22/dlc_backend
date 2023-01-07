import { InMemoryUserRepository } from "../infra/repositories/inMemoryRepository/InMemoryUserRepository";
import { UserRepositoryInterface } from "../domain/ports/repository/UserRepositoryInterface";

class RepositoryFactory {
  /**
   * Modele pour la base de données 
   * @returns {UserRepositoryInterface}
   */
  static getUserRepositoryModel(passwordSecurity: PasswordSecurityInterface): UserRepositoryInterface {
    return new InMemoryUserRepository(passwordSecurity);
  }  
}

export { RepositoryFactory }