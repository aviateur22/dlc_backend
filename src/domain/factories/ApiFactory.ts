import { UserInputModel } from "../inputs/user/UserInputModel";
import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";
import { InMemoryUserRepository } from "../stubes/InMemoryUserRepository";
import { bcryptPasswordSecurity } from "../../infra/security/PasswordSecurity";
import { UserOutputModel } from "../outputs/user/UserOutputModel";

/**
 * Factory pour charger les class 
 */
class ApiFactory {

  /**
   * Renvoie le modele userInput de choisi 
   * @param {string} email 
   * @param {string} name 
   * @param {string} password 
   * @returns {UserInputInterface}
   */
  static getUserInputModel(email: string, name?: string, password?: string, confirmPassword?: string): UserInputInterface {
    return new UserInputModel(email, name, password, confirmPassword);
  }

  /**
   * Modele pour la base de données
   * 
   * @returns {UserRepositoryInterface}
   */
  static getUserRepositoryModel(passwordSecurity: PasswordSecurityInterface): UserRepositoryInterface {
    return new InMemoryUserRepository(passwordSecurity);
  }

  /**
   * Modele protection mot de passe
   */
  static getPasswordSecurity(): PasswordSecurityInterface {
    return new bcryptPasswordSecurity();
  }

  /**
   * Modele pour le userOutput
   * @param {string} email 
   * @param {string} name 
   * @param {string} userImageUrl 
   * @returns {UserOutputInterface}
   */
  static getUserOutputModel(): UserOutputInterface {
    return new UserOutputModel();
  }
}

export { ApiFactory };