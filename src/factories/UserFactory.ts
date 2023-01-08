import { UserEntity } from "../domain/entities/UserEntity";
import { UserLogin } from "../infra/adapters/user/UserLogin";
import { UserRegister } from "../infra/adapters/user/UserRegister";

/**
 * Chargement Modele User
 */
class UserFactory {
  /**
   * Renvoie le modele UserRegister
   * @param {string} email 
   * @param {string} password 
   * @param {string} confirmPassword 
   * @returns {UserRegisterInterface}
   */
   static getUserRegister(email: string, password: string, confirmPassword: string): UserRegisterInterface {
    return new UserRegister(email, password, confirmPassword);
  }

  /**
   * Renvoie le modele UserLogin
   * @param {string} email 
   * @param {string} password 
   * @returns {UserInterface}
   */
  static getUserLogin(email: string, password: string): UserConnectInterface {
    return new UserLogin(email, password);
  }
  
  /**
   * Renvoie le modele UserEntity 
   * @returns {UserUserEntityInterface}
   */
  static getUserEntity(id: number, email: string): UserEntityInterface {
    return new UserEntity(id, email);
  }

}

export { UserFactory }