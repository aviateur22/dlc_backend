import { UserEntity } from "../../infra/adapters/input/UserEntity";
import { UserLogin } from "../../infra/adapters/output/UserLogin";
import { UserRegister } from "../../infra/adapters/output/UserRegister";

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
   * @returns {UserLoginInterface}
   */
  static getUserLogin(email: string, password: string): UserLoginInterface {
    return new UserLogin(email, password);
  }
  
  /**
   * Renvoie le modele UserEntity 
   * @returns {UserUserEntityInterface}
   */
  static getUserEntity(email: string, name: string, userImageUrl: string): UserEntityInterface {
    return new UserEntity(email, name, userImageUrl);
  }

}

export { UserFactory }