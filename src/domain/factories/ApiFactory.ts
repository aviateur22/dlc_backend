import { UserInputModel } from "../inputs/user/UserInputModel";
import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";
import { InMemoryUserRepository } from "../stubes/InMemoryUserRepository";

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
  static getUserInputModel(email: string, name?: string, password?: string): UserInputInterface {
    return new UserInputModel(email, name, password);
  }

  static getUserRepositoryModel(): UserRepositoryInterface {
    return new InMemoryUserRepository();
  }
}

export { ApiFactory };