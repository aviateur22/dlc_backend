import { UserInputModel } from "../../infra/adapters/output/UserInputModel";
import { UserInputInterface } from "../ports/input/UserInputInterface";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { InMemoryUserRepository } from "../stubes/InMemoryUserRepository";
import { bcryptPasswordSecurity } from "../../infra/securities/PasswordSecurity";
import { UserOutputModel } from "../../infra/adapters/input/UserOutputModel";
import { UserMapper } from "../mappers/UserMapper";

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
   * @returns {UserOutputInterface}
   */
  static getUserOutputModel(): UserOutputInterface {
    return new UserOutputModel();
  }

  /**
   * Mapper pour renvoyer le model UserOutput
   * @returns 
   */
  static getUserMapper(): UserMapper {
    return new UserMapper(ApiFactory.getUserOutputModel());
  }
}

export { ApiFactory };