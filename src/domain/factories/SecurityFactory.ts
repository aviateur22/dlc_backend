import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { InMemoryUserRepository } from "../../infra/repositories/inMemoryRepository/InMemoryUserRepository";
import { bcryptPasswordSecurity } from "../../infra/securities/PasswordSecurity";

/**
 * Chargement des modeles 
 */
class SecurityFactory {

  /**
   * Modele protection mot de passe
   */
  static getPasswordSecurity(): PasswordSecurityInterface {
    return new bcryptPasswordSecurity();
  }
}

export { SecurityFactory };