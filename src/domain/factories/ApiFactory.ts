import { UserInputModel } from "../inputs/user/UserInputModel";
import { UserInputInterface } from "../inputs/user/UserInputInterface";

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

  
}

export { ApiFactory };